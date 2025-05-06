import * as React from "react"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ThemeProvider } from '@/themes/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SiteHeader } from '@/components/dashboard/site-header';
import * as z from "zod"
import { submitLeaveApplication } from "@/api/leaveApi";
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

const leaveSchema = z.object({
  employee_id: z.string().min(1, { message: "Employee ID is required" }),
  employee_name: z.string().min(1, { message: "Employee Name is required" }),
  leave_type: z.string().min(1, { message: "Leave Type is required" }),
  start_date: z.string().min(1, { message: "Start Date is required" }).refine((val) => {
    const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$|^(\d{1,2})\/(\d{1,2})\/(\d{4})$|^(\d{1,2})\/(\d{1,2})\/(\d{4})$|^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    return datePattern.test(val) && !isNaN(Date.parse(val));
  }, {
    message: "Invalid date format, please use MM/DD/YYYY, M/D/YYYY, MM/D/YYYY, or M/DD/YYYY"
  }),
  end_date: z.string().min(1, { message: "End Date is required" }).refine((val) => {
    const datePattern = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$|^(\d{1,2})\/(\d{1,2})\/(\d{4})$|^(\d{1,2})\/(\d{1,2})\/(\d{4})$|^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
    return datePattern.test(val) && !isNaN(Date.parse(val));
  }, {
    message: "Invalid date format, please use MM/DD/YYYY, M/D/YYYY, MM/D/YYYY, or M/DD/YYYY"
  }),
  status: z.string().min(1, { message: "Status is required" })
});

export default function LeaveSubmissionPage() {
  const { toast } = useToast();
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);
  const [startDateInput, setStartDateInput] = React.useState('');
  const [endDateInput, setEndDateInput] = React.useState('');

  const form = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      employee_id: "",
      employee_name: "",
      leave_type: "",
      status: "Pending"
    }
  })

  function onSubmit(values) {
    const start_date = new Date(values.start_date);
    const end_date = new Date(values.end_date);
    if (end_date <= start_date) {
      form.setError('end_date', {
        type: 'manual',
        message: 'End date must be after start date'
      });
      return;
    }

    submitLeaveApplication(values)
      .then(response => {
        toast({
          title: 'Success',
          description: 'Leave application submitted successfully',
          status: 'success',
          variant: 'success',
        });
        console.log('Leave application submitted successfully', response);
        form.reset({
          employee_id: "",
          employee_name: "",
          leave_type: "",
          status: "Pending"
        });
        setStartDateInput('');
        setEndDateInput('');
      })
      .catch(error => {
        const statusCode = error?.status || error?.response?.status || error?.originalError?.status || error?.response?.statusCode;
        if (statusCode === 409) {
          toast({
            title: 'Conflict Detected',
            description: 'A leave application already exists for this employee with overlapping dates',
            status: 'error',
            variant: 'destructive',
            duration: 5000,
          });
          return;
        }
        else if (statusCode === 400) {
          toast({
            title: 'Validation Error',
            description: 'Please check your input values and try again',
            status: 'error',
            variant: 'destructive',
            duration: 5000,
          });
          return;
        }
        console.error('Failed to submit leave application', error);
        console.log('Error status:', error.status);
        console.log('Error response status:', error.response?.status);
        toast({
          title: 'Error',
          description: 'Failed to submit leave application',
          status: 'error',
          variant: 'destructive',
        });
        form.reset({
          employee_id: "",
          employee_name: "",
          leave_type: "",
          status: "Pending"
        });
        setStartDateInput('');
        setEndDateInput('');
      });
  }

  const formatDateInput = (value) => {
    const cleaned = value.replace(/[^0-9/]/g, '');
    const match = cleaned.match(/^((\d{1,2})\/(\d{1,2})\/(\d{4}))$|^((\d{1,2})\/(\d{1,2})\/(\d{4}))$|^((\d{1,2})\/(\d{1,2})\/(\d{4}))$|^((\d{1,2})\/(\d{1,2})\/(\d{4}))$/);
    if (!match) return value;
    const [_, month, day, year] = match;
    const formattedDate = `${month}/${day}/${year}`;
    return isNaN(Date.parse(formattedDate)) ? value : formattedDate;
  };

  return (
    <ThemeProvider>
      <Toaster />
        <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
      <SiteHeader title="Leave Application Form" />
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField control={form.control} name="employee_id" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Employee ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="employee_name" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Employee Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Employee Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="leave_type" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Leave Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Annual Leave">Annual Leave</SelectItem>
                    <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                    <SelectItem value="Emergency Leave">Emergency Leave</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="start_date" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="MM/DD/YYYY"
                      value={startDateInput}
                      onChange={(e) => {
                        const formatted = formatDateInput(e.target.value);
                        setStartDateInput(formatted);
                        field.onChange(formatted);
                      }}
                      className="pr-10"
                    />
                    <CalendarIcon
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer text-muted-foreground"
                      onClick={() => setShowStartDatePicker(!showStartDatePicker)}
                    />
                  </div>
                </FormControl>
                {showStartDatePicker && (
                  <div className="absolute z-10 mt-2 shadow-lg rounded-md bg-background">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        const formattedDate = format(date, 'MM/dd/yyyy');
                        field.onChange(formattedDate);
                        setStartDateInput(formattedDate);
                        setShowStartDatePicker(false);
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="end_date" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="MM/DD/YYYY"
                      value={endDateInput}
                      onChange={(e) => {
                        const formatted = formatDateInput(e.target.value);
                        setEndDateInput(formatted);
                        field.onChange(formatted);
                      }}
                      className="pr-10"
                    />
                    <CalendarIcon
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 cursor-pointer text-muted-foreground"
                      onClick={() => setShowEndDatePicker(!showEndDatePicker)}
                    />
                  </div>
                </FormControl>
                {showEndDatePicker && (
                  <div className="absolute z-10 mt-2 shadow-lg rounded-md bg-background">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        const formattedDate = format(date, 'MM/dd/yyyy');
                        field.onChange(formattedDate);
                        setEndDateInput(formattedDate);
                        setShowEndDatePicker(false);
                      }}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Approved">Approved</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
    </SidebarInset>
    </SidebarProvider>
    </ThemeProvider>
  )
}