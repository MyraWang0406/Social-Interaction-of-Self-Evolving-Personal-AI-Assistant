# CoEvoTalk  
## A Self-Evolving Personal AI Assistant for Reflective Career and Workplace Decisions

**Live Demo:** https://self-evolving-personal-ai-assistant.myrawzm0406.online/  
**Status:** Early Research Prototype / MVP  
**Current AI Mode:** Deterministic Mock LLM  
**Storage:** Browser localStorage  
**Backend:** Static Express server for deployment only; no database, authentication, or real LLM API yet  
**Core Scenario:** Reflective preparation and post-interaction learning for high-stakes career, workplace, and social decisions  

---

## Overview

CoEvoTalk is an early HCI research prototype exploring how a self-evolving personal AI assistant can support users in complex career, workplace, and social decision-making.

Instead of giving immediate advice, CoEvoTalk helps users:

- externalize hidden assumptions;
- compare possible what-if paths;
- reflect on past decisions and interactions;
- preserve long-term memory for future support;
- receive more context-aware assistance over repeated use.

The current prototype is designed for **RA review, demo-based discussion, and pilot-study preparation**. It is not a production-ready personal AI assistant.

---

## Research Motivation

People increasingly use AI assistants to think through complex personal and work-related decisions, such as choosing a career direction, evaluating job offers, communicating with managers, or deciding whether to stay in a mismatched environment.

However, current AI assistants often provide fast recommendations without helping users examine:

- hidden assumptions;
- conflicting goals;
- missing context;
- past evidence;
- previous decisions;
- long-term consequences.

This may lead to premature convergence, shallow reflection, and repeated decision mistakes.

CoEvoTalk explores whether a personal AI assistant can become more useful over time by combining:

1. **What-if deliberation** before a decision;
2. **longitudinal memory** across decision episodes;
3. **feedback-based adaptation** after user interaction;
4. **post-interaction reflection** for future learning.

---

## Research Question

> How can a self-evolving personal AI assistant support reflective decision-making by combining what-if deliberation, longitudinal memory, and feedback-based adaptation?

---

## For RA / Research Review

This project is designed as an early research seed for studying **Self-Evolving Personal AI Assistants via Human-AI Co-Evolutionary Interactive Learning**.

It focuses on the following HCI questions:

- How can a personal AI assistant help users expand rather than narrow their decision space?
- How can AI support reflection without replacing human judgment?
- How should AI assistants remember past decisions, constraints, and feedback?
- How can users inspect, correct, or reject AI memory?
- How can repeated human-AI interaction change the assistant’s future support strategy?

The prototype is intended to support further work on:

- formative study design;
- prototype iteration;
- pilot user evaluation;
- baseline comparison;
- design implication development;
- HCI-oriented paper preparation.

---

## Current Status

This is an early research prototype. The current version demonstrates the intended interaction loop but is not production-ready.

### Implemented

- localStorage-based interaction episodes and memories;
- deterministic mock LLM deliberation;
- sample scenario files;
- basic sample scenario loading flow;
- basic baseline assistant;
- basic client-side JSON / CSV export;
- participant ID field for pilot-study data;
- debug / audit trail for transparency;
- live web demo.

### Still Under Development

- complete 7-category feedback UI in the Session page;
- editable Memory Inspector with confirm / edit / reject / archive / do-not-remember controls;
- fully verified end-to-end sample scenario flow;
- formal user study workflow;
- real LLM API integration;
- backend database;
- authentication and multi-user accounts;
- long-term cross-device memory.

---

## Core Interaction Loop

CoEvoTalk demonstrates the following human-AI co-evolution loop:

```text
User describes a high-stakes decision or interaction
        ↓
AI structures the situation into goals, concerns, assumptions, evidence, and risks
        ↓
AI generates what-if paths and possible strategies
        ↓
User gives feedback on the output
        ↓
User reflects after the real-world decision or interaction
        ↓
System writes or updates memory items
        ↓
Future sessions retrieve relevant memory for more context-aware support

---

## How to Try in 3 Minutes

1. Open the live demo:  
   https://self-evolving-personal-ai-assistant.myrawzm0406.online/

2. Click **Load Sample Scenario**.

3. Select one sample scenario, such as:
   - career major regret;
   - AI impact on entry-level CS jobs;
   - humanities career reframing;
   - mismatched work environment;
   - offer choice among stability, growth, and pay;
   - frontend / client / testing / operations career path.

4. Review the generated deliberation, including:
   - situation summary;
   - hidden assumptions;
   - possible risks;
   - stakeholder perspectives;
   - what-if paths;
   - suggested strategies.

5. Try the **Baseline Assistant** for comparison.

6. Open **Long-Term Memory** to inspect stored memory items.

7. Use **Export Data** to download local research data as JSON or CSV.

---

## Sample Scenario Directions

The prototype currently focuses on reflective career and workplace decisions, including:

| Scenario | Description |
|---|---|
| Regretting a college major choice | A student reflects on whether choosing a seemingly stable major limited future options. |
| CS student worried about AI | A student from a non-top university worries that AI may reduce demand for entry-level coding jobs. |
| Humanities career reframing | A humanities-background student explores transferable skills and non-coding career paths. |
| Misfit work environment | An employee reflects on whether to keep adapting, communicate, transfer, or leave. |
| Offer choice | A job seeker compares a stable low-pay role, a growth-oriented role, and a higher-pay unstable role. |
| Technical role direction | A junior candidate compares frontend, client-side, testing, operations, embedded, and industrial software paths. |

These scenarios are designed for research demonstration only. Users should avoid entering real names, real companies, or sensitive personal information.

---

## Pages and Features

### Home

The home page provides entry points for:

- **New Interaction**
- **Load Sample Scenario**
- **Baseline Assistant**
- **Long-Term Memory**
- **Export Data**

It also includes a participant ID field for pilot-study preparation.

### New Interaction

Users can describe a high-stakes decision or social / workplace interaction.

The system collects:

| Field | Purpose |
|---|---|
| Person or role involved | Identifies the interaction target without requiring real names. |
| Relationship context | Captures the social or workplace relation. |
| Background situation | Provides the context of the decision or interaction. |
| User goal | Clarifies what the user wants to achieve. |
| Concerns | Records worries, uncertainties, or possible risks. |
| Known evidence | Captures facts the user already knows. |
| Desired outcome | Defines what a good result would look like. |

### Session

The session page presents structured AI deliberation, including:

- situation summary;
- hidden assumptions;
- possible risks;
- stakeholder perspectives;
- what-if paths;
- suggested strategies.

Basic feedback buttons are available. A richer feedback taxonomy is still under development.

### Baseline Assistant

The baseline assistant provides simple direct advice without:

- long-term memory;
- what-if deliberation;
- multi-perspective analysis;
- post-interaction learning.

It is designed as a comparison condition for future pilot studies.

### Long-Term Memory

The memory page allows users to view and filter stored memory items.

A richer editable Memory Inspector is still under development. Future versions will support more explicit user control, such as:

- confirming memories;
- editing memories;
- rejecting memories;
- archiving memories;
- deleting or marking memories as “do not remember.”

### Reflection

After a real-world interaction or decision, users can record:

- what happened;
- what went differently from expectation;
- what they learned;
- what the assistant should remember;
- what should be avoided in future advice.

### Export Data

The export function supports local research data download for pilot-study preparation.

Current export data may include:

| Data Type | Description |
|---|---|
| Participant ID | A local identifier for pilot-study data. |
| Interaction episodes | User-created decision or interaction cases. |
| Deliberation outputs | AI-generated structured reflection outputs. |
| Memory items | Longitudinal memory records stored in localStorage. |
| Feedback records | User feedback on AI outputs. |
| Reflection records | Post-interaction reflections. |
| Debug logs | Audit trail for transparency. |
| Baseline sessions | Baseline assistant records for comparison. |
| Timestamps | Local timestamps for exported records. |

No backend database is currently used. Data is stored locally in the user’s browser.

### Debug / Audit Trail

The debug page is intended to make the assistant’s internal process more inspectable.

It may include:

- user input;
- retrieved memory;
- constructed prompt;
- mock LLM response;
- parsed output;
- feedback records;
- memory writes.

---

## Current Architecture

```text
React / TypeScript Frontend
        ↓
CoEvoTalk Interaction Pages
        ↓
Mock LLM Deliberation Module
        ↓
localStorage-based Data Layer
        ↓
Episodes / Memories / Feedback / Reflections / Debug Logs
        ↓
Client-side JSON / CSV Export
```

---

## Technology Stack

| Layer | Tool |
|---|---|
| Frontend | React |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Storage | Browser localStorage |
| AI Mode | Deterministic Mock LLM |
| Deployment | Static Express server / Cloudflare Pages |

---

## Development

Install dependencies:

```bash
pnpm install
```

Run locally:

```bash
pnpm dev
```

Type check:

```bash
pnpm check
```

Build:

```bash
pnpm build
```

---

## Why Mock LLM?

The current prototype uses a deterministic mock LLM to make the interaction flow transparent, reproducible, and easier to evaluate during early-stage prototyping.

This version is used to demonstrate:

- the human-AI co-evolution loop;
- the what-if deliberation interface;
- the memory and feedback architecture;
- the baseline comparison setup;
- the local research data export workflow.

Real LLM API integration is planned for a later phase after the interaction design and study workflow are stabilized.

---

## Ethics and Safety Scope

CoEvoTalk is designed for reflective preparation and post-interaction learning.

It should not be used as:

- psychological therapy;
- legal advice;
- employment guarantee;
- crisis intervention;
- manipulative communication training.

Users should avoid entering real names, real companies, or sensitive personal information. In the current version, data is stored locally in the browser.

The assistant is intended to help users clarify assumptions, compare options, and reflect on past decisions, while keeping final judgment and responsibility with the user.

---

## Potential Study Design

A future pilot study may compare two conditions:

| Condition | Description |
|---|---|
| Baseline Assistant | Direct advice without memory or what-if deliberation. |
| CoEvoTalk | What-if deliberation with longitudinal memory and feedback-based adaptation. |

Potential evaluation dimensions include:

| Dimension | Description |
|---|---|
| Reflection depth | Whether users consider deeper assumptions, risks, and alternatives. |
| Assumption coverage | Whether more hidden assumptions are surfaced. |
| Perspective diversity | Whether users consider more stakeholders and viewpoints. |
| Perceived agency | Whether users feel they still own the final decision. |
| Decision confidence | Whether users feel clearer about their next step. |
| Cognitive load | Whether the system helps or overwhelms users. |
| Trust calibration | Whether users appropriately trust or question AI outputs. |
| Memory usefulness | Whether retrieved memories help future decisions. |
| Decision rationale traceability | Whether users can reconstruct why a decision was made. |

---

## Possible Design Implications

Future analysis may explore design implications such as:

### 1. Expand before recommending

Personal AI assistants should help users externalize assumptions and alternatives before giving direct advice.

### 2. Question before assuming

When goals, constraints, or evidence are incomplete, the assistant should ask targeted clarification questions.

### 3. Remember evidence, not just outcomes

Long-term memory should preserve reasons, constraints, and falsified assumptions, not only final decisions.

### 4. Keep memory inspectable

Users should be able to inspect and correct what the assistant remembers.

### 5. Support agency, not dependency

The assistant should help users think more clearly without replacing their judgment.

---

## Project Positioning

CoEvoTalk is not intended to be a complete commercial product at this stage.

It is best understood as:

- an early HCI research prototype;
- a concrete RA collaboration seed;
- a pilot-study preparation tool;
- a starting point for studying self-evolving personal AI assistants.

The next step is not to make the assistant more general, but to make the research question, interaction mechanism, and user evaluation more rigorous.

---

## Future Work

- refine the full feedback taxonomy;
- implement editable memory controls;
- verify and polish the end-to-end sample scenario flow;
- integrate a real LLM API;
- design and conduct formative interviews;
- run a pilot comparison study;
- improve privacy and data handling;
- develop stronger design implications for HCI publication.
