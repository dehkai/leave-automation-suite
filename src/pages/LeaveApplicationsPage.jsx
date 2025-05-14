import * as React from "react";
import { LeaveApplicationsTable } from "@/components/dashboard/LeaveApplicationsTable";
import { ThemeProvider } from '@/themes/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SiteHeader } from '@/components/dashboard/site-header';
import { Toaster } from '@/components/ui/toaster';

export default function LeaveApplicationsPage() {
  return (
    <ThemeProvider>
      <Toaster />
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader title="Leave Applications" />
          <div className="p-6">
            <LeaveApplicationsTable />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
} 