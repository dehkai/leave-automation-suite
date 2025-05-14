import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export async function submitLeaveApplication(payload) {
  try {
    console.log('Payload being sent:', payload);
    const { data, error } = await supabase.functions.invoke('leave-application', {
      body: payload,
    });
    if (error) {
      console.error('Error invoking leave application function', error);
      throw error;
    }
    console.log('Leave application submitted successfully', data);
    return data;
  } catch (error) {
    console.error('Error submitting leave application', error);
    throw error;
  }
}

export async function getLeaveApplications() {
  try {
    const { data, error } = await supabase
      .from('leave_applications')
      .select('employee_id, employee_name, leave_type, start_date, end_date, status');
    if (error) {
      console.error('Error fetching leave applications', error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error('Error in getLeaveApplications', error);
    throw error;
  }
}