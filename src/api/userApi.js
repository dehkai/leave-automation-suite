import { supabase } from '@/lib/supabaseClient';

export async function addUserDetails(payload) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        uuid: payload.uuid,
        full_name: payload.full_name,
        email: payload.email
      }]);

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