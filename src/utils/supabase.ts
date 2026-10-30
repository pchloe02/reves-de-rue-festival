import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (
  import.meta as ImportMeta & {
    env: {
      VITE_SUPABASE_URL: string;
      VITE_SUPABASE_PUBLISHABLE_KEY: string;
    };
  }
).env.VITE_SUPABASE_URL;
const supabaseKey = (
  import.meta as ImportMeta & {
    env: {
      VITE_SUPABASE_PUBLISHABLE_KEY: string;
    };
  }
).env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);
