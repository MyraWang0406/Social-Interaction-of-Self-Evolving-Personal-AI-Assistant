/**
 * / - Home Page
 * 
 * Dashboard showing recent interactions and navigation to all features.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Brain, BarChart3, Settings } from "lucide-react";
import { listEpisodes, getStorageStats } from "@/lib/coevotalk/storage";
import type { InteractionEpisode } from "@/lib/coevotalk/types";

export default function Home() {
  const [, navigate] = useLocation();
  const [episodes, setEpisodes] = useState<InteractionEpisode[]>([]);
  const [stats, setStats] = useState({
    episodes: 0,
    memories: 0,
    deliberations: 0,
    reflections: 0,
    feedbackRecords: 0,
    debugLogs: 0,
  });

  useEffect(() => {
    const eps = listEpisodes();
    setEpisodes(eps);
    setStats(getStorageStats());
  }, []);

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      draft: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200",
      deliberating: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      ready: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      completed: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    };
    return colors[status] || colors.draft;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">CoEvoTalk</h1>
              <p className="text-lg text-muted-foreground mt-2">
                A Self-Evolving Personal AI Assistant for Reflective Social Interaction
              </p>
              <p className="text-sm text-muted-foreground mt-4 max-w-2xl">
                Prepare for high-stakes social interactions through structured deliberation,
                what-if analysis, and long-term memory. Learn from past interactions and
                improve your communication strategies over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-b border-border bg-muted/50">
        <div className="container py-4 flex gap-2">
          <Button
            onClick={() => navigate("/new")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New Interaction
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/memory")}
            className="gap-2"
          >
            <Brain className="h-4 w-4" />
            Long-Term Memory
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Main Panel */}
          <div className="col-span-3 space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">
                    {stats.episodes}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total sessions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Memories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">
                    {stats.memories}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Long-term patterns
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Reflections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">
                    {stats.reflections}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Post-interaction reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Interactions */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Interactions</CardTitle>
                <CardDescription>
                  {episodes.length === 0
                    ? "No interactions yet. Create one to get started."
                    : `${episodes.length} total interactions`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {episodes.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground mb-4">
                      Start by creating a new interaction to prepare for a high-stakes social
                      conversation.
                    </p>
                    <Button onClick={() => navigate("/new")} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Create First Interaction
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {episodes.slice(0, 10).map((episode) => (
                      <div
                        key={episode.id}
                        className="p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                        onClick={() => navigate(`/session/${episode.id}`)}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">
                              {episode.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {episode.person} ({episode.relationship})
                            </p>
                            <p className="text-sm text-foreground mt-2">
                              {episode.goal}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge className={getStatusColor(episode.status)}>
                              {episode.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground">
                              {new Date(episode.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/new")}
                >
                  <Plus className="h-4 w-4" />
                  New Interaction
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => navigate("/memory")}
                >
                  <Brain className="h-4 w-4" />
                  View Memories
                </Button>
              </CardContent>
            </Card>

            {/* System Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage Mode:</span>
                  <span className="font-semibold">localStorage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LLM Mode:</span>
                  <span className="font-semibold">Mock (Development)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Memory Retrieval:</span>
                  <span className="font-semibold">Keyword Matching</span>
                </div>
                <div className="pt-2 border-t border-border text-xs text-muted-foreground">
                  <p>
                    This is a research prototype. Data is stored locally in your browser.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Research Info */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
              <CardHeader>
                <CardTitle className="text-base">Research Focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-foreground">
                <p>
                  CoEvoTalk explores how personal AI assistants can support reflective social
                  interaction through:
                </p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Long-term relationship memory</li>
                  <li>What-if deliberation</li>
                  <li>Multi-perspective analysis</li>
                  <li>Post-interaction reflection</li>
                  <li>Adaptive learning from feedback</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
