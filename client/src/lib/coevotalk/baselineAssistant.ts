/**
 * Baseline Assistant
 * 
 * Simple, direct advice mode for comparison studies.
 * No memory, no multi-perspective analysis, no what-if paths.
 * Just straightforward recommendations.
 */

import { nanoid } from 'nanoid';

export interface BaselineSession {
  id: string;
  title: string;
  person: string;
  relationship: string;
  context: string;
  goal: string;
  concerns: string[];
  evidence: string[];
  desiredOutcome: string;
  advice: string;
  createdAt: string;
}

/**
 * Generate simple, direct advice based on the interaction context.
 * This is the baseline for comparison with CoEvoTalk's multi-perspective analysis.
 */
export function generateBaselineAdvice(input: {
  person: string;
  relationship: string;
  context: string;
  goal: string;
  concerns: string[];
  evidence: string[];
  desiredOutcome: string;
}): string {
  // Simple heuristic-based advice generation
  const advicePoints: string[] = [];

  // Analyze goal
  if (input.goal.toLowerCase().includes('negotiate') || input.goal.toLowerCase().includes('discuss')) {
    advicePoints.push('Be clear about what you want to achieve from this conversation.');
    advicePoints.push('Listen actively to understand the other person\'s perspective.');
  }

  if (input.goal.toLowerCase().includes('career') || input.goal.toLowerCase().includes('job')) {
    advicePoints.push('Come prepared with specific examples and data to support your position.');
    advicePoints.push('Focus on how your proposal benefits both parties.');
  }

  if (input.goal.toLowerCase().includes('feedback') || input.goal.toLowerCase().includes('criticism')) {
    advicePoints.push('Frame feedback constructively and focus on specific behaviors, not character.');
    advicePoints.push('Offer solutions, not just problems.');
  }

  // Analyze concerns
  if (input.concerns.some(c => c.toLowerCase().includes('reject') || c.toLowerCase().includes('angry'))) {
    advicePoints.push('Start by acknowledging the other person\'s potential concerns.');
    advicePoints.push('Use "I" statements to express your perspective without blaming.');
  }

  if (input.concerns.some(c => c.toLowerCase().includes('weak') || c.toLowerCase().includes('incompetent'))) {
    advicePoints.push('Demonstrate your competence through concrete examples and achievements.');
    advicePoints.push('Ask clarifying questions to show engagement and understanding.');
  }

  // Analyze relationship
  if (input.relationship.toLowerCase().includes('manager') || input.relationship.toLowerCase().includes('boss')) {
    advicePoints.push('Respect the power dynamic and be professional.');
    advicePoints.push('Focus on business value and mutual benefit.');
  }

  if (input.relationship.toLowerCase().includes('mentor') || input.relationship.toLowerCase().includes('advisor')) {
    advicePoints.push('Show genuine interest in their perspective and experience.');
    advicePoints.push('Ask thoughtful questions rather than just seeking validation.');
  }

  if (input.relationship.toLowerCase().includes('family') || input.relationship.toLowerCase().includes('friend')) {
    advicePoints.push('Be authentic and vulnerable about your feelings.');
    advicePoints.push('Remember that maintaining the relationship is as important as resolving the issue.');
  }

  // General advice
  if (advicePoints.length === 0) {
    advicePoints.push('Be clear about your goals and concerns.');
    advicePoints.push('Listen to understand, not just to respond.');
    advicePoints.push('Look for win-win solutions.');
    advicePoints.push('Follow up after the conversation to ensure understanding.');
  }

  // Add closing advice
  advicePoints.push('Remember to stay calm and respectful throughout the conversation.');
  advicePoints.push('If things get heated, it\'s okay to take a break and revisit the conversation later.');

  return advicePoints.join('\n\n');
}

/**
 * Create a baseline session
 */
export function createBaselineSession(input: {
  person: string;
  relationship: string;
  context: string;
  goal: string;
  concerns: string[];
  evidence: string[];
  desiredOutcome: string;
}): BaselineSession {
  const advice = generateBaselineAdvice(input);
  
  return {
    id: nanoid(),
    title: `Baseline: ${input.goal}`,
    person: input.person,
    relationship: input.relationship,
    context: input.context,
    goal: input.goal,
    concerns: input.concerns,
    evidence: input.evidence,
    desiredOutcome: input.desiredOutcome,
    advice,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Save baseline session to localStorage
 */
export function saveBaselineSession(session: BaselineSession): void {
  if (typeof window === 'undefined') return;
  
  const storageKey = `baseline_session_${session.id}`;
  localStorage.setItem(storageKey, JSON.stringify(session));
  
  // Also update the baseline sessions list
  const listKey = 'baseline_sessions_list';
  const list = JSON.parse(localStorage.getItem(listKey) || '[]') as string[];
  if (!list.includes(session.id)) {
    list.push(session.id);
    localStorage.setItem(listKey, JSON.stringify(list));
  }
}

/**
 * Get baseline session by ID
 */
export function getBaselineSession(id: string): BaselineSession | null {
  if (typeof window === 'undefined') return null;
  
  const storageKey = `baseline_session_${id}`;
  const stored = localStorage.getItem(storageKey);
  if (!stored) return null;
  
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

/**
 * List all baseline sessions
 */
export function listBaselineSessions(): BaselineSession[] {
  if (typeof window === 'undefined') return [];
  
  const listKey = 'baseline_sessions_list';
  const list = JSON.parse(localStorage.getItem(listKey) || '[]') as string[];
  
  return list
    .map(id => getBaselineSession(id))
    .filter((s): s is BaselineSession => s !== null)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
