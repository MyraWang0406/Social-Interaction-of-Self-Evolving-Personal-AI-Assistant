/**
 * CoEvoTalk Core Data Types
 * 
 * This file defines the fundamental data structures for the self-evolving
 * personal AI assistant for reflective social interaction.
 */

// ============================================================================
// INTERACTION EPISODE
// ============================================================================
/**
 * Represents a single high-stakes social interaction that the user wants to
 * prepare for or reflect on.
 */
export type InteractionEpisode = {
  id: string;
  title: string;
  person: string; // Who are you talking to?
  relationship: string; // e.g., "mentor", "colleague", "family member"
  context: string; // Background information
  goal: string; // What do you want to achieve?
  concerns: string[]; // What are you worried about?
  knownEvidence: string[]; // What facts do you already have?
  desiredOutcome: string; // What would success look like?
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  status: "draft" | "deliberating" | "ready" | "completed";
};

// ============================================================================
// MEMORY ITEMS
// ============================================================================
/**
 * Represents a piece of long-term memory about communication patterns,
 * relationship history, or lessons learned.
 */
export type MemoryItemType =
  | "communication_style"
  | "relationship_history"
  | "recurring_concern"
  | "rejected_strategy"
  | "confirmed_pattern"
  | "unresolved_conflict";

export type MemoryItemStatus = "active" | "outdated" | "rejected" | "uncertain";

export type MemoryItem = {
  id: string;
  type: MemoryItemType;
  content: string; // The actual memory content
  evidence: string[]; // Why do we believe this?
  confidence: number; // 0-1, how confident are we?
  status: MemoryItemStatus;
  relatedPerson?: string; // Who is this memory about?
  relatedEpisodeId?: string; // Which episode(s) contributed to this memory?
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
};

// ============================================================================
// DELIBERATION OUTPUT
// ============================================================================
/**
 * The AI's structured analysis of a situation before communication.
 * This is NOT advice—it's a framework for reflection.
 */
export type StakeholderPerspective = {
  role: "counterpart" | "observer" | "future_self" | "risk_checker";
  perspective: string;
};

export type WhatIfPath = {
  path: string; // Description of a possible communication path
  likelyOutcome: string; // What might happen?
  risk: string; // What could go wrong?
};

export type CommunicationStrategy = {
  strategyType: "direct" | "soft" | "evidence_based" | "negotiation_based";
  messageDraft: string; // A concrete example
  rationale: string; // Why might this work?
  risk: string; // What could backfire?
};

export type DeliberationOutput = {
  episodeId: string;
  situationSummary: string;
  hiddenAssumptions: string[]; // What are we taking for granted?
  possibleMisunderstandings: string[]; // Where could wires cross?
  stakeholderPerspectives: StakeholderPerspective[];
  whatIfPaths: WhatIfPath[];
  suggestedStrategies: CommunicationStrategy[];
  clarificationQuestions: string[]; // What else should you consider?
};

// ============================================================================
// REFLECTION & FEEDBACK
// ============================================================================
/**
 * Post-interaction reflection: what actually happened vs. what was predicted.
 */
export type ReflectionRecord = {
  id: string;
  episodeId: string;
  actualOutcome: string; // What actually happened?
  whatWasAccurate: string[]; // Which predictions were right?
  whatWasWrong: string[]; // Which predictions missed?
  assumptionsConfirmed: string[]; // Which assumptions held up?
  assumptionsFalsified: string[]; // Which assumptions were wrong?
  newEvidence: string[]; // What new facts did you learn?
  memoryToUpdate: string[]; // What should we remember for next time?
  nextAction: string; // What's the next step?
  createdAt: string; // ISO timestamp
};

/**
 * User feedback on AI outputs to improve future deliberations.
 */
export type FeedbackType =
  | "useful"
  | "inaccurate"
  | "too_strong"
  | "too_soft"
  | "remember_this"
  | "forget_this"
  | "too_generic"
  | "too_directive"
  | "missing_context"
  | "wrong_memory"
  | "save_important"
  | "do_not_remember";

export type FeedbackRecord = {
  id: string;
  episodeId: string;
  targetSection: string; // Which section of the output?
  targetContent: string; // The specific content being feedback on
  feedbackType: FeedbackType;
  correction?: string; // If inaccurate, what's the correction?
  createdAt: string; // ISO timestamp
};

// ============================================================================
// DEBUG LOGGING
// ============================================================================
/**
 * Complete audit trail of system operations for transparency and debugging.
 */
export type DebugLog = {
  id: string;
  episodeId: string;
  step: string; // e.g., "memory_retrieval", "prompt_construction", "llm_call"
  input: unknown; // What went in?
  retrievedMemory?: MemoryItem[]; // If memory retrieval step
  prompt?: string; // If prompt construction step
  rawResponse?: string; // If LLM call step
  parsedOutput?: unknown; // If parsing step
  memoryWrites?: MemoryItem[]; // If memory write step
  error?: string; // If something failed
  createdAt: string; // ISO timestamp
};

// ============================================================================
// STORAGE SCHEMA
// ============================================================================
/**
 * The complete data structure stored in localStorage.
 */
export type CoEvoTalkStorage = {
  episodes: Record<string, InteractionEpisode>;
  memories: Record<string, MemoryItem>;
  deliberations: Record<string, DeliberationOutput>;
  reflections: Record<string, ReflectionRecord>;
  feedbackRecords: Record<string, FeedbackRecord>;
  debugLogs: Record<string, DebugLog[]>;
};
