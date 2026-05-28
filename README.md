# CoEvoTalk: A Self-Evolving Personal AI Assistant for Reflective Social Interaction

## Project Overview

**CoEvoTalk** is a research prototype that explores how personal AI assistants can support users in preparing for and reflecting on high-stakes social interactions through longitudinal memory, what-if deliberation, and feedback-based adaptation.

Rather than generating immediate advice, CoEvoTalk helps users **externalize assumptions**, **explore multiple perspectives**, **identify hidden risks**, and **learn from past interactions** to improve their communication strategies over time.

## Research Motivation

Current AI assistants often:
- Generate immediate suggestions without understanding relationship history
- Lack persistent memory about communication patterns
- Don't preserve evidence of what worked or failed in past interactions
- Treat each conversation as isolated, missing opportunities for learning

CoEvoTalk addresses these gaps by:
1. **Maintaining long-term memory** about communication styles, relationship history, recurring concerns, and lessons learned
2. **Structuring deliberation** before high-stakes interactions through assumption surfacing and multi-perspective analysis
3. **Supporting reflection** after interactions by comparing predictions with actual outcomes
4. **Enabling adaptation** by automatically injecting relevant memories into future sessions

## System Architecture

### Core Data Flow

```
User Input (New Interaction)
    ↓
Memory Retrieval (Keyword Matching)
    ↓
Situation Structuring & Deliberation
    ↓
Strategy Generation (Multiple Approaches)
    ↓
User Feedback & Refinement
    ↓
Post-Interaction Reflection
    ↓
Memory Update & Learning
    ↓
Next Session (Adapted Context Injection)
```

### Key Components

| Component | Purpose | Status |
|-----------|---------|--------|
| **Storage Layer** | Persist episodes, memories, deliberations, reflections | ✅ localStorage |
| **Memory Retrieval** | Find relevant past patterns | ✅ Keyword matching |
| **Deliberation Engine** | Structure situation analysis | ✅ Mock LLM (ready for real API) |
| **Strategy Generation** | Multiple communication approaches | ✅ Mock LLM |
| **Reflection Capture** | Post-interaction learning | ✅ Implemented |
| **Debug/Audit Trail** | Full transparency for research | ✅ Complete logging |

## Human-AI Co-Evolution Loop

The system implements a feedback loop that improves over time:

```
Session 1: User reveals context
    ↓
AI structures situation & generates strategies
    ↓
User provides feedback (useful/inaccurate/too strong/etc.)
    ↓
AI writes memory items
    ↓
Session 2: Similar situation with same person
    ↓
AI automatically retrieves relevant memories
    ↓
Deliberation is informed by past patterns
    ↓
User reflects on outcome & updates memory
    ↓
Loop continues with accumulated knowledge
```

## Pages & Features

### 1. `/new` - Create New Interaction
- Form to capture interaction context:
  - Who (person, relationship)
  - What (goal, background)
  - Why (concerns, desired outcome)
  - Evidence (known facts)
- Automatically retrieves relevant memories
- Triggers deliberation analysis
- Saves complete debug logs

### 2. `/session/[id]` - View Deliberation Results
- **Current Situation**: Summary with goals and concerns
- **Hidden Assumptions**: What might be taken for granted
- **Possible Misunderstandings**: Where wires could cross
- **Stakeholder Perspectives**:
  - Counterpart's likely view
  - Observer's perspective
  - Future self's wisdom
  - Risk checker's concerns
- **What-If Paths**: Different communication approaches and outcomes
- **Communication Strategies**: 4 approaches (direct, soft, evidence-based, negotiation)
- **Clarification Questions**: For deeper reflection
- **Retrieved Memories**: Relevant past patterns (sidebar)

### 3. `/memory` - Long-Term Memory Management
- View all stored memories with filtering:
  - By type (communication style, relationship history, etc.)
  - By status (active, uncertain, outdated, rejected)
  - By person
- Manually add new memories
- Update memory status
- Search across memories

### 4. `/reflect/[id]` - Post-Interaction Reflection
- Document what actually happened
- Compare predictions vs. reality:
  - What was accurate?
  - What was wrong?
  - Which assumptions held up?
  - Which assumptions were falsified?
- Capture new evidence
- Identify lessons to remember
- Plan next actions
- Automatically generates memory items from reflection

### 5. `/debug/[id]` - System Transparency
- Complete audit trail for research:
  - User input
  - Retrieved memories
  - Constructed prompt
  - Raw LLM response
  - Parsed output
  - Memory writes
  - Feedback records
  - Error logs
- Expandable sections for each step
- Copy-to-clipboard for all data
- Full transparency for validation and debugging

## Data Types

### InteractionEpisode
A single high-stakes social interaction the user wants to prepare for or reflect on.

### MemoryItem
Long-term memory about communication patterns, relationship history, or lessons learned. Types include:
- `communication_style`: How this person prefers to be communicated with
- `relationship_history`: Past interactions and outcomes
- `recurring_concern`: Issues that keep coming up
- `rejected_strategy`: Approaches that didn't work
- `confirmed_pattern`: Strategies that worked well
- `unresolved_conflict`: Ongoing issues

### DeliberationOutput
AI's structured analysis of a situation, including assumptions, perspectives, what-if paths, and strategies.

### ReflectionRecord
Post-interaction documentation comparing predictions with actual outcomes.

### FeedbackRecord
User feedback on AI outputs to improve future deliberations.

### DebugLog
Complete audit trail of system operations for transparency.

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: Wouter (client-side)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Storage**: localStorage (development) → Database (future)
- **LLM**: Mock implementation (development) → Real API (future)

## How to Run

### Prerequisites
- Node.js 22+
- pnpm (included in project)

### Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
# Type check
pnpm check

# Build
pnpm build

# Preview
pnpm preview
```

## Current Limitations

### Phase 1 (MVP - Current)
- ✅ localStorage only (no database)
- ✅ Mock LLM (deterministic output)
- ✅ Keyword-based memory retrieval
- ✅ No authentication
- ✅ Single user per browser
- ✅ No data export/import

### Known Issues
- TypeScript strict mode warnings in Debug page (cosmetic, doesn't affect functionality)
- Memory retrieval is basic keyword matching (no embeddings)
- Mock LLM output is static (good for testing, not realistic)

## Next Steps

### Phase 2: Real LLM Integration
- [ ] Connect to OpenAI API (or similar)
- [ ] Implement streaming responses
- [ ] Add cost tracking
- [ ] Improve prompt engineering

### Phase 3: Advanced Memory
- [ ] Implement semantic search with embeddings
- [ ] Add memory decay and refresh
- [ ] Support memory tagging and relationships
- [ ] Export/import memory backups

### Phase 4: User Study
- [ ] Conduct formative interviews
- [ ] Run pilot study with target users
- [ ] Compare baseline chatbot vs. CoEvoTalk
- [ ] Measure learning over time

### Phase 5: Production
- [ ] Add database backend (PostgreSQL)
- [ ] Implement user authentication
- [ ] Add data privacy/export features
- [ ] Deploy to production

## File Structure

```
coevotalk/
├── client/
│   ├── src/
│   │   ├── lib/
│   │   │   └── coevotalk/
│   │   │       ├── types.ts           # Core data types
│   │   │       ├── storage.ts         # localStorage API
│   │   │       ├── mockLLM.ts         # Mock LLM implementation
│   │   │       └── buildPrompt.ts     # Prompt construction
│   │   ├── pages/
│   │   │   ├── Home.tsx               # Dashboard
│   │   │   ├── NewInteraction.tsx     # Create interaction
│   │   │   ├── Session.tsx            # View deliberation
│   │   │   ├── Memory.tsx             # Memory management
│   │   │   ├── Reflection.tsx         # Post-interaction review
│   │   │   └── Debug.tsx              # Audit trail
│   │   ├── App.tsx                    # Router
│   │   └── index.css                  # Global styles
│   ├── index.html
│   └── public/
├── server/
│   └── index.ts                       # Express server (placeholder)
└── README.md
```

## Example Workflow

### Scenario: Negotiating a Job Offer

**Step 1: Create Interaction** (`/new`)
- Person: "My hiring manager"
- Relationship: "New employer"
- Goal: "Negotiate salary and remote work flexibility"
- Concerns: "They might think I'm ungrateful. I might come across as too demanding."
- Known Evidence: "They said the offer is competitive. They value work-life balance."
- Desired Outcome: "Reach an agreement on salary (+10%) and 3 days remote/week"

**Step 2: Review Deliberation** (`/session/[id]`)
- System surfaces hidden assumption: "You assume they have budget flexibility"
- Counterpart perspective: "They might worry you'll leave if not satisfied"
- Strategy 1 (Direct): "Here's my counter-proposal..."
- Strategy 2 (Soft): "I appreciate the offer. I'd like to discuss a few things..."
- Strategy 3 (Evidence-based): "Based on market data for this role..."
- Strategy 4 (Negotiation): "Let's find a solution that works for both of us..."

**Step 3: Conduct Interaction**
- User has conversation with manager
- Takes notes on what actually happened

**Step 4: Reflect** (`/reflect/[id]`)
- Actual outcome: "They agreed to +8% salary and 2 days remote"
- What was accurate: "They were open to negotiation"
- What was wrong: "I overestimated their budget flexibility"
- New evidence: "They care more about flexibility than salary"
- Lessons: "For this person, lead with flexibility, then salary"

**Step 5: Memory Updated**
- New memory created: "Confirmed pattern: Manager values flexibility over salary"
- Relationship history updated with interaction details
- Next time with this person, system will remember this

## Research Questions

CoEvoTalk explores:

1. **Can structured deliberation improve social interaction outcomes?**
   - Do users make better decisions with assumption surfacing?
   - Does multi-perspective analysis reduce regret?

2. **Does longitudinal memory improve communication?**
   - Do users learn from past interactions?
   - Does memory injection reduce repeated mistakes?

3. **What feedback mechanisms support human-AI co-evolution?**
   - Which feedback types are most useful?
   - How does user trust develop over time?

4. **How do users perceive AI-assisted reflection?**
   - Is it experienced as helpful or intrusive?
   - Does it support genuine learning or just compliance?

## Citation

If you use CoEvoTalk in your research, please cite:

```bibtex
@software{coevotalk2026,
  title={CoEvoTalk: A Self-Evolving Personal AI Assistant for Reflective Social Interaction},
  author={[Author Name]},
  year={2026},
  url={https://github.com/[repo]}
}
```

## License

MIT

## Contact

For questions or collaboration inquiries, please open an issue on GitHub.

---

**Last Updated**: May 28, 2026
**Version**: 0.1.0 (MVP)
**Status**: Active Development
