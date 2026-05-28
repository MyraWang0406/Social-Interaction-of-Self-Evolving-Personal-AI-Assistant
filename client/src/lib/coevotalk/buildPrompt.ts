/**
 * CoEvoTalk Prompt Builder
 * 
 * Constructs structured prompts for real LLM integration (future).
 * Currently used for documentation and testing purposes.
 */

import type { InteractionEpisode, MemoryItem } from "./types";

/**
 * Build a system prompt that defines the AI's role and constraints.
 */
export function buildSystemPrompt(): string {
  return `You are a self-evolving personal AI assistant for reflective social interaction.

Your role is NOT to tell the user what to do. Your role is to help the user prepare for a high-stakes interaction by:
1. Surfacing hidden assumptions and potential misunderstandings
2. Presenting multiple perspectives (the other person's view, an observer's view, the user's future self, a risk-checker)
3. Exploring different communication paths and their likely outcomes
4. Generating multiple communication strategies with different tones and approaches
5. Asking clarification questions to help the user think more deeply

CRITICAL CONSTRAINTS:
- Do NOT make decisions for the user
- Do NOT assume you know what the other person thinks
- Do NOT present your analysis as "the truth"—present it as "possibilities to consider"
- Do NOT be prescriptive; be exploratory
- Do NOT ignore the user's concerns; validate them while also exploring other perspectives
- Preserve user agency at all times

Output format: Respond with ONLY valid JSON matching the specified schema. No markdown, no explanation, just JSON.`;
}

/**
 * Build the user prompt for deliberation.
 */
export function buildDeliberationPrompt(
  episode: InteractionEpisode,
  retrievedMemories: MemoryItem[]
): string {
  const memorySection =
    retrievedMemories.length > 0
      ? `## Relevant Past Patterns
${retrievedMemories
  .map(
    (m) => `- [${m.type}] ${m.content}
  Evidence: ${m.evidence}
  Confidence: ${(m.confidence * 100).toFixed(0)}%
  Status: ${m.status}`
  )
  .join("\n")}`
      : "## No Previous Memories\nThis is a new situation with no prior patterns to reference.";

  return `## Current Situation
**Who:** ${episode.person} (${episode.relationship})
**Goal:** ${episode.goal}
**Context:** ${episode.context}
**Concerns:** ${episode.concerns.join(", ")}
**Known Evidence:** ${episode.knownEvidence.join(", ") || "None yet"}
**Desired Outcome:** ${episode.desiredOutcome}

${memorySection}

## Your Task
Analyze this situation deeply. Surface assumptions, explore perspectives, identify risks, and suggest different communication strategies. Help the user think through this interaction without telling them what to do.

Output a JSON object with these fields:
{
  "situationSummary": "string - concise summary of the situation",
  "hiddenAssumptions": ["array of strings - what might be taken for granted"],
  "possibleMisunderstandings": ["array of strings - where wires could cross"],
  "stakeholderPerspectives": [
    {
      "role": "counterpart|observer|future_self|risk_checker",
      "perspective": "string - what might this perspective think/feel"
    }
  ],
  "whatIfPaths": [
    {
      "path": "string - description of a communication approach",
      "likelyOutcome": "string - what might happen",
      "risk": "string - what could go wrong"
    }
  ],
  "suggestedStrategies": [
    {
      "strategyType": "direct|soft|evidence_based|negotiation_based",
      "messageDraft": "string - concrete example of what to say",
      "rationale": "string - why this might work",
      "risk": "string - what could backfire"
    }
  ],
  "clarificationQuestions": ["array of strings - questions for deeper reflection"]
}`;
}

/**
 * Build prompt for memory extraction from reflection.
 */
export function buildMemoryExtractionPrompt(
  episode: InteractionEpisode,
  actualOutcome: string,
  whatWasAccurate: string[],
  whatWasWrong: string[],
  assumptionsConfirmed: string[],
  assumptionsFalsified: string[]
): string {
  return `## Interaction Reflection
**Episode:** ${episode.goal} with ${episode.person}
**Original Concerns:** ${episode.concerns.join(", ")}

**What Actually Happened:**
${actualOutcome}

**What Was Accurate:**
${whatWasAccurate.join("\n")}

**What Was Wrong:**
${whatWasWrong.join("\n")}

**Assumptions Confirmed:**
${assumptionsConfirmed.join("\n")}

**Assumptions Falsified:**
${assumptionsFalsified.join("\n")}

## Your Task
Extract 2-4 memory items that should be stored for future interactions with ${episode.person} or similar situations.

Output a JSON array of memory items:
[
  {
    "type": "communication_style|relationship_history|recurring_concern|rejected_strategy|confirmed_pattern|unresolved_conflict",
    "content": "string - the memory content",
    "evidence": "string - why we believe this",
    "confidence": 0.0-1.0,
    "status": "active|uncertain"
  }
]`;
}

/**
 * Build a prompt for analyzing feedback and improving future deliberations.
 */
export function buildFeedbackAnalysisPrompt(
  episode: InteractionEpisode,
  feedbackItems: Array<{
    section: string;
    feedback: string;
    correction?: string;
  }>
): string {
  return `## Deliberation Feedback
**Episode:** ${episode.goal}
**Person:** ${episode.person}

**Feedback Received:**
${feedbackItems
  .map(
    (f) =>
      `- Section: ${f.section}
  Feedback: ${f.feedback}${f.correction ? `\n  Correction: ${f.correction}` : ""}`
  )
  .join("\n")}

## Your Task
Analyze this feedback to understand what the AI got wrong and what it should improve for future deliberations with this person or in similar situations.

Output a JSON object:
{
  "insights": ["array of strings - what we learned from this feedback"],
  "suggestedMemoryUpdates": [
    {
      "type": "string - memory type",
      "content": "string - what should be remembered",
      "confidence": 0.0-1.0
    }
  ],
  "improvementsForNextTime": ["array of strings - how to approach similar situations better"]
}`;
}

/**
 * Build a comprehensive audit trail prompt for debugging.
 */
export function buildAuditTrailSummary(
  episode: InteractionEpisode,
  deliberationPrompt: string,
  deliberationResponse: string,
  feedbackSummary: string,
  memoryUpdates: string
): string {
  return `## Complete Audit Trail for Episode: ${episode.id}

### Input
${deliberationPrompt}

### AI Response
${deliberationResponse}

### User Feedback
${feedbackSummary}

### Memory Updates
${memoryUpdates}

This audit trail documents the complete flow of information through the system for transparency and debugging.`;
}

/**
 * Validate that a JSON response matches the expected schema.
 */
export function validateDeliberationSchema(obj: unknown): boolean {
  if (typeof obj !== "object" || obj === null) return false;

  const d = obj as Record<string, unknown>;

  return (
    typeof d.situationSummary === "string" &&
    Array.isArray(d.hiddenAssumptions) &&
    Array.isArray(d.possibleMisunderstandings) &&
    Array.isArray(d.stakeholderPerspectives) &&
    Array.isArray(d.whatIfPaths) &&
    Array.isArray(d.suggestedStrategies) &&
    Array.isArray(d.clarificationQuestions)
  );
}
