/**
 * /memory - Long-Term Memory Management
 * 
 * Displays all stored memories about communication patterns, relationships,
 * and lessons learned. Users can filter, update status, and add new memories.
 */

import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import {
  listMemories,
  saveMemoryItem,
  updateMemoryItem,
} from "@/lib/coevotalk/storage";
import type { MemoryItem, MemoryItemType, MemoryItemStatus } from "@/lib/coevotalk/types";

const MEMORY_TYPES: MemoryItemType[] = [
  "communication_style",
  "relationship_history",
  "recurring_concern",
  "rejected_strategy",
  "confirmed_pattern",
  "unresolved_conflict",
];

const MEMORY_STATUSES: MemoryItemStatus[] = ["active", "uncertain", "outdated", "rejected"];

export default function Memory() {
  const [, navigate] = useLocation();
  const [memories, setMemories] = useState<MemoryItem[]>([]);
  const [filteredMemories, setFilteredMemories] = useState<MemoryItem[]>([]);
  const [filterType, setFilterType] = useState<MemoryItemType | "all">("all");
  const [filterStatus, setFilterStatus] = useState<MemoryItemStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);
  const [newMemory, setNewMemory] = useState({
    type: "communication_style" as MemoryItemType,
    content: "",
    evidence: "",
    confidence: 0.8,
    relatedPerson: "",
  });

  useEffect(() => {
    const mems = listMemories();
    setMemories(mems);
  }, []);

  useEffect(() => {
    let filtered = memories;

    if (filterType !== "all") {
      filtered = filtered.filter((m) => m.type === filterType);
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((m) => m.status === filterStatus);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.content.toLowerCase().includes(term) ||
          m.evidence.some(e => e.toLowerCase().includes(term)) ||
          m.relatedPerson?.toLowerCase().includes(term)
      );
    }

    setFilteredMemories(filtered);
  }, [memories, filterType, filterStatus, searchTerm]);

  const handleAddMemory = () => {
    if (!newMemory.content.trim()) return;

    const memory = saveMemoryItem({
      type: newMemory.type,
      content: newMemory.content,
      evidence: newMemory.evidence ? [newMemory.evidence] : [],
      confidence: newMemory.confidence,
      status: "active",
      relatedPerson: newMemory.relatedPerson || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    setMemories([memory, ...memories]);
    setNewMemory({
      type: "communication_style",
      content: "",
      evidence: "",
      confidence: 0.8,
      relatedPerson: "",
    });
    setShowNewForm(false);
  };

  const handleStatusChange = (memoryId: string, newStatus: MemoryItemStatus) => {
    updateMemoryItem(memoryId, { status: newStatus });
    setMemories(
      memories.map((m) =>
        m.id === memoryId ? { ...m, status: newStatus } : m
      )
    );
  };

  const getTypeColor = (type: MemoryItemType) => {
    const colors: Record<MemoryItemType, string> = {
      communication_style: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      relationship_history: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      recurring_concern: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      rejected_strategy: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      confirmed_pattern: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      unresolved_conflict: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    };
    return colors[type];
  };

  const getStatusColor = (status: MemoryItemStatus) => {
    const colors: Record<MemoryItemStatus, string> = {
      active: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-900",
      uncertain: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-900",
      outdated: "bg-gray-50 border-gray-200 dark:bg-gray-950/20 dark:border-gray-900",
      rejected: "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900",
    };
    return colors[status];
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Long-Term Memory</h1>
              <p className="text-xs text-muted-foreground">
                {filteredMemories.length} of {memories.length} memories
              </p>
            </div>
          </div>
          <Button
            onClick={() => setShowNewForm(!showNewForm)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Memory
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="grid grid-cols-4 gap-6">
          {/* Main Panel */}
          <div className="col-span-3 space-y-6">
            {/* New Memory Form */}
            {showNewForm && (
              <Card className="border-blue-200 dark:border-blue-900">
                <CardHeader>
                  <CardTitle className="text-base">Add New Memory</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="mem-type">Type</Label>
                    <Select
                      value={newMemory.type}
                      onValueChange={(value) =>
                        setNewMemory({ ...newMemory, type: value as MemoryItemType })
                      }
                    >
                      <SelectTrigger id="mem-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {MEMORY_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.replace(/_/g, " ")}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mem-person">Related Person (optional)</Label>
                    <Input
                      id="mem-person"
                      placeholder="e.g., Sarah (my mentor)"
                      value={newMemory.relatedPerson}
                      onChange={(e) =>
                        setNewMemory({ ...newMemory, relatedPerson: e.target.value })
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mem-content">Memory Content</Label>
                    <Textarea
                      id="mem-content"
                      placeholder="What should you remember?"
                      value={newMemory.content}
                      onChange={(e) =>
                        setNewMemory({ ...newMemory, content: e.target.value })
                      }
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mem-evidence">Evidence</Label>
                    <Textarea
                      id="mem-evidence"
                      placeholder="Why do you believe this?"
                      value={newMemory.evidence}
                      onChange={(e) =>
                        setNewMemory({ ...newMemory, evidence: e.target.value })
                      }
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mem-confidence">Confidence</Label>
                    <div className="flex items-center gap-2">
                      <input
                        id="mem-confidence"
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={newMemory.confidence}
                        onChange={(e) =>
                          setNewMemory({
                            ...newMemory,
                            confidence: parseFloat(e.target.value),
                          })
                        }
                        className="flex-1"
                      />
                      <span className="text-sm font-semibold w-12">
                        {(newMemory.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button onClick={handleAddMemory} className="flex-1">
                      Save Memory
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowNewForm(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Memories Grid */}
            <div className="space-y-3">
              {filteredMemories.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      No memories found. {memories.length === 0 && "Start by creating an interaction."}
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredMemories.map((memory) => (
                  <Card
                    key={memory.id}
                    className={`border ${getStatusColor(memory.status)}`}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getTypeColor(memory.type)}>
                              {memory.type.replace(/_/g, " ")}
                            </Badge>
                            {memory.relatedPerson && (
                              <Badge variant="outline">{memory.relatedPerson}</Badge>
                            )}
                            <Badge variant="outline">
                              {(memory.confidence * 100).toFixed(0)}% confident
                            </Badge>
                          </div>
                          <p className="text-foreground font-medium mb-2">
                            {memory.content}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-semibold">Evidence:</span> {memory.evidence}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            Created {new Date(memory.createdAt).toLocaleDateString()}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <Select
                            value={memory.status}
                            onValueChange={(value) =>
                              handleStatusChange(memory.id, value as MemoryItemStatus)
                            }
                          >
                            <SelectTrigger className="w-32 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {MEMORY_STATUSES.map((status) => (
                                <SelectItem key={status} value={status}>
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* Sidebar - Filters */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="search" className="text-sm">
                    Search
                  </Label>
                  <Input
                    id="search"
                    placeholder="Search memories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type-filter" className="text-sm">
                    Type
                  </Label>
                  <Select
                    value={filterType}
                    onValueChange={(value) =>
                      setFilterType(value as MemoryItemType | "all")
                    }
                  >
                    <SelectTrigger id="type-filter" className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      {MEMORY_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status-filter" className="text-sm">
                    Status
                  </Label>
                  <Select
                    value={filterStatus}
                    onValueChange={(value) =>
                      setFilterStatus(value as MemoryItemStatus | "all")
                    }
                  >
                    <SelectTrigger id="status-filter" className="text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      {MEMORY_STATUSES.map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active:</span>
                  <span className="font-semibold">
                    {memories.filter((m) => m.status === "active").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Uncertain:</span>
                  <span className="font-semibold">
                    {memories.filter((m) => m.status === "uncertain").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Outdated:</span>
                  <span className="font-semibold">
                    {memories.filter((m) => m.status === "outdated").length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rejected:</span>
                  <span className="font-semibold">
                    {memories.filter((m) => m.status === "rejected").length}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
