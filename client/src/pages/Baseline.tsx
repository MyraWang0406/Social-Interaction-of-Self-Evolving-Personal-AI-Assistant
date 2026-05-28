/**
 * /baseline - Baseline Assistant
 * 
 * Simple, direct advice mode for comparison studies.
 * No memory, no multi-perspective analysis, no what-if paths.
 */

import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Send } from "lucide-react";
import { createBaselineSession, saveBaselineSession } from "@/lib/coevotalk/baselineAssistant";
import { toast } from "sonner";

export default function Baseline() {
  const [, navigate] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    person: "",
    relationship: "",
    context: "",
    goal: "",
    concerns: "",
    evidence: "",
    desiredOutcome: "",
  });
  const [advice, setAdvice] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.person || !formData.goal) {
      toast.error("Please fill in Person and Goal");
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const session = createBaselineSession({
        person: formData.person,
        relationship: formData.relationship,
        context: formData.context,
        goal: formData.goal,
        concerns: formData.concerns
          .split("\n")
          .map((c) => c.trim())
          .filter((c) => c.length > 0),
        evidence: formData.evidence
          .split("\n")
          .map((e) => e.trim())
          .filter((e) => e.length > 0),
        desiredOutcome: formData.desiredOutcome,
      });

      saveBaselineSession(session);
      setAdvice(session.advice);
      toast.success("Baseline advice generated");
    } catch (error) {
      toast.error("Failed to generate advice");
      console.error(error);
    } finally {
      setIsLoading(false);
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
              <h1 className="text-3xl font-bold text-foreground">Baseline Assistant</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Simple, direct advice for comparison studies
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="border-b border-border bg-amber-50 dark:bg-amber-950/20">
        <div className="container py-4">
          <div className="flex gap-3">
            <div className="text-sm text-amber-900 dark:text-amber-200">
              <p className="font-semibold">Baseline Mode</p>
              <p className="text-xs mt-1">
                This assistant provides straightforward advice without using memory or multi-perspective analysis.
                Use this for comparison with CoEvoTalk's advanced features.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {!advice ? (
            <Card>
              <CardHeader>
                <CardTitle>Describe Your Situation</CardTitle>
                <CardDescription>
                  Provide details about the interaction you want advice for
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Person & Relationship */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="person">Person *</Label>
                      <Input
                        id="person"
                        name="person"
                        placeholder="e.g., My manager"
                        value={formData.person}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship</Label>
                      <Input
                        id="relationship"
                        name="relationship"
                        placeholder="e.g., Direct supervisor"
                        value={formData.relationship}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Context */}
                  <div className="space-y-2">
                    <Label htmlFor="context">Background Context</Label>
                    <Textarea
                      id="context"
                      name="context"
                      placeholder="What's the background? What led to this situation?"
                      value={formData.context}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  {/* Goal */}
                  <div className="space-y-2">
                    <Label htmlFor="goal">Goal *</Label>
                    <Textarea
                      id="goal"
                      name="goal"
                      placeholder="What do you want to achieve from this interaction?"
                      value={formData.goal}
                      onChange={handleInputChange}
                      rows={2}
                      required
                    />
                  </div>

                  {/* Concerns */}
                  <div className="space-y-2">
                    <Label htmlFor="concerns">Concerns (one per line)</Label>
                    <Textarea
                      id="concerns"
                      name="concerns"
                      placeholder="What are you worried about?&#10;e.g., They might think I'm ungrateful&#10;e.g., I might sound too demanding"
                      value={formData.concerns}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  {/* Evidence */}
                  <div className="space-y-2">
                    <Label htmlFor="evidence">Known Evidence (one per line)</Label>
                    <Textarea
                      id="evidence"
                      name="evidence"
                      placeholder="What facts do you already know?&#10;e.g., They said the offer is competitive&#10;e.g., They value work-life balance"
                      value={formData.evidence}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>

                  {/* Desired Outcome */}
                  <div className="space-y-2">
                    <Label htmlFor="desiredOutcome">Desired Outcome</Label>
                    <Textarea
                      id="desiredOutcome"
                      name="desiredOutcome"
                      placeholder="What would success look like?"
                      value={formData.desiredOutcome}
                      onChange={handleInputChange}
                      rows={2}
                    />
                  </div>

                  {/* Submit */}
                  <Button type="submit" disabled={isLoading} className="w-full gap-2">
                    <Send className="h-4 w-4" />
                    {isLoading ? "Generating..." : "Get Baseline Advice"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Advice Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Baseline Advice</CardTitle>
                  <CardDescription>
                    Direct recommendations for your situation
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    {advice.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="text-foreground whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setAdvice(null);
                    setFormData({
                      person: "",
                      relationship: "",
                      context: "",
                      goal: "",
                      concerns: "",
                      evidence: "",
                      desiredOutcome: "",
                    });
                  }}
                  className="flex-1"
                >
                  Start Over
                </Button>
                <Button
                  onClick={() => navigate("/")}
                  className="flex-1"
                >
                  Back to Home
                </Button>
              </div>

              {/* Info */}
              <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
                <CardHeader>
                  <CardTitle className="text-base">Comparison Note</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-foreground">
                  <p>
                    This baseline advice is generated using simple heuristics without:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 text-xs">
                    <li>Long-term memory of past interactions</li>
                    <li>Multi-perspective analysis</li>
                    <li>What-if scenario exploration</li>
                    <li>Post-interaction learning</li>
                  </ul>
                  <p className="mt-3">
                    Compare this with CoEvoTalk's advanced deliberation to see the difference.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
