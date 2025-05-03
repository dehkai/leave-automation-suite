import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/themes/theme-provider"
import { ModeToggle } from "@/themes/mode-toggle"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <ThemeProvider>
  <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div className="absolute top-4 right-4">
      <ModeToggle />
    </div>
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  </ThemeProvider>
);
}