/**
 * Sample Data for CoEvoTalk
 * 
 * Pre-populated data for demonstration and testing.
 * This helps users understand the system without having to create data from scratch.
 */

import type {
  InteractionEpisode,
  MemoryItem,
  DeliberationOutput,
  ReflectionRecord,
} from "./types";

export const SAMPLE_EPISODES: InteractionEpisode[] = [
  {
    id: "ep-001",
    title: "Discuss Work-Life Balance with Manager",
    person: "Sarah Chen (Manager)",
    relationship: "Direct Manager",
    context:
      "Sarah has been my manager for 6 months. We have a good working relationship but haven't discussed personal boundaries yet.",
    goal: "Establish clear expectations around after-hours communication and weekend work",
    concerns: [
      "She might think I'm not committed if I set boundaries",
      "The team is in a busy period and she might see this as poor timing",
      "I might come across as ungrateful for the opportunity",
    ],
    knownEvidence: [
      "She often sends messages at 9pm",
      "The team has been working weekends on the current project",
      "She mentioned she values 'flexibility' in job interviews",
      "Other team members seem to work similar hours",
    ],
    desiredOutcome:
      "Reach an agreement where I'm available for urgent issues but not expected to respond to non-urgent messages after 7pm or on weekends",
    status: "ready",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ep-002",
    title: "Negotiate Salary for New Role",
    person: "Alex Rodriguez (Hiring Manager)",
    relationship: "Potential Manager (New Job)",
    context:
      "Alex offered me a senior engineer position. The offer is good but below market rate for the role and location.",
    goal: "Negotiate salary to market rate (+15%) while maintaining positive relationship",
    concerns: [
      "They might withdraw the offer if I push back",
      "I might seem ungrateful for the opportunity",
      "They might think I'm not a team player",
    ],
    knownEvidence: [
      "Glassdoor shows average salary is 15% higher",
      "I have 8 years of experience in this domain",
      "They mentioned budget flexibility during interviews",
      "The role is hard to fill (they mentioned this)",
    ],
    desiredOutcome:
      "Reach an agreement on salary increase to $180k base + benefits, or understand their constraints and find creative solutions",
    status: "deliberating",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ep-003",
    title: "Address Recurring Conflict with Partner",
    person: "Jordan (Partner)",
    relationship: "Romantic Partner (3 years)",
    context:
      "We've been together for 3 years. Recently, we've been having recurring conflicts about household responsibilities and decision-making autonomy.",
    goal: "Establish a framework where we both feel heard and respected in household decisions",
    concerns: [
      "Jordan might feel I'm criticizing their approach",
      "This could escalate into a bigger argument",
      "I might not express my needs clearly",
    ],
    knownEvidence: [
      "Recent conflict: I felt told to do chores rather than asked",
      "Jordan said they felt like I wasn't appreciating their efforts",
      "We both value independence and partnership",
      "Past conversations have been unproductive",
    ],
    desiredOutcome:
      "Agree on a communication style where we request rather than demand, and respect each other's autonomy in decision-making",
    status: "draft",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const SAMPLE_MEMORIES: MemoryItem[] = [
  {
    id: "mem-001",
    type: "communication_style",
    content: "Sarah prefers direct communication with data/evidence",
    evidence: [
      "She responded well when I presented metrics",
      "She asked for 'facts not feelings' in past discussions",
    ],
    confidence: 0.8,
    status: "active",
    relatedPerson: "Sarah Chen",
    relatedEpisodeId: "ep-001",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mem-002",
    type: "relationship_history",
    content: "Sarah values team cohesion and sometimes prioritizes it over individual needs",
    evidence: [
      "She emphasized 'we're a team' when discussing project priorities",
      "She seemed frustrated when I took time off during crunch",
    ],
    confidence: 0.7,
    status: "active",
    relatedPerson: "Sarah Chen",
    relatedEpisodeId: "ep-001",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mem-003",
    type: "recurring_concern",
    content: "Sarah might interpret boundary-setting as lack of commitment",
    evidence: [
      "She mentioned 'flexibility' as a key trait during hiring",
      "She seemed surprised when I said I prefer not to work weekends",
    ],
    confidence: 0.6,
    status: "uncertain",
    relatedPerson: "Sarah Chen",
    relatedEpisodeId: "ep-001",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mem-004",
    type: "confirmed_pattern",
    content: "Alex responds well to collaborative problem-solving approach",
    evidence: [
      "During interviews, he engaged deeply when I asked about team challenges",
      "He seemed excited when I proposed solutions rather than just asking questions",
    ],
    confidence: 0.85,
    status: "active",
    relatedPerson: "Alex Rodriguez",
    relatedEpisodeId: "ep-002",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mem-005",
    type: "rejected_strategy",
    content: "Aggressive negotiation doesn't work with Jordan",
    evidence: [
      "Last time I demanded changes, Jordan became defensive",
      "The conversation escalated rather than resolved",
    ],
    confidence: 0.9,
    status: "active",
    relatedPerson: "Jordan",
    relatedEpisodeId: "ep-003",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "mem-006",
    type: "confirmed_pattern",
    content: "Jordan responds well to 'we're in this together' framing",
    evidence: [
      "When I said 'I want us to find a solution together', Jordan relaxed",
      "Collaborative tone led to better outcomes in past discussions",
    ],
    confidence: 0.85,
    status: "active",
    relatedPerson: "Jordan",
    relatedEpisodeId: "ep-003",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const SAMPLE_REFLECTION: ReflectionRecord = {
  id: "ref-001",
  episodeId: "ep-001",
  actualOutcome:
    "Sarah was receptive to the conversation. She acknowledged that after-hours messages were becoming a pattern and agreed to establish boundaries. We agreed that urgent issues (production down, security) warrant immediate response, but other messages can wait until business hours.",
  whatWasAccurate: [
    "Sarah does value team flexibility",
    "She was open to discussion when I framed it as protecting team productivity",
  ],
  whatWasWrong: [
    "I thought she would be defensive - she was actually relieved to discuss this",
    "I overestimated the risk of seeming ungrateful",
  ],
  assumptionsConfirmed: [
    "Sarah prefers data-driven conversations",
    "She cares about team wellbeing",
  ],
  assumptionsFalsified: [
    "She doesn't interpret boundaries as lack of commitment",
    "She was also feeling pressure to always be available",
  ],
  newEvidence: [
    "Sarah has been struggling with work-life balance herself",
    "The team has informal norms that are stricter than official policy",
    "She values transparency about constraints",
  ],
  memoryToUpdate: [
    "Sarah is open to boundary discussions when framed as team health",
    "She appreciates when people are direct about their needs",
    "She was also affected by the always-on culture",
  ],
  nextAction:
    "Follow up with written summary of agreed boundaries. Model the behavior by not sending after-hours messages. Check in with Sarah in 2 weeks to see how it's working.",
  createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
};

export function initializeSampleData() {
  const storage = typeof window !== "undefined" ? window.localStorage : null;
  if (!storage) return;

  // Check if sample data already exists
  const existingEpisodes = storage.getItem("coevotalk_episodes");
  if (existingEpisodes) {
    // Data already initialized
    return;
  }

  // Initialize episodes
  storage.setItem("coevotalk_episodes", JSON.stringify(SAMPLE_EPISODES));

  // Initialize memories
  storage.setItem("coevotalk_memories", JSON.stringify(SAMPLE_MEMORIES));

  // Initialize reflection (for ep-001)
  const reflections = [SAMPLE_REFLECTION];
  storage.setItem("coevotalk_reflections", JSON.stringify(reflections));

  console.log("✅ Sample data initialized");
}

export function clearSampleData() {
  const storage = typeof window !== "undefined" ? window.localStorage : null;
  if (!storage) return;

  storage.removeItem("coevotalk_episodes");
  storage.removeItem("coevotalk_memories");
  storage.removeItem("coevotalk_deliberations");
  storage.removeItem("coevotalk_reflections");
  storage.removeItem("coevotalk_feedbacks");
  storage.removeItem("coevotalk_debug_logs");

  console.log("✅ Sample data cleared");
}
