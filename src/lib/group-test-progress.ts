"use client";

import { getSlotItem, setSlotItem } from "@/lib/slots";
import { recordStudyActivity } from "@/lib/storage";

const TEST_KEY = "chinese-mission-group-tests-v1";

export interface GroupTestAttempt {
  scenarioId: string;
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  answers: Record<string, string>;
  completedAt: string;
}

export interface GroupTestResult {
  scenarioId: string;
  attempts: number;
  bestPercent: number;
  lastPercent: number;
  passed: boolean;
  lastCompletedAt: string;
  history: GroupTestAttempt[];
}

export type GroupTestResultMap = Record<string, GroupTestResult>;

export function getGroupTestResults(): GroupTestResultMap {
  try {
    return JSON.parse(getSlotItem(TEST_KEY) || "{}") as GroupTestResultMap;
  } catch {
    return {};
  }
}

export function saveGroupTestAttempt(attempt: GroupTestAttempt): GroupTestResult {
  const results = getGroupTestResults();
  const current = results[attempt.scenarioId];
  const next: GroupTestResult = {
    scenarioId: attempt.scenarioId,
    attempts: (current?.attempts || 0) + 1,
    bestPercent: Math.max(current?.bestPercent || 0, attempt.percent),
    lastPercent: attempt.percent,
    passed: Boolean(current?.passed || attempt.passed),
    lastCompletedAt: attempt.completedAt,
    history: [...(current?.history || []), attempt].slice(-10),
  };
  results[attempt.scenarioId] = next;
  setSlotItem(TEST_KEY, JSON.stringify(results));
  recordStudyActivity();
  return next;
}
