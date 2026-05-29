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
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Brain, BarChart3, Settings, Zap, Download, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  listEpisodes,
  getStorageStats,
  createEpisode,
  saveDeliberation,
  saveMemoryItem,
  retrieveRelevantMemories,
} from "@/lib/coevotalk/storage";
import { generateMockDeliberation } from "@/lib/coevotalk/mockLLM";
import type { InteractionEpisode } from "@/lib/coevotalk/types";
import { allSampleScenarios, scenarioLabels, getAllScenarioKeys } from "@/lib/coevotalk/sampleScenarios";

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
  const [showScenarioDialog, setShowScenarioDialog] = useState(false);
  const [participantId, setParticipantId] = useState(() => {
    return localStorage.getItem("coevotalk_participant_id") || "P001";
  });

  useEffect(() => {
    const eps = listEpisodes();
    setEpisodes(eps);
    setStats(getStorageStats());
  }, []);

  const handleParticipantIdChange = (newId: string) => {
    setParticipantId(newId);
    localStorage.setItem("coevotalk_participant_id", newId);
  };

  const handleLoadScenario = (scenarioKey: string) => {
    const scenario = allSampleScenarios[scenarioKey];
    if (scenario) {
      // Save episode
      const episode = createEpisode({
        title: scenario.episode.title,
        person: scenario.episode.person,
        relationship: scenario.episode.relationship,
        context: scenario.episode.context,
        goal: scenario.episode.goal,
        concerns: scenario.episode.concerns,
        knownEvidence: scenario.episode.knownEvidence,
        desiredOutcome: scenario.episode.desiredOutcome,
      });
      
      // Save memories
      scenario.memories.forEach(memory => {
        const storageKey = `memory_${memory.id}`;
        localStorage.setItem(storageKey, JSON.stringify(memory));
      });
      
      setShowScenarioDialog(false);
      navigate(`/session/${episode.id}`);
    }
  };

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
      {/* Sample Scenario Dialog */}
      <Dialog open={showScenarioDialog} onOpenChange={setShowScenarioDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Load Sample Scenario</DialogTitle>
            <DialogDescription>
              Choose a scenario to quickly test CoEvoTalk. All data will be loaded into your browser.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto">
            {getAllScenarioKeys().map((key) => (
              <button
                key={key}
                onClick={() => handleLoadScenario(key)}
                className="text-left p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <div className="font-semibold text-foreground">
                  Scenario {key}: {scenarioLabels[key]}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {allSampleScenarios[key].episode.goal}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

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
        <div className="container py-4 flex gap-2 flex-wrap">
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
          <Button
            variant="secondary"
            onClick={() => setShowScenarioDialog(true)}
            className="gap-2"
          >
            <Zap className="h-4 w-4" />
            Load Sample Scenario
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/export")}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/baseline")}
            className="gap-2"
          >
            <Settings className="h-4 w-4" />
            Baseline Assistant
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Panel - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 sm:gap-4">
              <Card className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-sm sm:text-base">Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stats.episodes}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total sessions
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-sm sm:text-base">Memories</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stats.memories}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Long-term patterns
                  </p>
                </CardContent>
              </Card>

              <Card className="overflow-hidden">
                <CardHeader className="pb-2 sm:pb-3">
                  <CardTitle className="text-sm sm:text-base">Reflections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl sm:text-3xl font-bold text-foreground">
                    {stats.reflections}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Post-interaction reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Interactions */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="text-lg">Recent Interactions</CardTitle>
                <CardDescription>
                  {episodes.length === 0
                    ? "No interactions yet. Create one to get started."
                    : `${episodes.length} total interactions`}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                {episodes.length === 0 ? (
                  <div className="text-center py-8 sm:py-12">
                    <p className="text-xs sm:text-sm text-muted-foreground mb-4">
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
                        className="p-3 sm:p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors overflow-hidden"
                        onClick={() => navigate(`/session/${episode.id}`)}
                      >
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">
                              {episode.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-muted-foreground mt-1 truncate">
                              {episode.person} ({episode.relationship})
                            </p>
                            <p className="text-xs sm:text-sm text-foreground mt-2 line-clamp-2">
                              {episode.goal}
                            </p>
                          </div>
                          <div className="flex flex-row sm:flex-col gap-2 items-end flex-shrink-0">
                            <Badge className={`${getStatusColor(episode.status)} text-xs`}>
                              {episode.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground whitespace-nowrap">
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

          {/* Sidebar - Right Column */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => setShowScenarioDialog(true)}
                >
                  <Zap className="h-4 w-4" />
                  Sample Scenario
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
            </div>

            {/* Research Info */}
            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <CardHeader>
              <CardTitle className="text-base">Research Focus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-foreground">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground">Participant ID</label>
                <div className="flex gap-2">
                  <User className="h-4 w-4 text-muted-foreground mt-2" />
                  <Input
                    value={participantId}
                    onChange={(e) => handleParticipantIdChange(e.target.value)}
                    placeholder="e.g., P001"
                    className="text-xs h-8"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground pt-2 border-t border-border">
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
