/**
 * exportStudyData.ts
 * 
 * Research data export module for CoEvoTalk pilot studies.
 * Collects all localStorage data and exports as JSON for analysis.
 * 
 * Includes:
 * - All interaction episodes
 * - All deliberations and feedback
 * - All long-term memories
 * - All reflections
 * - All debug logs
 * - Baseline sessions
 * - Storage statistics
 */

import { getStorageStats, listEpisodes, listMemories, listFeedbackByEpisodeId, getReflectionByEpisodeId, listDebugLogsByEpisodeId } from "./storage";

export interface ResearchDataExport {
  participantId: string;
  appVersion: string;
  exportTimestamp: string;
  exportDateISO: string;
  episodes: any[];
  deliberations: any[];
  memories: any[];
  feedbackRecords: any[];
  reflections: any[];
  debugLogs: any[];
  baselineSessions: any[];
  storageStats: any;
}

/**
 * Collect all research data from localStorage
 */
export function collectResearchData(): ResearchDataExport {
  const participantId = localStorage.getItem("coevotalk_participant_id") || "P001";
  const appVersion = "0.2.0-research-ready";
  const now = new Date();

  // Get main data
  const episodes = listEpisodes();
  const memories = listMemories();
  const feedback: any[] = [];
  const reflections: any[] = [];
  const debugLogs: any[] = [];
  
  // Collect feedback and reflections from all episodes
  episodes.forEach((episode: any) => {
    const episodeFeedback = listFeedbackByEpisodeId(episode.id);
    feedback.push(...episodeFeedback);
    
    const reflection = getReflectionByEpisodeId(episode.id);
    if (reflection) {
      reflections.push(reflection);
    }
    
    const episodeDebugLogs = listDebugLogsByEpisodeId(episode.id);
    debugLogs.push(...episodeDebugLogs);
  });

  // Get baseline sessions from localStorage
  const baselineSessions: any[] = [];
  const baselineSessionsListStr = localStorage.getItem("baseline_sessions_list");
  if (baselineSessionsListStr) {
    try {
      const sessionIds = JSON.parse(baselineSessionsListStr);
      sessionIds.forEach((id: string) => {
        const sessionStr = localStorage.getItem(`baseline_session_${id}`);
        if (sessionStr) {
          baselineSessions.push(JSON.parse(sessionStr));
        }
      });
    } catch (e) {
      console.error("Error parsing baseline sessions:", e);
    }
  }

  // Get deliberations (stored per episode)
  const deliberations: any[] = [];
  episodes.forEach((episode: any) => {
    const delibStr = localStorage.getItem(`coevotalk_deliberation_${episode.id}`);
    if (delibStr) {
      try {
        deliberations.push(JSON.parse(delibStr));
      } catch (e) {
        console.error("Error parsing deliberation:", e);
      }
    }
  });

  const storageStats = getStorageStats();

  return {
    participantId,
    appVersion,
    exportTimestamp: now.toISOString(),
    exportDateISO: now.toISOString(),
    episodes,
    deliberations,
    memories,
    feedbackRecords: feedback,
    reflections,
    debugLogs,
    baselineSessions,
    storageStats,
  };
}

/**
 * Download research data as JSON file
 */
export function downloadResearchDataAsJSON(): void {
  const data = collectResearchData();
  const jsonString = JSON.stringify(data, null, 2);
  
  // Create blob and download
  const blob = new Blob([jsonString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `coevotalk_research_export_${data.participantId}_${new Date().toISOString().split("T")[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get data summary for display
 */
export function getDataSummary() {
  const data = collectResearchData();
  return {
    participantId: data.participantId,
    totalEpisodes: data.episodes.length,
    totalMemories: data.memories.length,
    totalReflections: data.reflections.length,
    totalFeedback: data.feedbackRecords.length,
    totalBaselineSessions: data.baselineSessions.length,
    storageUsed: data.storageStats.totalSize,
    exportTime: data.exportTimestamp,
  };
}
