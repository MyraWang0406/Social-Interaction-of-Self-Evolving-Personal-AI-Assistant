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


#How to Try in 3 Minutes
Open the live demo.
Click Load Sample Scenario.
Select one sample scenario.
Review the generated what-if deliberation.
Try the Baseline Assistant for comparison.
Open Long-Term Memory to inspect stored memories.
Use Export Data to download local research data as JSON or CSV.
Sample Scenario Directions

The prototype currently focuses on reflective career and workplace decisions, including:

regretting a college major choice;
worrying about AI’s impact on entry-level computer science jobs;
reframing humanities-background career options;
recognizing mismatch in a draining work environment;
choosing among stable, growth-oriented, and unstable job offers;
comparing frontend, client-side, testing, operations, embedded, and industrial software paths.

These scenarios are designed for research demonstration only. Users should avoid entering real names, real companies, or sensitive personal information.

Pages and Features
Home

The home page provides entry points for:

New Interaction;
Load Sample Scenario;
Baseline Assistant;
Long-Term Memory;
Export Data.

It also includes a participant ID field for pilot-study preparation.

New Interaction

Users can describe a high-stakes decision or social / workplace interaction. The system collects:

person or role involved;
relationship context;
background situation;
user goal;
concerns;
known evidence;
desired outcome.
Session

The session page presents structured AI deliberation, including:

situation summary;
hidden assumptions;
possible risks;
stakeholder perspectives;
what-if paths;
suggested strategies.

Basic feedback buttons are available. A richer feedback taxonomy is under development.

Baseline Assistant

The baseline assistant provides simple direct advice without:

long-term memory;
what-if deliberation;
multi-perspective analysis;
post-interaction learning.

It is designed as a comparison condition for future pilot studies.

Long-Term Memory

The memory page allows users to view and filter stored memory items.

A richer editable Memory Inspector is still under development. Future versions will support more explicit user control, such as confirming, editing, rejecting, archiving, or deleting memories.

Reflection

After a real-world interaction or decision, users can record what happened, what they learned, and what the assistant should remember for future support.

Export Data

The export function supports local research data download for pilot-study preparation.

Current export data may include:

participant ID;
interaction episodes;
deliberation outputs;
memory items;
feedback records;
reflection records;
debug logs;
baseline sessions;
timestamps.

No backend database is currently used. Data is stored locally in the user’s browser.

Debug / Audit Trail

The debug page is intended to make the assistant’s internal process more inspectable, including:

user input;
retrieved memory;
constructed prompt;
mock LLM response;
parsed output;
feedback records;
memory writes.
Current Architecture
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
Technology Stack
React
TypeScript
Vite
Tailwind CSS
localStorage
Mock LLM module
Static Express server for deployment
Development

Install dependencies:

pnpm install

Run locally:

pnpm dev

Type check:

pnpm check

Build:

pnpm build
Why Mock LLM?

The current prototype uses a deterministic mock LLM to make the interaction flow transparent, reproducible, and easier to evaluate during early-stage prototyping.

This version is used to demonstrate:

the human-AI co-evolution loop;
what-if deliberation interface;
memory and feedback architecture;
baseline comparison setup;
local research data export workflow.

Real LLM API integration is planned for a later phase after the interaction design and study workflow are stabilized.

Ethics and Safety Scope

CoEvoTalk is designed for reflective preparation and post-interaction learning.

It should not be used as:

psychological therapy;
legal advice;
employment guarantee;
crisis intervention;
manipulative communication training.

Users should avoid entering real names, real companies, or sensitive personal information. In the current version, data is stored locally in the browser.

The assistant is intended to help users clarify assumptions, compare options, and reflect on past decisions, while keeping final judgment and responsibility with the user.

Potential Study Design

A future pilot study may compare:

Condition	Description
Baseline Assistant	Direct advice without memory or what-if deliberation
CoEvoTalk	What-if deliberation with longitudinal memory and feedback-based adaptation

Potential evaluation dimensions:

reflection depth;
assumption coverage;
perspective diversity;
perceived agency;
decision confidence;
cognitive load;
trust calibration;
memory usefulness;
decision rationale traceability.
Possible Design Implications

Future analysis may explore design implications such as:

Expand before recommending
Personal AI assistants should help users externalize assumptions and alternatives before giving direct advice.
Question before assuming
When goals, constraints, or evidence are incomplete, the assistant should ask targeted clarification questions.
Remember evidence, not just outcomes
Long-term memory should preserve reasons, constraints, and falsified assumptions, not only final decisions.
Keep memory inspectable
Users should be able to inspect and correct what the assistant remembers.
Support agency, not dependency
The assistant should help users think more clearly without replacing their judgment.
Project Positioning

CoEvoTalk is not intended to be a complete commercial product at this stage.

It is best understood as:

an early HCI research prototype;
a concrete RA collaboration seed;
a pilot-study preparation tool;
a starting point for studying self-evolving personal AI assistants.

The next step is not to make the assistant more general, but to make the research question, interaction mechanism, and user evaluation more rigorous.

Future Work
refine the full feedback taxonomy;
implement editable memory controls;
verify and polish the end-to-end sample scenario flow;
integrate a real LLM API;
design and conduct formative interviews;
run a pilot comparison study;
improve privacy and data handling;
develop stronger design implications for HCI publication.
