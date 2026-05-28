/**
 * Sample Scenarios for Research Prototype
 * 6 realistic scenarios for quick testing and pilot study
 * All data is pseudonymous and designed for research validation
 */

import { InteractionEpisode, MemoryItem, DeliberationOutput, ReflectionRecord } from './types';
import { nanoid } from 'nanoid';

export interface SampleScenario {
  episode: InteractionEpisode;
  memories: MemoryItem[];
  deliberation?: DeliberationOutput;
  reflection?: ReflectionRecord;
}

// Scenario A: Regretting Choosing Civil Engineering
export const scenarioA: SampleScenario = {
  episode: {
    id: nanoid(),
    title: 'Discussing Career Pivot with Academic Advisor',
    person: 'Dr. Chen (Academic Advisor)',
    relationship: 'Faculty mentor',
    context: 'I chose civil engineering 3 years ago because it seemed stable and practical. Now I realize the industry is declining and growth is limited.',
    goal: 'Get honest feedback on switching to software engineering, data science, or digital construction',
    concerns: ['They will think I made a bad choice', 'I am concerned about starting over', 'I wonder if I can catch up with CS students'],
    knownEvidence: ['I have taken 2 CS electives and got A grades', 'The job market for junior civil engineers is weak', 'Tech roles pay 30% more'],
    desiredOutcome: 'Leave meeting with a clear plan and advisor support for career transition',
    status: 'draft',
    createdAt: new Date().toISOString(),
  } as any,
  memories: [
    {
      id: nanoid(),
      type: 'communication_style',
      content: 'Advisor prefers data-driven arguments and appreciates students who take initiative',
      relatedPerson: 'Dr. Chen',
      evidence: ['Praised my CS projects', 'Asked for market data in previous meetings'],
      confidence: 0.8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
    },
    {
      id: nanoid(),
      type: 'relationship_history',
      content: 'Has been supportive of student growth; previously helped 2 students change majors',
      relatedPerson: 'Dr. Chen',
      evidence: ['Mentioned other students who switched majors', 'Offered to write recommendation letters'],
      confidence: 0.75,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
    },
  ],
};

// Scenario B: CS Student Worried About AI Replacing Entry-Level Coding Jobs
export const scenarioB: SampleScenario = {
  episode: {
    id: nanoid(),
    title: 'Asking Mentor About Career Direction in AI Era',
    person: 'Alex (Senior Developer at Startup)',
    relationship: 'Professional mentor',
    context: 'I am a CS student from a non-top university. I worry that AI will reduce demand for junior developers. I am considering electronics, embedded systems, or AI-adjacent roles.',
    goal: 'Get honest advice on which specialization is most recession-proof and career-building',
    concerns: ['My university is not prestigious enough', 'AI will make my skills obsolete', 'I am unsure if I should specialize early or stay generalist'],
    knownEvidence: ['AI tools like GitHub Copilot are already replacing junior coding tasks', 'My university is ranked 50-100 nationally', 'I have 2 internships in web development'],
    desiredOutcome: 'Get clarity on whether to pivot to embedded systems, AI engineering, or stay in web dev',
    status: 'draft',
    createdAt: new Date().toISOString(),
  } as any,
  memories: [
    {
      id: nanoid(),
      type: 'recurring_concern',
      content: 'Mentor often emphasizes specialization and deep expertise over generalist skills',
      relatedPerson: 'Alex',
      evidence: ['Mentioned specialization in previous conversations', 'Praised engineers with focused expertise'],
      confidence: 0.7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
    },
  ],
};

// Scenario C: Humanities Student Reframing Career Options
export const scenarioC: SampleScenario = {
  episode: {
    id: nanoid(),
    title: 'Career Planning Meeting with Liberal Arts Dean',
    person: 'Dean Martinez (College Dean)',
    relationship: 'Academic administrator',
    context: 'I majored in literature and philosophy because I loved the subjects. Now I feel weaker than technical peers and worry about job prospects.',
    goal: 'Explore career paths that value humanities skills: content strategy, UX research, public sector, or EdTech',
    concerns: ['The dean will dismiss humanities careers', 'I am concerned about competing with CS graduates', 'I wonder if I should have double-majored'],
    knownEvidence: ['I have strong writing and analytical skills', 'I have done 1 internship in content marketing', 'Tech companies are hiring for UX research and product strategy roles'],
    desiredOutcome: 'Get validation that humanities skills are valuable and a concrete career roadmap',
    status: 'draft',
    createdAt: new Date().toISOString(),
  } as any,
  memories: [
    {
      id: nanoid(),
      type: 'communication_style',
      content: 'Dean is passionate about liberal arts education and often defends humanities value',
      relatedPerson: 'Dean Martinez',
      evidence: ['Gave passionate speech about liberal arts at orientation', 'Mentioned humanities alumni success stories'],
      confidence: 0.85,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
    },
  ],
};

// Scenario D: Struggling in a Misfit Work Environment
export const scenarioD: SampleScenario = {
  episode: {
    id: nanoid(),
    title: 'One-on-One with Manager About Team Dynamics',
    person: 'Manager (Team Lead)',
    relationship: 'Direct supervisor',
    context: 'I have been in this role for 8 months. The team has unclear expectations, low trust, and frequent criticism. I feel exhausted and unmotivated.',
    goal: 'Communicate my concerns and explore whether things can improve or if I should transfer/leave',
    concerns: ['The manager will see me as weak or uncommitted', 'They will dismiss my concerns', 'The problem might be my own expectations'],
    knownEvidence: ['Team members frequently criticize each other in meetings', 'Goals change weekly without notice', 'I have received contradictory feedback'],
    desiredOutcome: 'Get honest feedback on team dynamics and a concrete plan to improve or exit gracefully',
    status: 'draft',
    createdAt: new Date().toISOString(),
  } as any,
  memories: [
    {
      id: nanoid(),
      type: 'relationship_history',
      content: 'Manager is generally supportive but sometimes dismisses concerns as "team growing pains"',
      relatedPerson: 'Manager',
      evidence: ['Told me to "give it time" when I raised concerns before', 'Praised my work in 1-on-1s'],
      confidence: 0.7,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
    },
  ],
};

// Scenario E: Choosing Between Stability, Growth, and Short-Term Pay
export const scenarioE: SampleScenario = {
  episode: {
    id: nanoid(),
    title: 'Job Offer Decision with Trusted Mentor',
    person: 'Mentor (Former Manager)',
    relationship: 'Professional advisor',
    context: 'I have 3 job offers: (1) low-pay stable state-owned company, (2) lower-base high-growth software-hardware hybrid startup, (3) higher-pay but unstable internet company.',
    goal: 'Get unbiased perspective on which offer aligns with my long-term career goals',
    concerns: ['I worry about making the wrong choice', 'I am concerned about financial security', 'I wonder if I should prioritize learning or income'],
    knownEvidence: ['State-owned company: stable, good benefits, limited growth', 'Startup: equity, learning opportunity, high risk', 'Internet company: high pay, unstable, layoff risk'],
    desiredOutcome: 'Get clarity on which offer best supports my 5-year career vision',
    status: 'draft',
    createdAt: new Date().toISOString(),
  } as any,
  memories: [
    {
      id: nanoid(),
      type: 'communication_style',
      content: 'Mentor values long-term thinking and often asks about 5-year plans',
      relatedPerson: 'Mentor',
      evidence: ['Always asks about career goals', 'Emphasizes learning over short-term pay'],
      confidence: 0.8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
    },
  ],
};

// Scenario F: Choosing Between Frontend, Client, Testing, and Operations Roles
export const scenarioF: SampleScenario = {
  episode: {
    id: nanoid(),
    title: 'Career Path Discussion with Engineering Lead',
    person: 'Engineering Lead (Tech Interviewer)',
    relationship: 'Potential future manager',
    context: 'I am a junior candidate considering: frontend development, client-side development, testing, or operations. I worry these roles may become marginalized or automated.',
    goal: 'Get honest assessment of which role has the best long-term prospects and learning opportunities',
    concerns: ['I worry about choosing a role that becomes obsolete', 'I am unsure if I should specialize early or stay generalist', 'I fear being pigeonholed'],
    knownEvidence: ['Frontend roles are competitive', 'Testing is often seen as junior', 'Operations requires deep infrastructure knowledge', 'Client-side is niche'],
    desiredOutcome: 'Get clarity on which role offers both immediate entry and long-term growth',
    status: 'draft',
    createdAt: new Date().toISOString(),
  } as any,
  memories: [
    {
      id: nanoid(),
      type: 'communication_style',
      content: 'Lead is direct and values technical depth; prefers concrete examples over abstract discussion',
      relatedPerson: 'Engineering Lead',
      evidence: ['Asked detailed technical questions in interview', 'Focused on specific projects and outcomes'],
      confidence: 0.75,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active',
    },
  ],
};

// Export all scenarios
export const allSampleScenarios: Record<string, SampleScenario> = {
  A: scenarioA,
  B: scenarioB,
  C: scenarioC,
  D: scenarioD,
  E: scenarioE,
  F: scenarioF,
};

export const scenarioLabels: Record<string, string> = {
  A: 'Regretting Choosing Civil Engineering',
  B: 'CS Student Worried About AI Replacing Entry-Level Coding Jobs',
  C: 'Humanities Student Reframing Career Options',
  D: 'Struggling in a Misfit Work Environment',
  E: 'Choosing Between Stability, Growth, and Short-Term Pay',
  F: 'Choosing Between Frontend, Client, Testing, and Operations Roles',
};

export function getSampleScenario(key: string): SampleScenario | null {
  return allSampleScenarios[key] || null;
}

export function getAllScenarioKeys(): string[] {
  return Object.keys(allSampleScenarios);
}
