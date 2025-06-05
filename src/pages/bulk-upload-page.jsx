import { BulkUpload } from '../components/dashboard/BulkUpload';
import { ThemeProvider } from '@/themes/theme-provider';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { SiteHeader } from '@/components/dashboard/site-header';
import { Toaster } from '@/components/ui/sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { FileText, Calendar, User, CheckCircle } from 'lucide-react';

export default function BulkUploadPage() {
  return (
    <ThemeProvider>
      <Toaster />
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader title="Bulk Upload" />
          <div className="p-6">
            <div className="space-y-6">
              <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Bulk Upload</h1>
                <p className="text-muted-foreground">
                  Upload multiple leave records at once using a CSV or Excel file
                </p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <BulkUpload />
                
                <Card>
                  <CardHeader>
                    <CardTitle>Instructions</CardTitle>
                    <CardDescription>
                      Follow these guidelines to prepare your file for bulk upload
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        File Format
                      </h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Supported formats: CSV or Excel (.xlsx)</li>
                        <li>First row should contain column headers</li>
                        <li>Maximum file size: 10MB</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Required Columns
                      </h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Employee Name</li>
                        <li>Staff ID</li>
                        <li>Leave Type</li>
                        <li>Start Date</li>
                        <li>End Date</li>
                        <li>Status</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Date Format
                      </h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Supported formats: DD/MM/YYYY, D/MM/YYYY, DD/M/YYYY, D/M/YYYY</li>
                        <li>Example: 25/5/2024 or 5/5/2024</li>
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Tips
                      </h3>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        <li>Preview your data before uploading</li>
                        <li>Check for duplicate entries</li>
                        <li>Ensure all required fields are filled</li>
                        <li>Verify date formats are correct</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
} 