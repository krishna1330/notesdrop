import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yafwxexczprwmoetpmww.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlhZnd4ZXhjenByd21vZXRwbXd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMDgzNzcsImV4cCI6MjA3Njg4NDM3N30.Cj1nmtX1E_Si9kSxTAUIxMn8aX9FLqF7yhVW3PPA38E';
export const supabase = createClient(supabaseUrl, supabaseKey);
