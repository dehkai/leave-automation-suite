import React from "react";
import { ThemeProvider } from "@/themes/theme-provider"
import { ModeToggle } from "@/themes/mode-toggle"
import { SignupForm } from "@/components/auth/signup-form";

export default function SignupPage() {
  return (
    <ThemeProvider>
      <div className="absolute top-4 right-4">
      <ModeToggle />
    </div>
    <div className="flex items-center justify-center min-h-screen p-4">
      <SignupForm className="max-w-md mx-auto" />
    </div>
    </ThemeProvider>
  );
}