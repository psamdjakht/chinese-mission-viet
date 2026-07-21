"use client";

import { getSlotItem, setSlotItem } from "@/lib/slots";
import { recordStudyActivity } from "@/lib/storage";

const KNOWLEDGE_KEY = "chinese-mission-knowledge-completed-v1";

export function getCompletedKnowledgeIds(): string[] {
  try {
    const parsed = JSON.parse(getSlotItem(KNOWLEDGE_KEY) || "[]") as string[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function setKnowledgeCompleted(id: string, completed: boolean): string[] {
  const current = new Set(getCompletedKnowledgeIds());
  if (completed) current.add(id);
  else current.delete(id);
  const next = Array.from(current);
  setSlotItem(KNOWLEDGE_KEY, JSON.stringify(next));
  if (completed) recordStudyActivity();
  return next;
}
