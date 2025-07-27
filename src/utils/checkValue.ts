import { supabase } from '../supabase';

export async function checkValueExists(value: string) {
  const { data, error } = await supabase
    .from('blacklist_ingredients') 
    .select('id')      
    .ilike('name', value)
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Supabase error:', error.message);
    return false;
  }

  return !!data;
}
