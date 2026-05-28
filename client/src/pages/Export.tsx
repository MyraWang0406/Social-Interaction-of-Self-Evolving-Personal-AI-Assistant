/**
 * /export - Research Data Export
 * 
 * Export collected data for research analysis.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, FileJson, FileText } from "lucide-react";
import { getDataSummary, exportDataAsJSON, exportDataAsCSV, collectResearchData } from "@/lib/coevotalk/exportData";
import { toast } from "sonner";

export default function Export() {
  const [, navigate] = useLocation();
  const [summary, setSummary] = useState<any>(null);
  const [dataPreview, setDataPreview] = useState<any>(null);

  useEffect(() => {
    const s = getDataSummary();
    setSummary(s);
    const preview = collectResearchData();
    setDataPreview(preview);
  }, []);

  const handleExportJSON = () => {
    try {
      exportDataAsJSON();
      toast.success("Data exported as JSON");
    } catch (error) {
      toast.error("Failed to export JSON");
      console.error(error);
    }
  };

  const handleExportCSV = () => {
    try {
      exportDataAsCSV();
      toast.success("Data exported as CSV");
    } catch (error) {
      toast.error("Failed to export CSV");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Research Data Export</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Export your collected data for analysis
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Data Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {summary ? (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Interactions</p>
                      <p className="text-2xl font-bold text-foreground">{summary.totalInteractions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Memories</p>
                      <p className="text-2xl font-bold text-foreground">{summary.totalMemories}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Baseline Sessions</p>
                      <p className="text-2xl font-bold text-foreground">{summary.totalBaselineSessions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Completed Interactions</p>
                      <p className="text-2xl font-bold text-foreground">{summary.completedInteractions}</p>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">
                        Avg Memories per Interaction: {summary.averageMemoriesPerInteraction}
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted-foreground">Loading...</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <div className="lg:col-span-2 space-y-6">
            {/* JSON Export */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileJson className="h-5 w-5" />
                  JSON Export
                </CardTitle>
                <CardDescription>
                  Complete research data in JSON format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  Export all interactions, memories, deliberations, reflections, feedback, and debug logs as a single JSON file.
                  Perfect for data analysis, visualization, or integration with research tools.
                </p>
                <div className="bg-muted p-4 rounded-lg text-xs font-mono text-muted-foreground overflow-auto max-h-40">
                  <pre>{`{\n  "exportDate": "2026-05-28T...",\n  "version": "1.0.0",\n  "summary": {\n    "totalInteractions": 5,\n    "totalMemories": 12\n  },\n  "coevotalkData": { ... }\n}`}</pre>
                </div>
                <Button onClick={handleExportJSON} className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Export as JSON
                </Button>
              </CardContent>
            </Card>

            {/* CSV Export */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  CSV Export
                </CardTitle>
                <CardDescription>
                  Simplified data in CSV format
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-foreground">
                  Export a simplified view of episodes, memories, and baseline sessions as CSV.
                  Ideal for spreadsheet analysis or quick data review.
                </p>
                <div className="bg-muted p-4 rounded-lg text-xs font-mono text-muted-foreground overflow-auto max-h-40">
                  <pre>{`Type,ID,Person,Relationship,Goal,Status,CreatedAt
Episode,ep_001,"Manager","Direct Supervisor","Negotiate raise","completed","2026-05-28T..."
Memory,mem_001,"Manager","communication_style","Direct communication preferred","0.9","2026-05-28T..."
Baseline,bs_001,"Manager","Direct Supervisor","Negotiate raise","","2026-05-28T..."`}</pre>
                </div>
                <Button onClick={handleExportCSV} className="w-full gap-2" variant="outline">
                  <Download className="h-4 w-4" />
                  Export as CSV
                </Button>
              </CardContent>
            </Card>

            {/* Info */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <CardHeader>
                <CardTitle className="text-base">Research Data Structure</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground space-y-2">
                <p>
                  Your exported data includes:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li><strong>Episodes:</strong> Each interaction session with context, goals, and concerns</li>
                  <li><strong>Memories:</strong> Long-term patterns extracted from reflections</li>
                  <li><strong>Deliberations:</strong> AI's multi-perspective analysis for each episode</li>
                  <li><strong>Reflections:</strong> Post-interaction reviews and lessons learned</li>
                  <li><strong>Feedback:</strong> User feedback on AI suggestions</li>
                  <li><strong>Debug Logs:</strong> Complete audit trail of system operations</li>
                  <li><strong>Baseline Sessions:</strong> Simple advice for comparison studies</li>
                </ul>
              </CardContent>
            </Card>

            {/* Ethics Notice */}
            <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
              <CardHeader>
                <CardTitle className="text-base">Data Privacy & Ethics</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-foreground">
                <p>
                  All data is stored locally in your browser. When you export, you are downloading your own data.
                  This system does not send any data to external servers. Please ensure you comply with your institution's
                  research ethics guidelines when sharing or publishing this data.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
