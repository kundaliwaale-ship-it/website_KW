import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase URL or Anon Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkTables() {
  const tables = ['profiles', 'kundali_orders', 'consultation_orders', 'vastu_orders', 'contact_inquiries'];
  
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('id').limit(1);
    
    if (error) {
       console.error(`❌ Error accessing table '${table}':`, error.message);
    } else {
       console.log(`✅ Table '${table}' exists and is accessible.`);
    }
  }
}

checkTables();
