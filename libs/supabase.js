import { supabaseKey, supabaseUrl } from './config.js'

const { createClient } = window.supabase

export const supabase = createClient(supabaseUrl, supabaseKey)
