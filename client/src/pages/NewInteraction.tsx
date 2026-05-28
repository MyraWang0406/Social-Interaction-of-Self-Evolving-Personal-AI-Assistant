/**
 * /new - Create a New Interaction
 * 
 * This page allows users to set up a new high-stakes social interaction
 * by providing context, goals, concerns, and desired outcomes.
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { createEpisode, saveDeliberation, saveDebugLog, retrieveRelevantMemories } from "@/lib/coevotalk/storage";
import { generateMockDeliberation } from "@/lib/coevotalk/mockLLM";
import { buildDeliberationPrompt } from "@/lib/coevotalk/buildPrompt";

export default function NewInteraction() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    person: "",
    relationship: "",
    context: "",
    goal: "",
    concerns: "",
    knownEvidence: "",
    desiredOutcome: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create the episode
      const episode = createEpisode({
        title: formData.title || `Interaction with ${formData.person}`,
        person: formData.person,
        relationship: formData.relationship,
        context: formData.context,
        goal: formData.goal,
        concerns: formData.concerns
          .split("\n")
          .map((c) => c.trim())
          .filter(Boolean),
        knownEvidence: formData.knownEvidence
          .split("\n")
          .map((e) => e.trim())
          .filter(Boolean),
        desiredOutcome: formData.desiredOutcome,
      });

      // Save debug log: episode creation
      saveDebugLog({
        episodeId: episode.id,
        step: "episode_creation",
        input: formData,
        createdAt: new Date().toISOString(),
      });

      // Retrieve relevant memories
      const retrievedMemories = retrieveRelevantMemories(episode);
      saveDebugLog({
        episodeId: episode.id,
        step: "memory_retrieval",
        input: { person: episode.person, relationship: episode.relationship },
        retrievedMemory: retrievedMemories,
        createdAt: new Date().toISOString(),
      });

      // Build prompt (for audit trail)
      const prompt = buildDeliberationPrompt(episode, retrievedMemories);
      saveDebugLog({
        episodeId: episode.id,
        step: "prompt_construction",
        input: { episodeId: episode.id },
        prompt,
        createdAt: new Date().toISOString(),
      });

      // Generate mock deliberation
      const deliberation = generateMockDeliberation(episode, retrievedMemories);
      saveDebugLog({
        episodeId: episode.id,
        step: "llm_call",
        input: { prompt },
        rawResponse: JSON.stringify(deliberation),
        parsedOutput: deliberation,
        createdAt: new Date().toISOString(),
      });

      // Save deliberation
      saveDeliberation(episode.id, deliberation);

      // Navigate to session page
      navigate(`/session/${episode.id}`);
    } catch (error) {
      console.error("Error creating interaction:", error);
      saveDebugLog({
        episodeId: "unknown",
        step: "error",
        input: formData,
        error: String(error),
        createdAt: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-6">
          <h1 className="text-3xl font-bold text-foreground">Create New Interaction</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Prepare for a high-stakes social interaction by providing context and goals.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Interaction Details</CardTitle>
              <CardDescription>
                Help the system understand your situation so it can provide relevant analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Title (optional)</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g., Discuss career change with mentor"
                    value={formData.title}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Person & Relationship */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="person">Who are you talking to? *</Label>
                    <Input
                      id="person"
                      name="person"
                      placeholder="e.g., Sarah (my mentor)"
                      value={formData.person}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Input
                      id="relationship"
                      name="relationship"
                      placeholder="e.g., mentor, colleague, family"
                      value={formData.relationship}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Context */}
                <div className="space-y-2">
                  <Label htmlFor="context">Background Context *</Label>
                  <Textarea
                    id="context"
                    name="context"
                    placeholder="What's the background? What led to this interaction?"
                    value={formData.context}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                {/* Goal */}
                <div className="space-y-2">
                  <Label htmlFor="goal">What's your goal? *</Label>
                  <Textarea
                    id="goal"
                    name="goal"
                    placeholder="What do you want to achieve in this conversation?"
                    value={formData.goal}
                    onChange={handleInputChange}
                    rows={3}
                    required
                  />
                </div>

                {/* Concerns */}
                <div className="space-y-2">
                  <Label htmlFor="concerns">What are you worried about?</Label>
                  <Textarea
                    id="concerns"
                    name="concerns"
                    placeholder="List concerns (one per line). E.g.&#10;They might think I'm ungrateful&#10;I might come across as too direct"
                    value={formData.concerns}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Known Evidence */}
                <div className="space-y-2">
                  <Label htmlFor="knownEvidence">What facts do you already have?</Label>
                  <Textarea
                    id="knownEvidence"
                    name="knownEvidence"
                    placeholder="List evidence (one per line). E.g.&#10;They've been supportive in the past&#10;They value direct communication"
                    value={formData.knownEvidence}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Desired Outcome */}
                <div className="space-y-2">
                  <Label htmlFor="desiredOutcome">What would success look like?</Label>
                  <Textarea
                    id="desiredOutcome"
                    name="desiredOutcome"
                    placeholder="What's your ideal outcome from this interaction?"
                    value={formData.desiredOutcome}
                    onChange={handleInputChange}
                    rows={3}
                  />
                </div>

                {/* Submit */}
                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !formData.person || !formData.goal}
                    className="flex-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Create & Analyze"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Example */}
          <Card className="mt-8 bg-muted/50">
            <CardHeader>
              <CardTitle className="text-base">Example: Discussing a Job Offer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                <strong>Person:</strong> My manager
              </p>
              <p>
                <strong>Goal:</strong> Negotiate salary and remote work options for the new role
              </p>
              <p>
                <strong>Concern:</strong> They might think I'm ungrateful for the offer. I might come across as too demanding.
              </p>
              <p>
                <strong>Desired Outcome:</strong> Reach an agreement on salary and flexibility that works for both of us
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
