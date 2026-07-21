import { scenarios } from "@/lib/data/scenarios";
import { getLessonGuide } from "@/lib/data/lesson-guides";
import { getScenarioNameVi } from "@/lib/i18n/vi";

export interface GroupTestOption {
  id: string;
  text: string;
  lang?: "zh" | "vi";
}

export interface GroupTestQuestion {
  id: string;
  skillVi: string;
  promptVi: string;
  stemHanzi?: string;
  stemPinyin?: string;
  options: GroupTestOption[];
  correctId: string;
  explanationVi: string;
}

export interface GroupTest {
  scenarioId: string;
  titleVi: string;
  descriptionVi: string;
  missionIds: string[];
  passScore: number;
  questions: GroupTestQuestion[];
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)));
}

function options(correct: string, distractors: string[], seed: number, lang: "zh" | "vi" = "vi"): { options: GroupTestOption[]; correctId: string } {
  const values = unique([correct, ...distractors]).slice(0, 4);
  while (values.length < 4) values.push(`Phương án ${values.length + 1}`);
  const correctIndex = seed % values.length;
  const withoutCorrect = values.filter((value) => value !== correct);
  const ordered = [...withoutCorrect];
  ordered.splice(correctIndex, 0, correct);
  const answerId = `o${correctIndex}`;
  return {
    options: ordered.map((text, index) => ({ id: `o${index}`, text, lang })),
    correctId: answerId,
  };
}

function getOtherGuideItems<T>(scenarioId: string, pick: (scenarioId: string) => T[]): T[] {
  return scenarios
    .filter((scenario) => scenario.id !== scenarioId)
    .flatMap((scenario) => pick(scenario.id))
    .filter(Boolean);
}

export function getGroupTest(scenarioId: string): GroupTest | undefined {
  const scenario = scenarios.find((item) => item.id === scenarioId);
  const guide = getLessonGuide(scenarioId);
  if (!scenario || !guide) return undefined;

  const questions: GroupTestQuestion[] = [];
  const vocabulary = guide.vocabulary;
  const frames = guide.sentenceFrames;
  const mistakes = guide.commonMistakes;
  const learnerTurns = guide.dialogue.filter((turn) => turn.speakerVi === "Bạn");
  const allOtherPragmatics = getOtherGuideItems(scenarioId, (id) => getLessonGuide(id)?.pragmatics || []);
  const allOtherPronunciation = getOtherGuideItems(scenarioId, (id) => getLessonGuide(id)?.pronunciationFocus || []);

  vocabulary.slice(0, 3).forEach((item, index) => {
    const built = options(
      item.vi,
      vocabulary.filter((_, itemIndex) => itemIndex !== index).map((candidate) => candidate.vi),
      index,
      "vi",
    );
    questions.push({
      id: `${scenarioId}-v-meaning-${index}`,
      skillVi: "Từ vựng: nhận biết nghĩa",
      promptVi: "Cụm từ sau có nghĩa phù hợp nhất là gì?",
      stemHanzi: item.hanzi,
      stemPinyin: item.pinyin,
      ...built,
      explanationVi: `${item.hanzi} (${item.pinyin}) nghĩa là “${item.vi}”.`,
    });
  });

  vocabulary.slice(3, 5).forEach((item, index) => {
    const built = options(
      item.hanzi,
      vocabulary.filter((candidate) => candidate.hanzi !== item.hanzi).map((candidate) => candidate.hanzi),
      index + 3,
      "zh",
    );
    questions.push({
      id: `${scenarioId}-v-production-${index}`,
      skillVi: "Từ vựng: chọn cách nói",
      promptVi: `Cách nói tiếng Trung phù hợp nhất cho “${item.vi}” là gì?`,
      ...built,
      explanationVi: `“${item.vi}” được diễn đạt bằng ${item.hanzi} (${item.pinyin}).`,
    });
  });

  const frame = frames[0];
  if (frame) {
    const built = options(frame.hanzi, frames.slice(1).map((item) => item.hanzi), 6, "zh");
    questions.push({
      id: `${scenarioId}-frame`,
      skillVi: "Khung câu thực tế",
      promptVi: `${frame.noteVi} Chọn khung câu phù hợp nhất.`,
      ...built,
      explanationVi: `${frame.hanzi} — ${frame.vi}. ${frame.noteVi}`,
    });
  }

  const mistake = mistakes[0];
  if (mistake) {
    const built = options(
      mistake.right,
      unique([mistake.wrong, ...mistakes.slice(1).flatMap((item) => [item.wrong, item.right])]),
      7,
      "zh",
    );
    questions.push({
      id: `${scenarioId}-mistake`,
      skillVi: "Sửa lỗi thường gặp",
      promptVi: `Câu nào tự nhiên và đúng hơn để thay cho “${mistake.wrong}”?`,
      ...built,
      explanationVi: `${mistake.explanationVi} Nên nói: ${mistake.right}.`,
    });
  }

  const learnerTurn = learnerTurns[0];
  if (learnerTurn) {
    const turnIndex = guide.dialogue.findIndex((turn) => turn === learnerTurn);
    const previousTurn = turnIndex > 0 ? guide.dialogue[turnIndex - 1] : undefined;
    const built = options(
      learnerTurn.hanzi,
      unique([
        ...learnerTurns.slice(1).map((turn) => turn.hanzi),
        ...frames.map((item) => item.hanzi),
      ]),
      8,
      "zh",
    );
    questions.push({
      id: `${scenarioId}-dialogue`,
      skillVi: "Phản xạ hội thoại",
      promptVi: previousTurn
        ? `${previousTurn.speakerVi} nói: “${previousTurn.hanzi}” (${previousTurn.vi}). Bạn nên đáp thế nào theo đúng tình huống?`
        : "Chọn câu phản hồi phù hợp nhất với tình huống của nhóm.",
      ...built,
      explanationVi: `${learnerTurn.hanzi} (${learnerTurn.pinyin}) — ${learnerTurn.vi}`,
    });
  }

  const pragmatic = guide.pragmatics[0];
  if (pragmatic) {
    const built = options(pragmatic, allOtherPragmatics.slice(0, 6), 9, "vi");
    questions.push({
      id: `${scenarioId}-pragmatic`,
      skillVi: "Cách dùng và phép lịch sự",
      promptVi: "Lời khuyên nào phù hợp trực tiếp nhất với nhóm tình huống này?",
      ...built,
      explanationVi: pragmatic,
    });
  }

  const pronunciation = guide.pronunciationFocus[0];
  if (pronunciation) {
    const built = options(pronunciation, allOtherPronunciation.slice(0, 6), 10, "vi");
    questions.push({
      id: `${scenarioId}-pronunciation`,
      skillVi: "Phát âm và biến điệu",
      promptVi: "Trọng điểm phát âm nào thuộc nội dung của nhóm này?",
      ...built,
      explanationVi: pronunciation,
    });
  }

  const scenarioNameVi = getScenarioNameVi(scenario);
  return {
    scenarioId,
    titleVi: `Kiểm tra tổng hợp: ${scenarioNameVi}`,
    descriptionVi: `10 câu kiểm tra bám sát từ vựng, khung câu, lỗi thường gặp, phản xạ hội thoại và phát âm của nhóm ${scenarioNameVi}.`,
    missionIds: scenario.missions.map((mission) => mission.id),
    passScore: 80,
    questions: questions.slice(0, 10),
  };
}

export function getAllGroupTests(): GroupTest[] {
  return scenarios.map((scenario) => getGroupTest(scenario.id)).filter((test): test is GroupTest => Boolean(test));
}
