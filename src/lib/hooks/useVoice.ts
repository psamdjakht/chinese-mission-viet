"use client";
import { useState, useCallback, useRef, useEffect } from "react";

interface SpeechRecognitionEventShim {
  results: SpeechRecognitionResultList;
  resultIndex?: number;
}

interface SpeechRecognitionShim extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives?: number;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEventShim) => void) | null;
  onerror: ((event: { error: string; message?: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  stop(): void;
  abort(): void;
}

interface UseVoiceOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  voice?: "female" | "male" | "professional" | "youth";
  onResult?: (transcript: string) => void;
  onError?: (error: string) => void;
}

interface UseVoiceReturn {
  speak: (text: string, lang?: string) => Promise<void>;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  ttsSupported: boolean;
  ttsEngine: "edge" | "browser" | "none";
  startListening: () => Promise<void>;
  stopListening: () => Promise<string>;
  isListening: boolean;
  transcript: string;
  asrSupported: boolean;
  asrEngine: "native" | "browser" | "none";
}

let activeTtsCancel: (() => void) | null = null;

function isCapacitorNative(): boolean {
  if (typeof window === "undefined") return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cap = (window as any).Capacitor;
  if (!cap || typeof cap.isNativePlatform !== "function" || !cap.isNativePlatform()) return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return "SpeechRecognition" in (cap.Plugins || {} as any);
}

export function useVoice(options: UseVoiceOptions = {}): UseVoiceReturn {
  const { lang = "zh-CN", rate = 0.9, voice = "female", onResult, onError } = options;
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef<SpeechRecognitionShim | null>(null);
  const latestTranscriptRef = useRef("");
  const lastDeliveredRef = useRef("");
  const stopResolverRef = useRef<((text: string) => void) | null>(null);
  const stopFallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);
  const audioDoneRef = useRef<(() => void) | null>(null);
  const utteranceDoneRef = useRef<(() => void) | null>(null);
  const speechRunRef = useRef(0);
  const ownerRef = useRef<symbol | null>(null);

  const browserTtsSupported = typeof window !== "undefined" && "speechSynthesis" in window;
  const ttsSupported = typeof window !== "undefined";
  const ttsEngine: UseVoiceReturn["ttsEngine"] = ttsSupported ? "edge" : "none";

  const settleAudio = useCallback(() => {
    const done = audioDoneRef.current;
    audioDoneRef.current = null;
    done?.();
  }, []);

  const cleanupAudio = useCallback(() => {
    const audio = audioRef.current;
    audioRef.current = null;
    if (audio) {
      audio.onended = null;
      audio.onerror = null;
      audio.pause();
      audio.src = "";
    }
    if (audioUrlRef.current) {
      URL.revokeObjectURL(audioUrlRef.current);
      audioUrlRef.current = null;
    }
    settleAudio();
  }, [settleAudio]);

  const settleUtterance = useCallback(() => {
    const done = utteranceDoneRef.current;
    utteranceDoneRef.current = null;
    done?.();
  }, []);

  const cancelLocalSpeech = useCallback(() => {
    speechRunRef.current += 1;
    cleanupAudio();
    if (browserTtsSupported) window.speechSynthesis.cancel();
    settleUtterance();
    setIsSpeaking(false);
  }, [browserTtsSupported, cleanupAudio, settleUtterance]);

  const browserSpeak = useCallback(async (text: string, overrideLang?: string) => {
    if (!browserTtsSupported || !text) return;
    await new Promise<void>((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        utteranceDoneRef.current = null;
        resolve();
      };
      utteranceDoneRef.current = finish;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = overrideLang || lang;
      utterance.rate = rate;
      const voices = window.speechSynthesis.getVoices();
      const chineseVoice = voices.find((item) => item.lang === "zh-CN") || voices.find((item) => item.lang.startsWith("zh"));
      if (chineseVoice) utterance.voice = chineseVoice;
      utterance.onend = finish;
      utterance.onerror = finish;
      window.speechSynthesis.speak(utterance);
    });
  }, [browserTtsSupported, lang, rate]);

  const speak = useCallback(async (text: string, overrideLang?: string) => {
    if (!text || typeof window === "undefined") return;
    activeTtsCancel?.();
    const owner = Symbol("tts");
    ownerRef.current = owner;
    const runId = ++speechRunRef.current;
    const cancel = () => {
      if (ownerRef.current !== owner) return;
      cancelLocalSpeech();
      ownerRef.current = null;
      if (activeTtsCancel === cancel) activeTtsCancel = null;
    };
    activeTtsCancel = cancel;
    setIsSpeaking(true);

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voice, rate }),
      });
      if (runId !== speechRunRef.current) return;
      if (!response.ok) throw new Error(`TTS HTTP ${response.status}`);
      const blob = await response.blob();
      if (!blob.size) throw new Error("Empty audio blob");
      const url = URL.createObjectURL(blob);
      audioUrlRef.current = url;
      const audio = new Audio(url);
      audioRef.current = audio;
      await new Promise<void>((resolve, reject) => {
        let settled = false;
        const finish = () => {
          if (settled) return;
          settled = true;
          audioDoneRef.current = null;
          resolve();
        };
        audioDoneRef.current = finish;
        audio.onended = finish;
        audio.onerror = () => {
          if (settled) return;
          settled = true;
          audioDoneRef.current = null;
          reject(new Error("Không phát được âm thanh TTS."));
        };
        audio.play().catch(reject);
      });
    } catch (error) {
      if (runId !== speechRunRef.current) return;
      console.warn("Edge TTS failed, falling back to browser:", error);
      cleanupAudio();
      await browserSpeak(text, overrideLang);
    } finally {
      if (runId === speechRunRef.current) {
        cleanupAudio();
        setIsSpeaking(false);
        ownerRef.current = null;
        if (activeTtsCancel === cancel) activeTtsCancel = null;
      }
    }
  }, [browserSpeak, cancelLocalSpeech, cleanupAudio, rate, voice]);

  const stopSpeaking = useCallback(() => {
    if (ownerRef.current && activeTtsCancel) activeTtsCancel();
    else cancelLocalSpeech();
  }, [cancelLocalSpeech]);

  const browserAsrSupported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);
  const nativeAsrSupported = isCapacitorNative();
  const asrSupported = browserAsrSupported || nativeAsrSupported;
  const asrEngine: UseVoiceReturn["asrEngine"] = nativeAsrSupported ? "native" : browserAsrSupported ? "browser" : "none";

  const publishTranscript = useCallback((text: string) => {
    const cleaned = text.trim();
    latestTranscriptRef.current = cleaned;
    setTranscript(cleaned);
    if (cleaned && cleaned !== lastDeliveredRef.current) {
      lastDeliveredRef.current = cleaned;
      onResult?.(cleaned);
    }
  }, [onResult]);

  const finishListening = useCallback((text?: string) => {
    const finalText = (text || latestTranscriptRef.current).trim();
    if (stopFallbackTimerRef.current) clearTimeout(stopFallbackTimerRef.current);
    stopFallbackTimerRef.current = null;
    recognitionRef.current = null;
    setIsListening(false);
    if (finalText) publishTranscript(finalText);
    const resolver = stopResolverRef.current;
    stopResolverRef.current = null;
    resolver?.(finalText);
    return finalText;
  }, [publishTranscript]);

  const startNativeListening = useCallback(async () => {
    try {
      activeTtsCancel?.();
      const mod = await import("@capacitor-community/speech-recognition");
      const SpeechRecognition = mod.SpeechRecognition;
      const permission = await SpeechRecognition.checkPermissions();
      if (permission.speechRecognition !== "granted") {
        const requested = await SpeechRecognition.requestPermissions();
        if (requested.speechRecognition !== "granted") throw new Error("Bạn chưa cấp quyền sử dụng micro.");
      }
      latestTranscriptRef.current = "";
      lastDeliveredRef.current = "";
      setTranscript("");
      setIsListening(true);
      await SpeechRecognition.removeAllListeners();
      await SpeechRecognition.addListener("partialResults", (data: { matches?: string[] }) => {
        const text = data.matches?.[0]?.trim() || "";
        if (text) {
          latestTranscriptRef.current = text;
          setTranscript(text);
        }
      });
      const result = await SpeechRecognition.start({ language: lang, maxResults: 3, prompt: "请说中文", partialResults: true, popup: false });
      finishListening(result?.matches?.[0] || latestTranscriptRef.current);
    } catch (error) {
      setIsListening(false);
      const message = error instanceof Error ? error.message : String(error);
      onError?.(message);
    }
  }, [finishListening, lang, onError]);

  const stopNativeListening = useCallback(async () => {
    try {
      const mod = await import("@capacitor-community/speech-recognition");
      await mod.SpeechRecognition.stop();
    } catch (error) {
      console.warn("Native ASR stop error:", error);
    }
    return finishListening();
  }, [finishListening]);

  const startBrowserListening = useCallback(async () => {
    activeTtsCancel?.();
    if (recognitionRef.current) recognitionRef.current.abort();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const browserWindow = window as any;
    const SpeechRecognitionAPI = browserWindow.SpeechRecognition || browserWindow.webkitSpeechRecognition;
    if (!SpeechRecognitionAPI) throw new Error("Trình duyệt chưa hỗ trợ nhận giọng nói.");

    latestTranscriptRef.current = "";
    lastDeliveredRef.current = "";
    setTranscript("");
    const recognition: SpeechRecognitionShim = new SpeechRecognitionAPI();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 3;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      let finalText = "";
      let interimText = "";
      const startIndex = event.resultIndex || 0;
      for (let index = startIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const text = result[0]?.transcript || "";
        if (result.isFinal) finalText += text;
        else interimText += text;
      }
      const current = (finalText || interimText).trim();
      if (current) {
        latestTranscriptRef.current = current;
        setTranscript(current);
      }
      if (finalText.trim()) publishTranscript(finalText);
    };
    recognition.onerror = (event) => {
      const ignored = event.error === "aborted";
      if (!ignored) onError?.(event.error || event.message || "Không nhận được giọng nói.");
      finishListening();
    };
    recognition.onend = () => finishListening();
    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (error) {
      recognitionRef.current = null;
      setIsListening(false);
      throw error;
    }
  }, [finishListening, lang, onError, publishTranscript]);

  const stopBrowserListening = useCallback(async () => {
    const recognition = recognitionRef.current;
    if (!recognition) return finishListening();
    return await new Promise<string>((resolve) => {
      stopResolverRef.current = resolve;
      stopFallbackTimerRef.current = setTimeout(() => resolve(finishListening()), 1600);
      try {
        recognition.stop();
      } catch {
        resolve(finishListening());
      }
    });
  }, [finishListening]);

  const startListening = useCallback(async () => {
    try {
      if (nativeAsrSupported) await startNativeListening();
      else if (browserAsrSupported) await startBrowserListening();
      else throw new Error("Thiết bị hoặc trình duyệt chưa hỗ trợ nhận giọng nói.");
    } catch (error) {
      setIsListening(false);
      onError?.(error instanceof Error ? error.message : String(error));
    }
  }, [browserAsrSupported, nativeAsrSupported, onError, startBrowserListening, startNativeListening]);

  const stopListening = useCallback(async () => {
    return nativeAsrSupported ? await stopNativeListening() : await stopBrowserListening();
  }, [nativeAsrSupported, stopBrowserListening, stopNativeListening]);

  useEffect(() => () => {
    cancelLocalSpeech();
    if (recognitionRef.current) recognitionRef.current.abort();
    if (stopFallbackTimerRef.current) clearTimeout(stopFallbackTimerRef.current);
  }, [cancelLocalSpeech]);

  return { speak, stopSpeaking, isSpeaking, ttsSupported, ttsEngine, startListening, stopListening, isListening, transcript, asrSupported, asrEngine };
}
