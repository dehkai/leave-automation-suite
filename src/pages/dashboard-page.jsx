import { SiteHeader } from '@/components/dashboard/site-header';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { ThemeProvider } from '@/themes/theme-provider';

import {
  Calendar,
  CalendarCurrentDate,
  CalendarMonthView,
  CalendarNextTrigger,
  CalendarPrevTrigger,
  CalendarTodayTrigger,
  CalendarViewTrigger,
} from '@/components/dashboard/full-calendar';
import { LeaveApplicationsTable } from '@/components/dashboard/LeaveApplicationsTable';


export default function DashboardPage() {
  return (
    <ThemeProvider>
      <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
      <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}
              <div className="px-4 lg:px-6">
                <Calendar
                  defaultDate={new Date()}
                  events={[]} 
                  enableHotkeys={true}
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-4 border-b">
                    <div className="flex items-center gap-x-2">
                      <CalendarPrevTrigger>&lt;</CalendarPrevTrigger>
                      <CalendarTodayTrigger>Today</CalendarTodayTrigger>
                      <CalendarNextTrigger>&gt;</CalendarNextTrigger>
                    </div>
                    <CalendarCurrentDate />
                    <div className="flex items-center gap-x-1 sm:gap-x-2">
                      <CalendarViewTrigger view="month">Month</CalendarViewTrigger>
                      {/* <CalendarViewTrigger view="week">Week</CalendarViewTrigger> */}
                      {/* <CalendarViewTrigger view="day">Day</CalendarViewTrigger> */}
                      {/* <CalendarViewTrigger view="year">Year</CalendarViewTrigger> */}
                    </div>
                  </div>
                  <div className="p-4 h-[600px] md:h-[700px]"> {/* Adjust height as needed */}
                    <CalendarMonthView />
                    {/* <CalendarWeekView /> */}
                    {/* <CalendarDayView /> */}
                    {/* <CalendarYearView /> */}
                  </div>
                </Calendar>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-4 text-center">Leave Applications List</h2>
                  <LeaveApplicationsTable />
                </div>
              </div>
              {/* <DataTable data={data} /> */}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
    </ThemeProvider>
  );
}