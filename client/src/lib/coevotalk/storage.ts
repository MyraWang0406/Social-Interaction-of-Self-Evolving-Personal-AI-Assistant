/**
 * CoEvoTalk Storage Layer
 * 
 * Manages persistence of all data structures using localStorage.
 * First version uses simple key-value storage; no database.
 */

import { nanoid } from "nanoid";
import type {
  InteractionEpisode,
  MemoryItem,
  DeliberationOutput,
  ReflectionRecord,
  FeedbackRecord,
  DebugLog,
  CoEvoTalkStorage,
} from "./types";

const STORAGE_KEY = "coevotalk_data";

/**
 * Initialize or retrieve the storage object from localStorage.
 */
function getStorage(): CoEvoTalkStorage {
  if (typeof window === "undefined") {
    return {
      episodes: {},
      memories: {},
      deliberations: {},
      reflections: {},
      feedbackRecords: {},
      debugLogs: {},
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return {
      episodes: {},
      memories: {},
      deliberations: {},
      reflections: {},
      feedbackRecords: {},
      debugLogs: {},
    };
  }

  try {
    return JSON.parse(stored);
  } catch {
    console.error("Failed to parse storage, returning empty storage");
    return {
      episodes: {},
      memories: {},
      deliberations: {},
      reflections: {},
      feedbackRecords: {},
      debugLogs: {},
    };
  }
}

/**
 * Save the storage object back to localStorage.
 */
function saveStorage(storage: CoEvoTalkStorage): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

// ============================================================================
// EPISODE OPERATIONS
// ============================================================================

export function createEpisode(
  input: Omit<InteractionEpisode, "id" | "createdAt" | "updatedAt" | "status">
): InteractionEpisode {
  const storage = getStorage();
  const now = new Date().toISOString();
  const episode: InteractionEpisode = {
    ...input,
    id: nanoid(),
    createdAt: now,
    updatedAt: now,
    status: "draft",
  };
  storage.episodes[episode.id] = episode;
  saveStorage(storage);
  return episode;
}

export function getEpisodeById(id: string): InteractionEpisode | null {
  const storage = getStorage();
  return storage.episodes[id] || null;
}

export function listEpisodes(): InteractionEpisode[] {
  const storage = getStorage();
  return Object.values(storage.episodes).sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function updateEpisodeStatus(
  id: string,
  status: InteractionEpisode["status"]
): void {
  const storage = getStorage();
  const episode = storage.episodes[id];
  if (episode) {
    episode.status = status;
    episode.updatedAt = new Date().toISOString();
    saveStorage(storage);
  }
}

// ============================================================================
// DELIBERATION OPERATIONS
// ============================================================================

export function saveDeliberation(
  episodeId: string,
  deliberation: DeliberationOutput
): void {
  const storage = getStorage();
  storage.deliberations[episodeId] = deliberation;
  // Update episode status to "ready"
  if (storage.episodes[episodeId]) {
    storage.episodes[episodeId].status = "ready";
    storage.episodes[episodeId].updatedAt = new Date().toISOString();
  }
  saveStorage(storage);
}

export function getDeliberationByEpisodeId(
  episodeId: string
): DeliberationOutput | null {
  const storage = getStorage();
  return storage.deliberations[episodeId] || null;
}

// ============================================================================
// MEMORY OPERATIONS
// ============================================================================

export function listMemories(): MemoryItem[] {
  const storage = getStorage();
  return Object.values(storage.memories).sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export function saveMemoryItem(memory: Omit<MemoryItem, "id">): MemoryItem {
  const storage = getStorage();
  const item: MemoryItem = {
    ...memory,
    id: nanoid(),
  };
  storage.memories[item.id] = item;
  saveStorage(storage);
  return item;
}

export function updateMemoryItem(id: string, updates: Partial<MemoryItem>): void {
  const storage = getStorage();
  const memory = storage.memories[id];
  if (memory) {
    Object.assign(memory, updates, {
      updatedAt: new Date().toISOString(),
    });
    saveStorage(storage);
  }
}

export function getMemoryById(id: string): MemoryItem | null {
  const storage = getStorage();
  return storage.memories[id] || null;
}

/**
 * Retrieve relevant memories for a given episode.
 * First version uses simple keyword matching.
 */
export function retrieveRelevantMemories(
  episode: InteractionEpisode,
  limit: number = 10
): MemoryItem[] {
  const storage = getStorage();
  const allMemories = Object.values(storage.memories);

  // Score each memory based on relevance
  const scored = allMemories.map((memory) => {
    let score = 0;

    // Exact person match: highest priority
    if (memory.relatedPerson?.toLowerCase() === episode.person.toLowerCase()) {
      score += 100;
    }

    // Relationship match
    if (
      memory.content.toLowerCase().includes(episode.relationship.toLowerCase())
    ) {
      score += 50;
    }

    // Keyword matching in content
    const keywords = [
      ...episode.concerns,
      ...episode.knownEvidence,
      episode.goal,
      episode.context,
    ].filter(Boolean);

    for (const keyword of keywords) {
      if (keyword.toLowerCase().includes(memory.content.toLowerCase())) {
        score += 10;
      }
      if (memory.content.toLowerCase().includes(keyword.toLowerCase())) {
        score += 10;
      }
    }

    // Status preference: active > uncertain > outdated > rejected
    if (memory.status === "active") score += 5;
    if (memory.status === "uncertain") score += 2;
    if (memory.status === "outdated") score -= 5;
    if (memory.status === "rejected") score -= 10;

    return { memory, score };
  });

  // Sort by score and return top N
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.memory);
}

// ============================================================================
// REFLECTION OPERATIONS
// ============================================================================

export function saveReflection(reflection: Omit<ReflectionRecord, "id">): ReflectionRecord {
  const storage = getStorage();
  const record: ReflectionRecord = {
    ...reflection,
    id: nanoid(),
  };
  storage.reflections[record.id] = record;
  // Update episode status to "completed"
  if (storage.episodes[reflection.episodeId]) {
    storage.episodes[reflection.episodeId].status = "completed";
    storage.episodes[reflection.episodeId].updatedAt = new Date().toISOString();
  }
  saveStorage(storage);
  return record;
}

export function getReflectionByEpisodeId(
  episodeId: string
): ReflectionRecord | null {
  const storage = getStorage();
  const reflections = Object.values(storage.reflections);
  return reflections.find((r) => r.episodeId === episodeId) || null;
}

// ============================================================================
// FEEDBACK OPERATIONS
// ============================================================================

export function saveFeedback(feedback: Omit<FeedbackRecord, "id">): FeedbackRecord {
  const storage = getStorage();
  const record: FeedbackRecord = {
    ...feedback,
    id: nanoid(),
  };
  storage.feedbackRecords[record.id] = record;
  saveStorage(storage);
  return record;
}

export function listFeedbackByEpisodeId(episodeId: string): FeedbackRecord[] {
  const storage = getStorage();
  return Object.values(storage.feedbackRecords)
    .filter((f) => f.episodeId === episodeId)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

// ============================================================================
// DEBUG LOG OPERATIONS
// ============================================================================

export function saveDebugLog(log: Omit<DebugLog, "id">): DebugLog {
  const storage = getStorage();
  const record: DebugLog = {
    ...log,
    id: nanoid(),
  };

  if (!storage.debugLogs[log.episodeId]) {
    storage.debugLogs[log.episodeId] = [];
  }
  storage.debugLogs[log.episodeId].push(record);
  saveStorage(storage);
  return record;
}

export function listDebugLogsByEpisodeId(episodeId: string): DebugLog[] {
  const storage = getStorage();
  return storage.debugLogs[episodeId] || [];
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Clear all data (for testing/reset).
 */
export function clearAllData(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Export all data as JSON (for debugging/backup).
 */
export function exportAllData(): string {
  const storage = getStorage();
  return JSON.stringify(storage, null, 2);
}

/**
 * Get storage statistics.
 */
export function getStorageStats() {
  const storage = getStorage();
  return {
    episodes: Object.keys(storage.episodes).length,
    memories: Object.keys(storage.memories).length,
    deliberations: Object.keys(storage.deliberations).length,
    reflections: Object.keys(storage.reflections).length,
    feedbackRecords: Object.keys(storage.feedbackRecords).length,
    debugLogs: Object.values(storage.debugLogs).reduce((sum, logs) => sum + logs.length, 0),
  };
}
