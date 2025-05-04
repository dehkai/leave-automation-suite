import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export async function addUserDetails(payload) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([payload]);

    if (error) {
      console.error('Error adding user details:', error);
      throw error;
    }

    console.log('User added successfully:', data);
    return data;
  } catch (error) {
    console.error('Error in addUserDetails:', error);
    throw error;
  }
}