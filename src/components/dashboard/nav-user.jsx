import {
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  MoreVerticalIcon,
  UserCircleIcon,
} from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useNavigate } from "react-router-dom"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser() {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "Loading...",
    email: "Loading...",
    avatar: null
  })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          console.error('Session error:', sessionError)
          navigate('/login')
          return
        }

        if (!session) {
          console.error('No active session')
          navigate('/login')
          return
        }

        // Get user data from the users table
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('full_name, email')
          .eq('uuid', session.user.id)
          .single()

        if (userError) {
          console.error('Error fetching user data:', userError)
          // If user data not found, use session data
          setUser({
            name: session.user.user_metadata?.full_name || 'User',
            email: session.user.email,
            avatar: null
          })
          return
        }

        if (userData) {
          setUser({
            name: userData.full_name || session.user.user_metadata?.full_name || 'User',
            email: userData.email || session.user.email,
            avatar: null
          })
        }
      } catch (error) {
        console.error('Error in fetchUser:', error)
        navigate('/login')
      }
    }

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/login')
      } else if (event === 'SIGNED_IN') {
        fetchUser()
      }
    })

    fetchUser()

    // Cleanup subscription
    return () => {
      subscription?.unsubscribe()
    }
  }, [navigate])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {user.name === "Loading..." ? "..." : user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuItem onClick={async () => {
              await supabase.auth.signOut()
              navigate('/login')
            }}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

