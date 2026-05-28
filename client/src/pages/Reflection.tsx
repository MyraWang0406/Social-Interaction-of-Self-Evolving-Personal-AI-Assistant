/**
 * /reflect/[id] - Post-Interaction Reflection
 * 
 * Allows users to document what actually happened and compare it with
 * predictions, then extract lessons for long-term memory.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  getEpisodeById,
  getDeliberationByEpisodeId,
  saveReflection,
  saveMemoryItem,
  saveDebugLog,
} from "@/lib/coevotalk/storage";
import { generateMockMemoriesFromReflection } from "@/lib/coevotalk/mockLLM";
import type { InteractionEpisode } from "@/lib/coevotalk/types";

export default function Reflection() {
  const [, navigate] = useLocation();
  const [match, params] = useRoute("/reflect/:id");
  const episodeId = params?.id as string;

  const [episode, setEpisode] = useState<InteractionEpisode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    actualOutcome: "",
    whatWasAccurate: [] as string[],
    whatWasWrong: [] as string[],
    assumptionsConfirmed: [] as string[],
    assumptionsFalsified: [] as string[],
    newEvidence: "",
    memoryToUpdate: "",
    nextAction: "",
  });

  const [predictions, setPredictions] = useState<{
    assumptions: string[];
    strategies: string[];
  }>({
    assumptions: [],
    strategies: [],
  });

  useEffect(() => {
    if (!episodeId) return;

    const ep = getEpisodeById(episodeId);
    setEpisode(ep);

    if (ep) {
      const del = getDeliberationByEpisodeId(episodeId);
      if (del) {
        setPredictions({
          assumptions: del.hiddenAssumptions,
          strategies: del.suggestedStrategies.map((s) => s.messageDraft),
        });
      }
    }
  }, [episodeId]);

  const handleCheckboxChange = (
    field: "whatWasAccurate" | "whatWasWrong" | "assumptionsConfirmed" | "assumptionsFalsified",
    value: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!episodeId || !episode) return;

    setIsLoading(true);

    try {
      // Save reflection
      const reflection = saveReflection({
        episodeId,
        actualOutcome: formData.actualOutcome,
        whatWasAccurate: formData.whatWasAccurate,
        whatWasWrong: formData.whatWasWrong,
        assumptionsConfirmed: formData.assumptionsConfirmed,
        assumptionsFalsified: formData.assumptionsFalsified,
        newEvidence: formData.newEvidence
          .split("\n")
          .map((e) => e.trim())
          .filter(Boolean),
        memoryToUpdate: formData.memoryToUpdate
          .split("\n")
          .map((m) => m.trim())
          .filter(Boolean),
        nextAction: formData.nextAction,
        createdAt: new Date().toISOString(),
      });

      // Save debug log
      saveDebugLog({
        episodeId,
        step: "reflection_saved",
        input: formData,
        parsedOutput: reflection,
        createdAt: new Date().toISOString(),
      });

      // Generate and save memory items from reflection
      const mockMemories = generateMockMemoriesFromReflection(
        episodeId,
        episode,
        formData.actualOutcome,
        formData.whatWasAccurate
      );

      for (const memory of mockMemories) {
        saveMemoryItem({
          type: memory.type,
          content: memory.content,
          evidence: memory.evidence,
          confidence: memory.confidence,
          status: memory.status,
          relatedPerson: memory.relatedPerson,
          relatedEpisodeId: episodeId,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
      }

      // Save debug log for memory writes
      saveDebugLog({
        episodeId,
        step: "memory_write",
        input: { reflectionId: reflection.id },
        memoryWrites: mockMemories,
        createdAt: new Date().toISOString(),
      });

      // Navigate to home
      navigate("/");
    } catch (error) {
      console.error("Error saving reflection:", error);
      saveDebugLog({
        episodeId,
        step: "error",
        input: formData,
        error: String(error),
        createdAt: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
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
            <h1 className="text-xl font-bold text-foreground">Reflection: {episode.title}</h1>
            <p className="text-xs text-muted-foreground">
              Compare what actually happened with your predictions
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Actual Outcome */}
            <Card>
              <CardHeader>
                <CardTitle>What Actually Happened?</CardTitle>
                <CardDescription>
                  Describe the actual interaction and outcome
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write down what actually happened during the interaction..."
                  value={formData.actualOutcome}
                  onChange={(e) =>
                    setFormData({ ...formData, actualOutcome: e.target.value })
                  }
                  rows={4}
                  required
                />
              </CardContent>
            </Card>

            {/* Accuracy Check */}
            <Card>
              <CardHeader>
                <CardTitle>Accuracy Check</CardTitle>
                <CardDescription>
                  Which predictions were accurate? Which were wrong?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* What Was Accurate */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">What Was Accurate?</h4>
                  <p className="text-sm text-muted-foreground">
                    Which assumptions or strategies turned out to be correct?
                  </p>
                  <div className="space-y-2">
                    {predictions.assumptions.map((assumption, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Checkbox
                          id={`accurate-${idx}`}
                          checked={formData.whatWasAccurate.includes(assumption)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "whatWasAccurate",
                              assumption,
                              checked as boolean
                            )
                          }
                        />
                        <Label
                          htmlFor={`accurate-${idx}`}
                          className="text-sm font-normal cursor-pointer flex-1"
                        >
                          {assumption}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* What Was Wrong */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">What Was Wrong?</h4>
                  <p className="text-sm text-muted-foreground">
                    Which predictions missed the mark?
                  </p>
                  <div className="space-y-2">
                    {predictions.assumptions.map((assumption, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <Checkbox
                          id={`wrong-${idx}`}
                          checked={formData.whatWasWrong.includes(assumption)}
                          onCheckedChange={(checked) =>
                            handleCheckboxChange(
                              "whatWasWrong",
                              assumption,
                              checked as boolean
                            )
                          }
                        />
                        <Label
                          htmlFor={`wrong-${idx}`}
                          className="text-sm font-normal cursor-pointer flex-1"
                        >
                          {assumption}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assumptions Validation */}
            <Card>
              <CardHeader>
                <CardTitle>Assumptions Validation</CardTitle>
                <CardDescription>
                  Which assumptions held up? Which were proven wrong?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Confirmed */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Assumptions Confirmed</h4>
                  <Textarea
                    placeholder="Which assumptions turned out to be correct? (one per line)"
                    value={formData.assumptionsConfirmed.join("\n")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assumptionsConfirmed: e.target.value
                          .split("\n")
                          .map((a) => a.trim())
                          .filter(Boolean),
                      })
                    }
                    rows={2}
                  />
                </div>

                {/* Falsified */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Assumptions Falsified</h4>
                  <Textarea
                    placeholder="Which assumptions were proven wrong? (one per line)"
                    value={formData.assumptionsFalsified.join("\n")}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        assumptionsFalsified: e.target.value
                          .split("\n")
                          .map((a) => a.trim())
                          .filter(Boolean),
                      })
                    }
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>

            {/* New Evidence */}
            <Card>
              <CardHeader>
                <CardTitle>New Evidence</CardTitle>
                <CardDescription>
                  What new facts did you learn about this person or situation?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="New evidence (one per line). E.g.&#10;They value directness more than I thought&#10;They have constraints I wasn't aware of"
                  value={formData.newEvidence}
                  onChange={(e) =>
                    setFormData({ ...formData, newEvidence: e.target.value })
                  }
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Memory Updates */}
            <Card>
              <CardHeader>
                <CardTitle>What Should We Remember?</CardTitle>
                <CardDescription>
                  What lessons should be stored for future interactions?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Lessons to remember (one per line). E.g.&#10;When discussing X with this person, direct approach works better&#10;They appreciate if you acknowledge their constraints first"
                  value={formData.memoryToUpdate}
                  onChange={(e) =>
                    setFormData({ ...formData, memoryToUpdate: e.target.value })
                  }
                  rows={3}
                />
              </CardContent>
            </Card>

            {/* Next Action */}
            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>
                  What's your next action based on this interaction?
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="What will you do next?"
                  value={formData.nextAction}
                  onChange={(e) =>
                    setFormData({ ...formData, nextAction: e.target.value })
                  }
                  rows={2}
                />
              </CardContent>
            </Card>

            {/* Submit */}
            <div className="flex gap-4">
              <Button
                type="submit"
                disabled={isLoading || !formData.actualOutcome.trim()}
                className="flex-1"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Reflection & Update Memory"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(`/session/${episodeId}`)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
