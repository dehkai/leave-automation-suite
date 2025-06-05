import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabaseClient';
import * as XLSX from 'xlsx';
import { Upload, FileText, AlertCircle } from 'lucide-react';

function excelSerialToDate(serial) {
  const adjustedSerial = serial - 1;
  const epoch = new Date(1900, 0, 1);
  const date = new Date(epoch.getTime() + adjustedSerial * 24 * 60 * 60 * 1000);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}

function formatDateForDisplay(dateStr) {
  if (!dateStr) return '';
  
  if (typeof dateStr === 'number') {
    return excelSerialToDate(dateStr);
  }
  
  return dateStr;
}

export function BulkUpload() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type === 'text/csv' || 
        selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
      setFile(selectedFile);
      parseFile(selectedFile).then(data => {
        setPreview(data.slice(0, 5)); // Show first 5 rows as preview
      }).catch(error => {
        toast.error("Error parsing file", {
          description: error.message
        });
      });
    } else {
      toast.error("Invalid file type", {
        description: "Please upload a CSV or Excel file"
      });
    }
  };

  const parseFile = async (file) => {
    if (file.type === 'text/csv') {
      const text = await file.text();
      const Papa = (await import('papaparse')).default;
      return new Promise((resolve, reject) => {
        Papa.parse(text, {
          header: true,
          complete: (results) => resolve(results.data),
          error: (error) => reject(error)
        });
      });
    } else {
      // Handle XLSX
      const arrayBuffer = await file.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { cellDates: true }); // Enable cellDates to get proper date objects
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const rawData = XLSX.utils.sheet_to_json(firstSheet, { raw: false }); // Use raw: false to get formatted values
      
      // Format dates in the data
      return rawData.map(row => {
        const formattedRow = { ...row };
        if ('Start Date' in formattedRow) {
          formattedRow['Start Date'] = formatDateForDisplay(formattedRow['Start Date']);
        }
        if ('End Date' in formattedRow) {
          formattedRow['End Date'] = formatDateForDisplay(formattedRow['End Date']);
        }
        return formattedRow;
      });
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("No file selected", {
        description: "Please select a CSV or Excel file to upload"
      });
      return;
    }

    setIsLoading(true);
    try {
      const data = await parseFile(file);
      
      const { data: response, error } = await supabase.functions.invoke('bulk-leave-application-csv', {
        body: { 
          csvData: data
        }
      });

      if (error) throw error;

      // Show summary toast
      toast.success("Upload completed", {
        description: `Processed ${response.summary.total} records: ${response.summary.inserted} inserted, ${response.summary.duplicates} duplicates, ${response.summary.errors} errors`
      });

      // Show detailed errors if any
      if (response.details.errors.length > 0) {
        toast.error("Some records failed", {
          description: `${response.details.errors.length} records had errors. Check the console for details.`
        });
        console.error('Failed records:', response.details.errors);
      }

      // Show duplicates if any
      if (response.details.duplicates.length > 0) {
        toast.warning("Duplicates found", {
          description: `${response.details.duplicates.length} duplicate records were skipped.`
        });
      }

      // Reset the form
      setFile(null);
      setPreview(null);
    } catch (error) {
      toast.error("Upload failed", {
        description: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Bulk Upload</CardTitle>
        <CardDescription>
          Upload a CSV or Excel file to add multiple leave records at once
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <div className="flex items-center gap-2">
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={handleFileChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              {file && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setFile(null);
                    setPreview(null);
                  }}
                >
                  <AlertCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
            {file && (
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {file.name}
              </div>
            )}
          </div>

          {preview && (
            <div className="rounded-md border p-4">
              <h3 className="text-sm font-medium mb-2">Preview (First 5 rows)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      {Object.keys(preview[0]).map((header) => (
                        <th key={header} className="text-left p-2 border-b">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, index) => (
                      <tr key={index}>
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="p-2 border-b">
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <Button 
            onClick={handleUpload} 
            disabled={!file || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4 animate-spin" />
                Uploading...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </div>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 