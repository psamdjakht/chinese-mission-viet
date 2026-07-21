"use client";

import { scenarios } from "@/lib/data/scenarios";
import { getLessonGuide } from "@/lib/data/lesson-guides";
import { extendedKnowledgePacks } from "@/lib/data/extended-knowledge";
import { getSlotItem, setSlotItem } from "@/lib/slots";
import { recordStudyActivity } from "@/lib/storage";
import { getScenarioNameVi } from "@/lib/i18n/vi";

const SRS_KEY = "chinese-mission-srs-v1";

export type ReviewRating = "again" | "hard" | "good" | "easy";
export type ReviewCardKind = "vocabulary" | "sentence" | "mistake" | "example";

export interface ReviewCard {
  id: string;
  sourceId: string;
  sourceTitleVi: string;
  sourceType: "scenario" | "knowledge";
  kind: ReviewCardKind;
  frontVi: string;
  hanzi: string;
  pinyin?: string;
  answerVi: string;
  noteVi?: string;
}

export interface ReviewState {
  cardId: string;
  repetitions: number;
  intervalDays: number;
  ease: number;
  lapses: number;
  dueAt: string;
  lastReviewedAt?: string;
  lastRating?: ReviewRating;
}

export interface SrsStore {
  version: 1;
  states: Record<string, ReviewState>;
  reviewCount: number;
  lastReviewedAt?: string;
}

const defaultStore = (): SrsStore => ({ version: 1, states: {}, reviewCount: 0 });
const addDays = (date: Date, days: number) => new Date(date.getTime() + days * 86_400_000);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function getAllReviewCards(): ReviewCard[] {
  const cards: ReviewCard[] = [];

  for (const scenario of scenarios) {
    const guide = getLessonGuide(scenario.id);
    if (!guide) continue;
    const sourceTitleVi = getScenarioNameVi(scenario);

    guide.vocabulary.forEach((item, index) => {
      cards.push({
        id: `srs:${scenario.id}:v:${index}`,
        sourceId: scenario.id,
        sourceTitleVi,
        sourceType: "scenario",
        kind: "vocabulary",
        frontVi: "Nhớ nghĩa và đọc thành tiếng",
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        answerVi: item.vi,
      });
    });

    guide.sentenceFrames.forEach((item, index) => {
      cards.push({
        id: `srs:${scenario.id}:f:${index}`,
        sourceId: scenario.id,
        sourceTitleVi,
        sourceType: "scenario",
        kind: "sentence",
        frontVi: "Nói nghĩa và hoàn cảnh dùng của khung câu",
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        answerVi: item.vi,
        noteVi: item.noteVi,
      });
    });

    guide.commonMistakes.forEach((item, index) => {
      cards.push({
        id: `srs:${scenario.id}:m:${index}`,
        sourceId: scenario.id,
        sourceTitleVi,
        sourceType: "scenario",
        kind: "mistake",
        frontVi: `Sửa câu chưa tự nhiên: ${item.wrong}`,
        hanzi: item.right,
        answerVi: item.explanationVi,
        noteVi: `Nên nói: ${item.right}`,
      });
    });
  }

  for (const pack of extendedKnowledgePacks) {
    pack.terms.forEach((item, index) => {
      cards.push({
        id: `srs:${pack.id}:t:${index}`,
        sourceId: pack.id,
        sourceTitleVi: pack.titleVi,
        sourceType: "knowledge",
        kind: "vocabulary",
        frontVi: "Nhớ nghĩa và cách dùng",
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        answerVi: item.vi,
        noteVi: item.noteVi,
      });
    });

    pack.patterns.forEach((item, index) => {
      cards.push({
        id: `srs:${pack.id}:p:${index}`,
        sourceId: pack.id,
        sourceTitleVi: pack.titleVi,
        sourceType: "knowledge",
        kind: "sentence",
        frontVi: "Giải thích cấu trúc và tự đặt một ví dụ",
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        answerVi: item.vi,
        noteVi: item.usageVi,
      });
    });

    pack.examples.forEach((item, index) => {
      cards.push({
        id: `srs:${pack.id}:e:${index}`,
        sourceId: pack.id,
        sourceTitleVi: pack.titleVi,
        sourceType: "knowledge",
        kind: "example",
        frontVi: item.contextVi,
        hanzi: item.hanzi,
        pinyin: item.pinyin,
        answerVi: item.vi,
      });
    });

    pack.pitfalls.forEach((item, index) => {
      cards.push({
        id: `srs:${pack.id}:x:${index}`,
        sourceId: pack.id,
        sourceTitleVi: pack.titleVi,
        sourceType: "knowledge",
        kind: "mistake",
        frontVi: `Sửa câu: ${item.wrong}`,
        hanzi: item.right,
        answerVi: item.explanationVi,
        noteVi: `Nên nói: ${item.right}`,
      });
    });
  }

  return cards;
}

export function loadSrsStore(): SrsStore {
  try {
    const parsed = JSON.parse(getSlotItem(SRS_KEY) || "null") as SrsStore | null;
    if (parsed?.version === 1 && parsed.states) return parsed;
  } catch {}
  return defaultStore();
}

export function saveSrsStore(store: SrsStore): void {
  setSlotItem(SRS_KEY, JSON.stringify(store));
}

export function getReviewQueue(limit = 20, sourceId?: string): ReviewCard[] {
  const now = Date.now();
  const store = loadSrsStore();
  const cards = getAllReviewCards().filter((card) => !sourceId || card.sourceId === sourceId);
  const due = cards
    .filter((card) => {
      const state = store.states[card.id];
      return state && new Date(state.dueAt).getTime() <= now;
    })
    .sort((a, b) => new Date(store.states[a.id].dueAt).getTime() - new Date(store.states[b.id].dueAt).getTime());
  const fresh = cards.filter((card) => !store.states[card.id]);
  const remaining = Math.max(0, limit - due.length);
  return [...due.slice(0, limit), ...fresh.slice(0, remaining)];
}

export function gradeReview(cardId: string, rating: ReviewRating): ReviewState {
  const store = loadSrsStore();
  const now = new Date();
  const current: ReviewState = store.states[cardId] || {
    cardId,
    repetitions: 0,
    intervalDays: 0,
    ease: 2.5,
    lapses: 0,
    dueAt: now.toISOString(),
  };

  let repetitions = current.repetitions;
  let intervalDays = current.intervalDays;
  let ease = current.ease;
  let lapses = current.lapses;

  if (rating === "again") {
    repetitions = 0;
    intervalDays = 10 / 1_440;
    ease = clamp(ease - 0.2, 1.3, 3.2);
    lapses += 1;
  } else if (rating === "hard") {
    repetitions = Math.max(1, repetitions + 1);
    intervalDays = current.intervalDays < 1 ? 1 : Math.max(1, current.intervalDays * 1.2);
    ease = clamp(ease - 0.15, 1.3, 3.2);
  } else if (rating === "good") {
    repetitions += 1;
    if (repetitions === 1) intervalDays = 1;
    else if (repetitions === 2) intervalDays = 3;
    else intervalDays = Math.max(4, current.intervalDays * ease);
  } else {
    repetitions += 1;
    ease = clamp(ease + 0.15, 1.3, 3.2);
    if (repetitions === 1) intervalDays = 4;
    else if (repetitions === 2) intervalDays = 7;
    else intervalDays = Math.max(7, current.intervalDays * (ease + 0.3));
  }

  const next: ReviewState = {
    cardId,
    repetitions,
    intervalDays: Number(intervalDays.toFixed(3)),
    ease: Number(ease.toFixed(2)),
    lapses,
    dueAt: addDays(now, intervalDays).toISOString(),
    lastReviewedAt: now.toISOString(),
    lastRating: rating,
  };

  store.states[cardId] = next;
  store.reviewCount += 1;
  store.lastReviewedAt = now.toISOString();
  saveSrsStore(store);
  recordStudyActivity();
  return next;
}

export function getSrsStats() {
  const store = loadSrsStore();
  const cards = getAllReviewCards();
  const now = Date.now();
  const learned = cards.filter((card) => store.states[card.id]).length;
  const due = cards.filter((card) => store.states[card.id] && new Date(store.states[card.id].dueAt).getTime() <= now).length;
  const mature = cards.filter((card) => (store.states[card.id]?.intervalDays || 0) >= 21).length;
  const nextDueAt = cards
    .map((card) => store.states[card.id]?.dueAt)
    .filter((value): value is string => Boolean(value) && new Date(value).getTime() > now)
    .sort()[0];
  return {
    total: cards.length,
    learned,
    due,
    newCards: cards.length - learned,
    mature,
    reviewCount: store.reviewCount,
    nextDueAt,
  };
}

export function resetSrsProgress(): void {
  saveSrsStore(defaultStore());
}
