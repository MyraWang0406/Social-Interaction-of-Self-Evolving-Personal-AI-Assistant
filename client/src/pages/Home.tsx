/**
 * / - Home Page
 *
 * Dashboard showing recent interactions and navigation to all features.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Plus,
  Brain,
  Zap,
  Download,
  User,
} from "lucide-react";

import {
  listEpisodes,
  getStorageStats,
  createEpisode,
  saveDeliberation,
  saveMemoryItem,
  retrieveRelevantMemories,
} from "@/lib/coevotalk/storage";

import { generateMockDeliberation } from "@/lib/coevotalk/mockLLM";
import {
  allSampleScenarios,
  scenarioLabels,
  getAllScenarioKeys,
} from "@/lib/coevotalk/sampleScenarios";

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

  const [showScenarioDialog, setShowScenarioDialog] = useState(false);

  const [participantId, setParticipantId] = useState(() => {
    return localStorage.getItem("coevotalk_participant_id") || "P001";
  });

  useEffect(() => {
    setEpisodes(listEpisodes());
    setStats(getStorageStats());
  }, []);

  const refreshDashboard = () => {
    setEpisodes(listEpisodes());
    setStats(getStorageStats());
  };

  const handleParticipantIdChange = (newId: string) => {
    setParticipantId(newId);
    localStorage.setItem("coevotalk_participant_id", newId);
  };

  const handleLoadScenario = (scenarioKey: string) => {
    const scenario = allSampleScenarios[scenarioKey];

    if (!scenario) return;

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

    scenario.memories.forEach((memory) => {
      saveMemoryItem({
        type: memory.type,
        content: memory.content,
        evidence: memory.evidence,
        confidence: memory.confidence,
        status: memory.status,
        relatedPerson: memory.relatedPerson,
        relatedEpisodeId: episode.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    const relevantMemories = retrieveRelevantMemories(episode);

    const deliberation = scenario.deliberation
      ? {
          ...scenario.deliberation,
          episodeId: episode.id,
        }
      : generateMockDeliberation(episode, relevantMemories);

    saveDeliberation(episode.id, deliberation);

    refreshDashboard();
    setShowScenarioDialog(false);
    navigate(`/session/${episode.id}`);
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
      <Dialog open={showScenarioDialog} onOpenChange={setShowScenarioDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Load Sample Scenario</DialogTitle>
            <DialogDescription>
              Choose a scenario to quickly test CoEvoTalk. Sample data will be
              loaded into your browser localStorage.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-3 max-h-[60vh] overflow-y-auto">
            {getAllScenarioKeys().map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleLoadScenario(key)}
                className="text-left p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <div className="font-medium">
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

      <div className="border-b border-border bg-card">
        <div className="container py-10">
          <h1 className="text-5xl font-bold text-foreground mb-3">
            CoEvoTalk
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            A self-evolving personal AI assistant for reflective career,
            workplace, and social decisions.
          </p>
          <p className="text-sm text-muted-foreground max-w-3xl mt-3">
            This is an early research prototype using mock LLM outputs and
            browser localStorage.
          </p>
        </div>
      </div>

      <div className="border-b border-border bg-card">
        <div className="container py-4 flex flex-wrap gap-3">
          <Button onClick={() => navigate("/new")} className="gap-2">
            <Plus className="h-4 w-4" />
            New Interaction
          </Button>

          <Button
            variant="outline"
            onClick={() => setShowScenarioDialog(true)}
            className="gap-2"
          >
            <Zap className="h-4 w-4" />
            Load Sample Scenario
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/baseline")}
            className="gap-2"
          >
            Baseline Assistant
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
            variant="outline"
            onClick={() => navigate("/export")}
            className="gap-2"
          >
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Interactions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.episodes}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Total sessions
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Memories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.memories}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Long-term patterns
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Reflections
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.reflections}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Post-interaction reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Interactions</CardTitle>
                <CardDescription>
                  {episodes.length === 0
                    ? "No interactions yet. Create one or load a sample scenario."
                    : `${episodes.length} total interactions`}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {episodes.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      Start by creating a new interaction or loading a sample
                      scenario.
                    </p>
                    <div className="flex justify-center gap-3 flex-wrap">
                      <Button onClick={() => navigate("/new")}>
                        Create First Interaction
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowScenarioDialog(true)}
                      >
                        Load Sample Scenario
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {episodes.slice(0, 10).map((episode) => (
                      <button
                        key={episode.id}
                        type="button"
                        onClick={() => navigate(`/session/${episode.id}`)}
                        className="w-full text-left p-4 border border-border rounded-lg hover:bg-muted transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold">{episode.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {episode.person} ({episode.relationship})
                            </p>
                            <p className="text-sm mt-2 line-clamp-2">
                              {episode.goal}
                            </p>
                          </div>
                          <div className="flex flex-col items-end gap-2">
                            <Badge className={getStatusColor(episode.status)}>
                              {episode.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {new Date(episode.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/new")}
                >
                  New Interaction
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setShowScenarioDialog(true)}
                >
                  Load Sample Scenario
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/baseline")}
                >
                  Baseline Assistant
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/memory")}
                >
                  View Memories
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/export")}
                >
                  Export Data
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Storage Mode</span>
                  <Badge variant="secondary">localStorage</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">LLM Mode</span>
                  <Badge variant="secondary">Mock</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Memory Retrieval
                  </span>
                  <Badge variant="secondary">Keyword</Badge>
                </div>
                <p className="text-xs text-muted-foreground pt-2">
                  This is a research prototype. Data is stored locally in your
                  browser.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Research Focus</CardTitle>
                <CardDescription>
                  Pilot-study preparation and RA review
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="space-y-2">
                  <label className="text-xs font-medium flex items-center gap-2">
                    <User className="h-3 w-3" />
                    Participant ID
                  </label>
                  <Input
                    value={participantId}
                    onChange={(e) => handleParticipantIdChange(e.target.value)}
                    placeholder="e.g., P001"
                    className="text-xs h-8"
                  />
                </div>

                <p>
                  CoEvoTalk explores how personal AI assistants can support
                  reflective decision-making through:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>longitudinal memory;</li>
                  <li>what-if deliberation;</li>
                  <li>multi-perspective analysis;</li>
                  <li>post-interaction reflection;</li>
                  <li>feedback-based adaptation.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
