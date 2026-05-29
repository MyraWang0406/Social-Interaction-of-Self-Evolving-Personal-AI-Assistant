# CoEvoTalk: A Self-Evolving Personal AI Assistant for Reflective Social Interaction

> **🔬 Research Prototype for HCI Study & RA Review**

## 🚀 Quick Links

- **Live Demo**: https://self-evolving-personal-ai-assistant.myrawzm0406.online/
- **Repository**: https://github.com/MyraWang0406/Social-Interaction-of-Self-Evolving-Personal-AI-Assistant
- **Status**: Research Prototype / MVP (Phase 1)

---

## 📊 Current Prototype Status

| Aspect | Status | Details |
|--------|--------|---------|
| **Frontend** | ✅ Complete | React 19 + TypeScript + Tailwind CSS 4 |
| **Data Storage** | ✅ localStorage | Browser-based, no backend database |
| **AI Mode** | ✅ Mock LLM | Deterministic output for testing & research |
| **Memory System** | ✅ Implemented | Keyword-based retrieval, 6 memory types |
| **Deliberation** | ✅ Implemented | 5 perspectives, 4 communication strategies |
| **Reflection** | ✅ Implemented | Post-interaction learning & memory update |
| **Debug/Audit** | ✅ Complete | Full transparency for research validation |
| **Backend** | ⚠️ Static Only | Express server for deployment, no real API |
| **Database** | ❌ Not Yet | Planned for Phase 2 |
| **Authentication** | ❌ Not Yet | Single-user browser mode only |
| **Real LLM API** | ❌ Not Yet | Planned for Phase 2 |

---

## ⏱️ How to Try in 3 Minutes

### For Researchers, RA Reviewers, and Pilot Study Participants

**Step 1: Load a Sample Scenario** (30 seconds)
- Click the "Load Sample Scenario" button on the home page
- Choose from 6 realistic scenarios (career decisions, workplace conflicts, etc.)

**Step 2: Review What-If Deliberation** (1 minute)
- Explore the structured analysis: hidden assumptions, stakeholder perspectives, what-if paths
- Read the 4 communication strategies tailored to your scenario

**Step 3: Review Memories** (30 seconds)
- Check the sidebar to see relevant past patterns
- Understand what context is being used in this deliberation

**Step 4: Export Study Data** (30 seconds)
- Click "Export Data" button
- Download all research data as JSON for analysis

---

## 🔬 For RA Review & Research Validation

### Research Readiness Checklist

- ✅ **Reproducible**: All deliberation outputs logged with full audit trail
- ✅ **Transparent**: Debug page shows every step (input → memory retrieval → prompt → LLM output → parsing)
- ✅ **Testable**: Mock LLM provides stable, deterministic outputs for controlled testing
- ✅ **Comparable**: Baseline mode available for baseline vs. CoEvoTalk comparison
- ✅ **Exportable**: All research data (episodes, feedback, reflections, memories) exportable as JSON
- ✅ **Participant-Trackable**: Participant ID field for pilot study data linking

### Research Data Exported

```json
{
  "participantId": "P001",
  "appVersion": "0.2.0",
  "condition": "coevotalk",
  "episodes": [...],
  "deliberationOutputs": [...],
  "baselineSessions": [...],
  "memories": [...],
  "feedbackRecords": [...],
  "reflectionRecords": [...],
  "debugLogs": [...],
  "exportedAt": "2026-05-28T13:30:00Z"
}
```

---

## ⚖️ Ethics & Privacy Notice

**This prototype is for reflective preparation and post-interaction learning only.**

- ⚠️ **Not therapy, legal advice, or crisis intervention**
- ⚠️ **Do not enter real names or sensitive personal information**
- ✅ **Data stored locally in browser** (localStorage) in current version
- ✅ **No data sent to external servers** (except mock LLM calls in development)
- ✅ **No tracking or analytics** beyond local debug logs

**Recommended Use Cases**:
- Preparing for job interviews, salary negotiations, career transitions
- Reflecting on workplace conflicts or team dynamics
- Practicing difficult conversations with family or friends
- Analyzing communication patterns over time

**Not Recommended For**:
- Mental health crises (use crisis hotlines instead)
- Legal disputes (consult lawyers)
- Medical decisions (consult healthcare providers)
- Highly sensitive personal information

---

## 🎯 Sample Scenarios (6 Included)

The prototype includes 6 realistic scenarios for immediate testing:

### A. Regretting Choosing Civil Engineering
A student chose civil engineering for stability but now worries about limited growth and declining industry opportunities. Considering: software, data science, public-sector prep, or digital construction.

### B. CS Student Worried About AI Replacing Entry-Level Coding Jobs
A non-top-university CS student worries AI will reduce junior developer demand. Considering: electronics, embedded systems, industrial software, applied AI, or software-hardware hybrid roles.

### C. Humanities Student Reframing Career Options
A humanities major feels weaker than technical peers. Considering: content strategy, user research, public-sector exams, education technology, or business analysis.

### D. Struggling in a Misfit Work Environment
An employee feels exhausted in a low-trust team with unclear expectations. Considering: keep adapting, communicate with manager, transfer internally, or leave.

### E. Choosing Between Stability, Growth, and Short-Term Pay
Choosing among: low-pay stable state-owned company, lower-base high-growth software-hardware role, or higher-pay unstable internet non-tech role.

### F. Choosing Between Frontend, Client, Testing, and Operations Roles
A junior candidate considers: frontend dev, client-side dev, testing, or operations. Worried about role marginalization or automation, but needs an entry point.

---

## 📖 Project Overview

**CoEvoTalk** is a research prototype exploring how personal AI assistants can support users in preparing for and reflecting on high-stakes social interactions through longitudinal memory, what-if deliberation, and feedback-based adaptation.

Rather than generating immediate advice, CoEvoTalk helps users **externalize assumptions**, **explore multiple perspectives**, **identify hidden risks**, and **learn from past interactions** to improve their communication strategies over time.

### Research Motivation

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

---

## 🏗️ System Architecture

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
| **Baseline Mode** | Simple advice for comparison | ✅ /baseline page |
| **Data Export** | Research data download | ✅ JSON export |

---

## 🔄 Human-AI Co-Evolution Loop

The system implements a feedback loop that improves over time:

```
Session 1: User reveals context
    ↓
AI structures situation & generates strategies
    ↓
User provides feedback (useful/too generic/too directive/etc.)
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

---

## 📄 Pages & Features

### 1. `/` - Home Dashboard
- Statistics: Interactions, Memories, Reflections
- Recent interactions list
- Quick actions: New Interaction, View Memories
- System status: Storage mode, LLM mode, Memory retrieval
- Research focus overview
- **Load Sample Scenario** button (for quick testing)

### 2. `/new` - Create New Interaction
- Form to capture interaction context:
  - Who (person, relationship)
  - What (goal, background)
  - Why (concerns, desired outcome)
  - Evidence (known facts)
- Automatically retrieves relevant memories
- Triggers deliberation analysis
- Saves complete debug logs

### 3. `/session/[id]` - View Deliberation Results
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
- **Feedback Buttons**: Rate each strategy (feedback types in development)
- **Retrieved Memories**: Relevant past patterns (sidebar)

### 4. `/memory` - Long-Term Memory Management
- View all stored memories with filtering:
  - By type (communication style, relationship history, etc.)
  - By status (active, uncertain, outdated, rejected)
  - By person
- View memory details:
  - Source episode
  - Confidence level
  - Content and evidence
- Update memory status (active/outdated/rejected)
- *Advanced inspector features (confirm/edit/archive) in development*
- Manually add new memories
- Search across memories

### 5. `/reflect/[id]` - Post-Interaction Reflection
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

### 6. `/baseline` - Baseline Assistant (for comparison studies)
- Simple direct advice mode (no memory, no multi-perspective analysis)
- Same input form as CoEvoTalk
- Generates straightforward recommendations
- Saves to separate BaselineSession data
- Clearly labeled as "Baseline Assistant"
- Supports baseline vs. CoEvoTalk comparison studies

### 7. `/debug/[id]` - System Transparency
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

---

## 💾 Data Types

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

**Memory Status**: active, uncertain, outdated, rejected

### DeliberationOutput
AI's structured analysis of a situation, including assumptions, perspectives, what-if paths, and strategies.

### ReflectionRecord
Post-interaction documentation comparing predictions with actual outcomes.

### FeedbackRecord
User feedback on AI outputs to improve future deliberations. Types (in development):
- Useful
- Too Generic
- Too Directive
- Missing Context
- Wrong Memory
- Save Important
- Do Not Remember

*Current implementation supports legacy feedback types; new types UI in progress*

### BaselineSession
Simple advice session from baseline assistant (for comparison studies).

### DebugLog
Complete audit trail of system operations for transparency.

---

## 🛠️ Technology Stack

- **Frontend**: React 19 + TypeScript
- **Routing**: Wouter (client-side)
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Storage**: localStorage (development) → Database (future)
- **LLM**: Mock implementation (development) → Real API (future)

---

## 🚀 How to Run

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

### Deploy to Cloudflare Pages

```bash
# Push to GitHub (already configured with _redirects and wrangler.toml)
git push origin main

# In Cloudflare Pages:
# 1. Connect GitHub repository
# 2. Build command: pnpm build
# 3. Build output directory: dist/public
# 4. Deploy
```

---

## 📋 Current Limitations (Phase 1)

### Implemented
- ✅ localStorage-based episodes and memories
- ✅ Mock LLM deliberation (deterministic for testing)
- ✅ Sample scenario files (6 realistic scenarios)
- ✅ Basic baseline assistant (/baseline page)
- ✅ Basic client-side JSON export
- ✅ Participant ID for pilot data tracking
- ✅ Complete debug/audit logs
- ✅ Keyword-based memory retrieval

### Still Under Development
- 🔄 7-category feedback UI in Session page
- 🔄 Advanced Memory Inspector (confirm/edit/reject/archive buttons)
- 🔄 Verified sample-scenario loading flow
- 🔄 Formal user study workflow
- ❌ Real LLM API (OpenAI/Claude)
- ❌ Backend database
- ❌ User authentication
- ❌ Multi-user support
- ⚠️ TypeScript strict mode warnings in Debug page (cosmetic)

---

## 🗺️ Planned Research Features

### Phase 2: Real LLM Integration
- [ ] Connect to OpenAI API (or Claude)
- [ ] Implement streaming responses
- [ ] Add cost tracking
- [ ] Improve prompt engineering
- [ ] Support multiple LLM providers

### Phase 3: Advanced Memory & Analysis
- [ ] Implement semantic search with embeddings
- [ ] Add memory decay and refresh mechanisms
- [ ] Support memory tagging and relationships
- [ ] Export/import memory backups
- [ ] Analyze memory usage patterns

### Phase 4: User Study & Pilot
- [ ] Conduct formative interviews with target users
- [ ] Run pilot study comparing baseline vs. CoEvoTalk
- [ ] Measure learning outcomes over time
- [ ] Analyze feedback patterns
- [ ] Iterate based on user feedback

### Phase 5: Production & Scale
- [ ] Add database backend (PostgreSQL)
- [ ] Implement user authentication
- [ ] Add data privacy/export features
- [ ] Deploy to production
- [ ] Support multi-user collaboration

---

## 📁 File Structure

```
coevotalk/
├── client/
│   ├── src/
│   │   ├── lib/
│   │   │   └── coevotalk/
│   │   │       ├── types.ts              # Core data types
│   │   │       ├── storage.ts            # localStorage API
│   │   │       ├── mockLLM.ts            # Mock LLM implementation
│   │   │       ├── buildPrompt.ts        # Prompt construction
│   │   │       ├── sampleData.ts         # Sample scenarios
│   │   │       └── baselineAssistant.ts  # Baseline mode logic
│   │   ├── pages/
│   │   │   ├── Home.tsx                  # Dashboard
│   │   │   ├── NewInteraction.tsx        # Create interaction
│   │   │   ├── Session.tsx               # View deliberation
│   │   │   ├── Baseline.tsx              # Baseline assistant
│   │   │   ├── Memory.tsx                # Memory management
│   │   │   ├── Reflection.tsx            # Post-interaction review
│   │   │   └── Debug.tsx                 # Audit trail
│   │   ├── App.tsx                       # Router
│   │   └── index.css                     # Global styles
│   ├── index.html
│   └── public/
│       ├── _redirects                    # Cloudflare Pages routing
│       └── favicon.ico
├── server/
│   └── index.ts                          # Express server (static)
├── wrangler.toml                         # Cloudflare Pages config
├── package.json
├── vite.config.ts
└── README.md
```

---

## 📚 Example Workflow

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

---

## 🔬 Research Questions

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

5. **How does CoEvoTalk compare to baseline assistance?**
   - Does deliberation + memory outperform simple advice?
   - Which features are most valued by users?

---

## 📝 Citation

If you use CoEvoTalk in your research, please cite:

```bibtex
@software{coevotalk2026,
  title={CoEvoTalk: A Self-Evolving Personal AI Assistant for Reflective Social Interaction},
  author={[Author Name]},
  year={2026},
  url={https://github.com/MyraWang0406/Social-Interaction-of-Self-Evolving-Personal-AI-Assistant}
}
```

---

## 📜 License

MIT

---

## 📧 Contact

For questions, collaboration inquiries, or research participation, please open an issue on GitHub or contact the research team.

---

**Last Updated**: May 28, 2026  
**Version**: 0.2.0 (Research Prototype)  
**Status**: Active Development for RA Review & Pilot Study  
**Deployment**: Cloudflare Pages (https://self-evolving-personal-ai-assistant.myrawzm0406.online/)
