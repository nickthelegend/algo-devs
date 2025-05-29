import { createClient } from "@supabase/supabase-js"

// Check if environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate that we have the required configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
  )
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl || "https://qkmuehomuwzzxfkansbw.supabase.co",
  supabaseAnonKey || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFrbXVlaG9tdXd6enhma2Fuc2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzY0MDUsImV4cCI6MjA2MzUxMjQwNX0.1slVu00Me8OQs7YxMpjrNKGbtAlvQiTnd-vZPq34XPI",
)
