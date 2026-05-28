/**
 * Mock LLM for CoEvoTalk
 * 
 * Generates stable, realistic deliberation outputs without calling a real API.
 * This is for development and demonstration purposes.
 */

import type { InteractionEpisode, MemoryItem, DeliberationOutput } from "./types";

/**
 * Generate a mock deliberation output based on episode and retrieved memories.
 * Output is deterministic and research-focused, not product-focused.
 */
export function generateMockDeliberation(
  episode: InteractionEpisode,
  retrievedMemories: MemoryItem[]
): DeliberationOutput {
  // Extract key information
  const personName = episode.person || "the other person";
  const relationshipType = episode.relationship || "colleague";
  const mainConcern = episode.concerns[0] || "unclear expectations";

  // Build memory context
  const memoryContext = retrievedMemories
    .slice(0, 3)
    .map((m) => `- ${m.type}: ${m.content}`)
    .join("\n");

  return {
    episodeId: episode.id,

    situationSummary: `You're preparing to communicate with ${personName} (${relationshipType}) about: ${episode.goal}. 
The interaction is important because: ${episode.context}. 
You're concerned about: ${mainConcern}.${
      memoryContext
        ? `\n\nRelevant past patterns:\n${memoryContext}`
        : ""
    }`,

    hiddenAssumptions: [
      `You assume ${personName} already knows your perspective on "${episode.goal.substring(0, 30)}..."`,
      `You might be assuming the other person's priorities align with yours`,
      `There's an implicit assumption about what "success" means in this conversation`,
      `You may be assuming the other person has the same information you do`,
    ],

    possibleMisunderstandings: [
      `${personName} might interpret your concern about "${mainConcern}" differently than you intend`,
      `The other person might not realize how important this is to you`,
      `There could be a gap between what you say and what they hear`,
      `${personName} might have constraints or context you're not aware of`,
    ],

    stakeholderPerspectives: [
      {
        role: "counterpart",
        perspective: `${personName} might be thinking: "I wonder what they really want from me. I should listen carefully but also share my own constraints." They may have competing priorities you're not aware of.`,
      },
      {
        role: "observer",
        perspective: `An outside observer might notice: You seem focused on your concern (${mainConcern}), but you haven't explicitly stated what you need from ${personName}. The conversation might benefit from clearer mutual understanding before diving into solutions.`,
      },
      {
        role: "future_self",
        perspective: `Looking back in 6 months, you'll probably wish you had: (1) asked ${personName} more questions before proposing solutions, (2) been clearer about your underlying needs, (3) acknowledged their perspective more explicitly.`,
      },
      {
        role: "risk_checker",
        perspective: `Potential risks: If you lead with your concern without context, ${personName} might become defensive. If you're too indirect, they might miss your point entirely. The sweet spot is probably: acknowledge their perspective → share your concern → ask for their input.`,
      },
    ],

    whatIfPaths: [
      {
        path: "Direct approach: State your concern clearly and ask for their thoughts",
        likelyOutcome: "They understand your position. They may either agree, disagree, or ask clarifying questions.",
        risk: "If framed poorly, they might feel attacked or blamed. If you're too blunt, they might become defensive.",
      },
      {
        path: "Soft approach: Ask questions first to understand their perspective, then share your concern",
        likelyOutcome: "They feel heard and are more receptive to your perspective. Conversation feels collaborative.",
        risk: "If you ask too many questions without getting to your point, they might feel you're being indirect or manipulative.",
      },
      {
        path: "Evidence-based approach: Present specific facts/examples that support your concern",
        likelyOutcome: "Your concern feels more concrete and less emotional. Easier to discuss objectively.",
        risk: "If you present only evidence that supports your view, they might feel cherry-picked or unfair.",
      },
      {
        path: "Negotiation approach: Frame it as a mutual problem to solve together",
        likelyOutcome: "You're partners in problem-solving rather than adversaries. More likely to find creative solutions.",
        risk: "If the other person doesn't see it as a mutual problem, this framing might feel manipulative.",
      },
    ],

    suggestedStrategies: [
      {
        strategyType: "direct",
        messageDraft: `I want to talk with you about ${episode.goal}. I've been thinking about this because ${episode.concerns[0] || "it matters to me"}. Here's what I'm concerned about: [specific example]. What's your perspective on this?`,
        rationale: "Direct communication respects the other person's intelligence and time. It's clear about your intent.",
        risk: "Might feel abrupt if you skip context. The other person might not have time to adjust mentally.",
      },
      {
        strategyType: "soft",
        messageDraft: `I've been reflecting on ${episode.goal}, and I'd like to understand your perspective better. Can you help me understand how you see this situation? [Listen]. Thank you for sharing that. I've also been thinking... [your concern].`,
        rationale: "Soft approach builds rapport first. The other person feels heard before you share your concern.",
        risk: "Might come across as indirect. They might not realize you have a specific concern until late in the conversation.",
      },
      {
        strategyType: "evidence_based",
        messageDraft: `I want to discuss ${episode.goal}. I've noticed [specific observation/example]. This suggests [your interpretation]. I'm wondering if you've observed something similar, or if you see it differently?`,
        rationale: "Grounding in specific examples makes the conversation less personal and more objective.",
        risk: "If your examples are cherry-picked, it might feel like you're building a case against them.",
      },
      {
        strategyType: "negotiation_based",
        messageDraft: `I think we both care about [shared goal]. I've been thinking about ${episode.goal}, and I'm not sure we're on the same page. Can we explore this together? Here's what I'm thinking... What's your take?`,
        rationale: "Frames the conversation as collaborative problem-solving. Emphasizes shared goals.",
        risk: "If the other person doesn't see a shared goal, this framing might feel false or manipulative.",
      },
    ],

    clarificationQuestions: [
      `What does success look like for you in this conversation? (Not just for the outcome, but for the conversation itself)`,
      `What assumptions might you be making about ${personName}'s perspective?`,
      `If ${personName} were to explain their view of this situation, what do you think they'd say?`,
      `What information do you have that ${personName} might not have? What information might they have that you don't?`,
      `What's the worst-case scenario if this conversation doesn't go well? How likely is it?`,
      `What would make you feel like this conversation was successful, even if you don't get exactly what you want?`,
    ],
  };
}

/**
 * Generate mock memory items from a reflection (for testing).
 */
export function generateMockMemoriesFromReflection(
  episodeId: string,
  episode: InteractionEpisode,
  actualOutcome: string,
  whatWasAccurate: string[]
): MemoryItem[] {
  const memories: MemoryItem[] = [];

  // If something was accurate, create a confirmed pattern
  if (whatWasAccurate.length > 0) {
    memories.push({
      id: `mem_${Date.now()}_1`,
      type: "confirmed_pattern",
      content: `When communicating with ${episode.person} about ${episode.goal}, the approach of ${whatWasAccurate[0]} was accurate.`,
      evidence: [`Confirmed in episode ${episodeId}: ${actualOutcome.substring(0, 100)}...`],
      confidence: 0.8,
      status: "active",
      relatedPerson: episode.person,
      relatedEpisodeId: episodeId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  // Create a relationship history entry
  memories.push({
    id: `mem_${Date.now()}_2`,
    type: "relationship_history",
    content: `Interaction with ${episode.person} (${episode.relationship}): ${episode.goal}. Outcome: ${actualOutcome.substring(0, 150)}...`,
    evidence: [`Documented in episode ${episodeId}`],
    confidence: 1.0,
    status: "active",
    relatedPerson: episode.person,
    relatedEpisodeId: episodeId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  return memories;
}
