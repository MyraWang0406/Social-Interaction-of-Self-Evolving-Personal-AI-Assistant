/**
 * /session/[id] - View Deliberation Results
 * 
 * Displays the AI's structured analysis of the situation, including
 * assumptions, perspectives, what-if paths, and communication strategies.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageSquare, AlertCircle, Eye, Zap, HelpCircle } from "lucide-react";
import {
  getEpisodeById,
  getDeliberationByEpisodeId,
  retrieveRelevantMemories,
  saveFeedback,
} from "@/lib/coevotalk/storage";
import type { InteractionEpisode, DeliberationOutput } from "@/lib/coevotalk/types";

export default function Session() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/session/:id");
  const episodeId = params?.id as string;

  const [episode, setEpisode] = useState<InteractionEpisode | null>(null);
  const [deliberation, setDeliberation] = useState<DeliberationOutput | null>(null);
  const [memories, setMemories] = useState<any[]>([]);
  const [feedbackText, setFeedbackText] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!episodeId) return;

    const ep = getEpisodeById(episodeId);
    setEpisode(ep);

    if (ep) {
      const del = getDeliberationByEpisodeId(episodeId);
      setDeliberation(del);

      const mems = retrieveRelevantMemories(ep);
      setMemories(mems);
    }
  }, [episodeId]);

  const handleFeedback = (section: string, feedbackType: string) => {
    if (!episodeId) return;

    saveFeedback({
      episodeId,
      targetSection: section,
      targetContent: feedbackType,
      feedbackType: feedbackType as any,
      createdAt: new Date().toISOString(),
    });

    setSelectedFeedback(section);
    setTimeout(() => setSelectedFeedback(null), 2000);
  };

  if (!match || !episode || !deliberation) {
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
        <div className="container py-4 flex items-center justify-between">
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
              <h1 className="text-xl font-bold text-foreground">{episode.title}</h1>
              <p className="text-xs text-muted-foreground">
                {episode.person} ({episode.relationship})
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/debug/${episodeId}`)}
            >
              Debug
            </Button>
            <Button
              size="sm"
              onClick={() => navigate(`/reflect/${episodeId}`)}
            >
              Go to Reflection
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Panel */}
          <div className="col-span-2 space-y-6">
            {/* Situation Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Current Situation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg border border-border">
                  <p className="text-sm whitespace-pre-wrap text-foreground">
                    {deliberation.situationSummary}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-foreground">Goal</p>
                    <p className="text-muted-foreground">{episode.goal}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Desired Outcome</p>
                    <p className="text-muted-foreground">{episode.desiredOutcome}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs for different analyses */}
            <Tabs defaultValue="assumptions" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="assumptions">Assumptions</TabsTrigger>
                <TabsTrigger value="perspectives">Perspectives</TabsTrigger>
                <TabsTrigger value="paths">What-If Paths</TabsTrigger>
                <TabsTrigger value="strategies">Strategies</TabsTrigger>
              </TabsList>

              {/* Assumptions */}
              <TabsContent value="assumptions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Hidden Assumptions
                    </CardTitle>
                    <CardDescription>
                      What might you be taking for granted?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {deliberation.hiddenAssumptions.map((assumption, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-muted/50 rounded-lg border border-border"
                      >
                        <p className="text-sm text-foreground">{assumption}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Possible Misunderstandings
                    </CardTitle>
                    <CardDescription>
                      Where could wires cross?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {deliberation.possibleMisunderstandings.map((misunderstanding, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-900/50"
                      >
                        <p className="text-sm text-foreground">{misunderstanding}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Perspectives */}
              <TabsContent value="perspectives" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Multiple Perspectives
                    </CardTitle>
                    <CardDescription>
                      How might different people see this situation?
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {deliberation.stakeholderPerspectives.map((perspective, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-muted/50 rounded-lg border border-border"
                      >
                        <Badge className="mb-2">
                          {perspective.role.replace(/_/g, " ")}
                        </Badge>
                        <p className="text-sm text-foreground">
                          {perspective.perspective}
                        </p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* What-If Paths */}
              <TabsContent value="paths" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      What-If Paths
                    </CardTitle>
                    <CardDescription>
                      Different ways this could play out
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {deliberation.whatIfPaths.map((path, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-lg">
                        <h4 className="font-semibold text-foreground mb-2">
                          Path {idx + 1}: {path.path}
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="text-muted-foreground font-medium">Likely Outcome:</p>
                            <p className="text-foreground">{path.likelyOutcome}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground font-medium">Risk:</p>
                            <p className="text-red-600 dark:text-red-400">{path.risk}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Strategies */}
              <TabsContent value="strategies" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Communication Strategies
                    </CardTitle>
                    <CardDescription>
                      Different approaches to consider
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {deliberation.suggestedStrategies.map((strategy, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-foreground capitalize">
                            {strategy.strategyType.replace(/_/g, " ")} Approach
                          </h4>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="text-muted-foreground font-medium">Message Draft:</p>
                            <p className="text-foreground bg-muted/50 p-2 rounded mt-1 italic">
                              "{strategy.messageDraft}"
                            </p>
                          </div>
                          <div>
                            <p className="text-muted-foreground font-medium">Rationale:</p>
                            <p className="text-foreground">{strategy.rationale}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground font-medium">Risk:</p>
                            <p className="text-red-600 dark:text-red-400">{strategy.risk}</p>
                          </div>
                          <div className="flex gap-2 flex-wrap mt-3 pt-3 border-t border-border">
                            <Button size="sm" variant="outline" onClick={() => handleFeedback(`strategy-${idx}`, "useful")} className="text-xs">✓ Useful</Button>
                            <Button size="sm" variant="outline" onClick={() => handleFeedback(`strategy-${idx}`, "inaccurate")} className="text-xs">✗ Inaccurate</Button>
                            <Button size="sm" variant="outline" onClick={() => handleFeedback(`strategy-${idx}`, "too_strong")} className="text-xs">⬇ Too Strong</Button>
                            <Button size="sm" variant="outline" onClick={() => handleFeedback(`strategy-${idx}`, "too_soft")} className="text-xs">⬆ Too Soft</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Clarification Questions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-5 w-5" />
                  Clarification Questions
                </CardTitle>
                <CardDescription>
                  Questions to help you think more deeply
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {deliberation.clarificationQuestions.map((question, idx) => (
                  <div key={idx} className="p-3 bg-muted/50 rounded-lg border border-border">
                    <p className="text-sm text-foreground">{question}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Retrieved Memories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Retrieved Memories</CardTitle>
                <CardDescription className="text-xs">
                  {memories.length} relevant past patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {memories.length === 0 ? (
                  <p className="text-xs text-muted-foreground">
                    No previous memories found. This is a new situation.
                  </p>
                ) : (
                  memories.map((memory) => (
                    <div
                      key={memory.id}
                      className="p-2 bg-muted/50 rounded border border-border text-xs"
                    >
                      <Badge variant="outline" className="mb-1">
                        {memory.type.replace(/_/g, " ")}
                      </Badge>
                      <p className="text-foreground">{memory.content}</p>
                      <p className="text-muted-foreground text-xs mt-1">
                        Confidence: {(memory.confidence * 100).toFixed(0)}%
                      </p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            {/* Concerns Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Concerns</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {episode.concerns.map((concern, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs">
                    <span className="text-muted-foreground">•</span>
                    <span className="text-foreground">{concern}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Known Evidence */}
            {episode.knownEvidence.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Known Evidence</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {episode.knownEvidence.map((evidence, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs">
                      <span className="text-muted-foreground">✓</span>
                      <span className="text-foreground">{evidence}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
