import { createClient } from '@supabase/supabase-js'

const VITE_SUPABASE_URL="https://foltrvqbdhiolcriszcb.supabase.co"
const VITE_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZvbHRydnFiZGhpb2xjcmlzemNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQzNzMwOTMsImV4cCI6MjAyOTk0OTA5M30.TSxl7-7Fgy_TJ_OXAJ_-KXU51S3sNPzb-XOSeeh3lmQ"
export const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)