export async function login(email, password) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/token?grant_type=password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Login successful", data);
      return data;
    } else {
      console.error("Login failed", data);
      throw new Error(data.error_description || "Login failed");
    }
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
}

export async function signup(email, password) {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        email: email.toString(),
        password: password.toString(),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Signup successful", data);
      return { user: data.user, error: data.error };
    } else {
      console.error("Signup failed", data);
      throw new Error(data.error_description || "Signup failed");
    }
  } catch (error) {
    console.error("Error signing up", error);
    throw error;
  }
}

export async function logout() {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": import.meta.env.VITE_SUPABASE_ANON_KEY,
      },
    });
    const data = await response.json();
    if (response.ok) {
      console.log("Logout successful", data);
      return data;
    } else {
      console.error("Logout failed", data);
      throw new Error(data.error_description || "Logout failed");
    }
  } catch (error) {
    console.error("Error logging out", error);
    throw error;
  }
}