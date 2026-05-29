/**
 * /debug/[id] - System Debug & Audit Trail
 * 
 * Displays the complete execution flow for research transparency and debugging.
 * Shows prompts, raw responses, parsed outputs, memory operations, and errors.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ChevronDown, ChevronUp, Copy } from "lucide-react";
import {
  getEpisodeById,
  listDebugLogsByEpisodeId,
  listFeedbackByEpisodeId,
  getReflectionByEpisodeId,
} from "@/lib/coevotalk/storage";
import type { InteractionEpisode, DebugLog } from "@/lib/coevotalk/types";

export default function Debug() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/debug/:id");
  const episodeId = params?.id as string;

  const [episode, setEpisode] = useState<InteractionEpisode | null>(null);
  const [debugLogs, setDebugLogs] = useState<DebugLog[]>([]);
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [reflection, setReflection] = useState<any>(null);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!episodeId) return;

    const ep = getEpisodeById(episodeId);
    setEpisode(ep);

    const logs = listDebugLogsByEpisodeId(episodeId);
    setDebugLogs(logs);

    const fbs = listFeedbackByEpisodeId(episodeId);
    setFeedbacks(fbs);

    const ref = getReflectionByEpisodeId(episodeId);
    setReflection(ref);
  }, [episodeId]);

  const toggleLogExpanded = (logId: string) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(logId)) {
      newExpanded.delete(logId);
    } else {
      newExpanded.add(logId);
    }
    setExpandedLogs(newExpanded);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatJson = (obj: unknown): string => {
    return JSON.stringify(obj, null, 2);
  };

  const renderJson = (obj: unknown): string => {
    try {
      return formatJson(obj) || "{}";
    } catch {
      return "{}";
    }
  };

  const renderJsonNode = (obj: unknown): React.ReactNode => {
    return renderJson(obj) as React.ReactNode;
  };

  if (!match || !episode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/session/${episodeId}`)}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Debug: {episode.title}</h1>
            <p className="text-xs text-muted-foreground">
              Complete audit trail for research transparency
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <Tabs defaultValue="logs" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="logs">Debug Logs ({debugLogs.length})</TabsTrigger>
            <TabsTrigger value="feedback">Feedback ({feedbacks.length})</TabsTrigger>
            <TabsTrigger value="reflection">Reflection</TabsTrigger>
          </TabsList>

          {/* Debug Logs */}
          <TabsContent value="logs" className="space-y-4">
            {debugLogs.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No debug logs found</p>
                </CardContent>
              </Card>
            ) : (
              debugLogs.map((log, idx) => (
                <Card key={log.id}>
                  <CardHeader
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleLogExpanded(log.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 flex-1">
                        {expandedLogs.has(log.id) ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                        <div>
                          <CardTitle className="text-base">
                            Step {idx + 1}: {log.step}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {new Date(log.createdAt).toLocaleTimeString()}
                          </CardDescription>
                        </div>
                      </div>
                      {log.error && (
                        <Badge variant="destructive">Error</Badge>
                      )}
                    </div>
                  </CardHeader>

                  {expandedLogs.has(log.id) && (
                    <CardContent className="space-y-4 border-t border-border pt-4">
                      {log.input !== undefined && log.input !== null && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm text-foreground">Input</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(formatJson(log.input))}
                              className="gap-1"
                            >
                              <Copy className="h-3 w-3" />
                              Copy
                            </Button>
                          </div>
                          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto text-foreground">
                            {renderJsonNode(log.input)}
                          </pre>
                        </div>
                      )}

                      {log.retrievedMemory && log.retrievedMemory.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-foreground">
                            Retrieved Memory ({log.retrievedMemory.length} items)
                          </h4>
                          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto text-foreground">
                            {renderJsonNode(log.retrievedMemory)}
                          </pre>
                        </div>
                      )}

                      {log.prompt && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm text-foreground">Prompt</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(log.prompt!)}
                              className="gap-1"
                            >
                              <Copy className="h-3 w-3" />
                              Copy
                            </Button>
                          </div>
                          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto text-foreground whitespace-pre-wrap">
                            {log.prompt}
                          </pre>
                        </div>
                      )}

                      {log.rawResponse && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm text-foreground">Raw Response</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(log.rawResponse!)}
                              className="gap-1"
                            >
                              <Copy className="h-3 w-3" />
                              Copy
                            </Button>
                          </div>
                          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto text-foreground">
                            {log.rawResponse}
                          </pre>
                        </div>
                      )}

                      {log.parsedOutput !== undefined && log.parsedOutput !== null && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-sm text-foreground">Parsed Output</h4>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(formatJson(log.parsedOutput))}
                              className="gap-1"
                            >
                              <Copy className="h-3 w-3" />
                              Copy
                            </Button>
                          </div>
                          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto text-foreground">
                            {renderJsonNode(log.parsedOutput)}
                          </pre>
                        </div>
                      )}

                      {log.memoryWrites && log.memoryWrites.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-foreground">
                            Memory Writes ({log.memoryWrites.length} items)
                          </h4>
                          <pre className="bg-muted p-3 rounded text-xs overflow-x-auto text-foreground">
                            {renderJsonNode(log.memoryWrites)}
                          </pre>
                        </div>
                      )}

                      {log.error && (
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm text-red-600 dark:text-red-400">
                            Error
                          </h4>
                          <pre className="bg-red-50 dark:bg-red-950/20 p-3 rounded text-xs overflow-x-auto text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900">
                            {log.error}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  )}
                </Card>
              ))
            )}
          </TabsContent>

          {/* Feedback */}
          <TabsContent value="feedback" className="space-y-4">
            {feedbacks.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No feedback recorded yet</p>
                </CardContent>
              </Card>
            ) : (
              feedbacks.map((feedback) => (
                <Card key={feedback.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">
                          {feedback.feedbackType.replace(/_/g, " ")}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(feedback.createdAt).toLocaleString()}
                        </CardDescription>
                      </div>
                      <Badge>{feedback.targetSection}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground">Content:</p>
                      <p className="text-sm text-foreground">{feedback.targetContent}</p>
                    </div>
                    {feedback.correction && (
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground">Correction:</p>
                        <p className="text-sm text-foreground">{feedback.correction}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Reflection */}
          <TabsContent value="reflection" className="space-y-4">
            {!reflection ? (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-muted-foreground">No reflection recorded yet</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Reflection Record</CardTitle>
                  <CardDescription>
                    {new Date(reflection.createdAt).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Actual Outcome</h4>
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {reflection.actualOutcome}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">What Was Accurate</h4>
                      <ul className="text-sm text-foreground space-y-1">
                        {reflection.whatWasAccurate.map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">What Was Wrong</h4>
                      <ul className="text-sm text-foreground space-y-1">
                        {reflection.whatWasWrong.map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">
                        Assumptions Confirmed
                      </h4>
                      <ul className="text-sm text-foreground space-y-1">
                        {reflection.assumptionsConfirmed.map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">
                        Assumptions Falsified
                      </h4>
                      <ul className="text-sm text-foreground space-y-1">
                        {reflection.assumptionsFalsified.map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {reflection.newEvidence.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">New Evidence</h4>
                      <ul className="text-sm text-foreground space-y-1">
                        {reflection.newEvidence.map((item: string, idx: number) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {reflection.nextAction && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-foreground">Next Action</h4>
                      <p className="text-sm text-foreground">{reflection.nextAction}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
