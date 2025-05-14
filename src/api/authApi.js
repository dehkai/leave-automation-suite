import { supabase } from '@/lib/supabaseClient'

export async function login(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.error("Login failed", error)
      throw new Error(error.message)
    }

    console.log("Login successful", data)
    return data
  } catch (error) {
    console.error("Error logging in", error)
    throw error
  }
}

export async function signup(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.error("Signup failed", error)
      throw new Error(error.message)
    }

    console.log("Signup successful", data)
    return data
  } catch (error) {
    console.error("Error signing up", error)
    throw error
  }
}

export async function logout() {
  try {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      console.error("Logout failed", error)
      throw new Error(error.message)
    }

    console.log("Logout successful")
    return true
  } catch (error) {
    console.error("Error logging out", error)
    throw error
  }
}