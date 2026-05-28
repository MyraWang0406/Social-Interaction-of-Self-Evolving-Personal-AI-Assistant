/**
 * Research Data Export
 * 
 * Export all collected data for research analysis.
 * Supports JSON format for further processing.
 */

import { listEpisodes, listMemories, getDeliberationByEpisodeId, getReflectionByEpisodeId, listFeedbackByEpisodeId, listDebugLogsByEpisodeId } from './storage';
import { listBaselineSessions } from './baselineAssistant';

export interface ResearchDataExport {
  exportDate: string;
  version: string;
  summary: {
    totalInteractions: number;
    totalMemories: number;
    totalReflections: number;
    totalFeedback: number;
    totalBaselineSessions: number;
  };
  coevotalkData: {
    episodes: any[];
    memories: any[];
    deliberations: any[];
    reflections: any[];
    feedback: any[];
    debugLogs: any[];
  };
  baselineData: {
    sessions: any[];
  };
}

/**
 * Collect all research data
 */
export function collectResearchData(): ResearchDataExport {
  const episodes = listEpisodes();
  const memories = listMemories();
  const baselineSessions = listBaselineSessions();

  // Collect deliberations, reflections, feedback, and debug logs
  const deliberations = episodes
    .map(ep => ({
      episodeId: ep.id,
      data: getDeliberationByEpisodeId(ep.id),
    }))
    .filter(d => d.data !== null);

  const reflections = episodes
    .map(ep => ({
      episodeId: ep.id,
      data: getReflectionByEpisodeId(ep.id),
    }))
    .filter(r => r.data !== null);

  const allFeedback = episodes.flatMap(ep => listFeedbackByEpisodeId(ep.id));
  const allDebugLogs = episodes.flatMap(ep => listDebugLogsByEpisodeId(ep.id));

  return {
    exportDate: new Date().toISOString(),
    version: '1.0.0',
    summary: {
      totalInteractions: episodes.length,
      totalMemories: memories.length,
      totalReflections: reflections.length,
      totalFeedback: allFeedback.length,
      totalBaselineSessions: baselineSessions.length,
    },
    coevotalkData: {
      episodes,
      memories,
      deliberations: deliberations.map(d => d.data),
      reflections: reflections.map(r => r.data),
      feedback: allFeedback,
      debugLogs: allDebugLogs,
    },
    baselineData: {
      sessions: baselineSessions,
    },
  };
}

/**
 * Export data as JSON file
 */
export function exportDataAsJSON(): void {
  const data = collectResearchData();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `coevotalk-research-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export data as CSV (simplified format)
 */
export function exportDataAsCSV(): void {
  const episodes = listEpisodes();
  const memories = listMemories();
  const baselineSessions = listBaselineSessions();

  // Create CSV content
  let csv = 'Type,ID,Person,Relationship,Goal,Status,CreatedAt,UpdatedAt\n';

  // Add episodes
  episodes.forEach(ep => {
    csv += `Episode,${ep.id},"${ep.person}","${ep.relationship}","${ep.goal}",${ep.status},${ep.createdAt},${ep.updatedAt}\n`;
  });

  // Add memories
  memories.forEach(mem => {
    csv += `Memory,${mem.id},"${mem.relatedPerson || ''}","${mem.type}","${mem.content}",${mem.confidence},${mem.createdAt},\n`;
  });

  // Add baseline sessions
  baselineSessions.forEach(bs => {
    csv += `Baseline,${bs.id},"${bs.person}","${bs.relationship}","${bs.goal}",,${bs.createdAt},\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `coevotalk-research-data-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Get data summary for display
 */
export function getDataSummary() {
  const episodes = listEpisodes();
  const memories = listMemories();
  const baselineSessions = listBaselineSessions();

  return {
    totalInteractions: episodes.length,
    totalMemories: memories.length,
    totalBaselineSessions: baselineSessions.length,
    completedInteractions: episodes.filter(e => e.status === 'completed').length,
    averageMemoriesPerInteraction: episodes.length > 0 ? (memories.length / episodes.length).toFixed(2) : 0,
  };
}
