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

const leaveSchema = z.object({
  employeeId: z.string().min(1, { message: "Employee ID is required" }),
  employeeName: z.string().min(1, { message: "Employee Name is required" }),
  leaveType: z.string().min(1, { message: "Leave Type is required" }),
  startDate: z.date({ required_error: "Start Date is required" }),
  endDate: z.date({ required_error: "End Date is required" }),
  status: z.string().min(1, { message: "Status is required" })
})

export default function LeaveSubmissionPage() {
  const [showStartDatePicker, setShowStartDatePicker] = React.useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(leaveSchema),
    defaultValues: {
      employeeId: "",
      employeeName: "",
      leaveType: "",
      status: "Pending"
    }
  })

  function onSubmit(values) {
    console.log(values)
  }

  return (
    <ThemeProvider>
        <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
      <SiteHeader title="Leave Application Form" />
    <div className="p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
            <FormField control={form.control} name="employeeId" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Employee ID</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Employee ID" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="employeeName" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Employee Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Employee Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="leaveType" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Leave Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Annual">Annual</SelectItem>
                    <SelectItem value="Sick">Sick</SelectItem>
                    <SelectItem value="Emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="startDate" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="MM/DD/YY"
                      value={field.value ? format(field.value, 'MM/dd/yy') : ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (!isNaN(date)) field.onChange(date);
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
                        field.onChange(date);
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
            <FormField control={form.control} name="endDate" render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="MM/DD/YY"
                      value={field.value ? format(field.value, 'MM/dd/yy') : ''}
                      onChange={(e) => {
                        const date = new Date(e.target.value);
                        if (!isNaN(date)) field.onChange(date);
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
                        field.onChange(date);
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