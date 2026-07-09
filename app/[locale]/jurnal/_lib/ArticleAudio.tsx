"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Locale } from "./types";

/* Player audio pentru articol.
   — Dacă există un MP3 premium (audioUrl), redă fișierul (voce neuronală Azure/ElevenLabs).
   — Altfel, nu se afișează nimic (vocea de browser e prea slabă pentru brand);
     poate fi reactivată cu allowBrowserVoice={true}. */

type Status = "idle" | "playing" | "paused";

export function ArticleAudio({
  text,
  locale,
  audioUrl,
  minutes,
  allowBrowserVoice = false,
}: {
  text: string;
  locale: Locale;
  audioUrl?: string;
  minutes?: number;
  allowBrowserVoice?: boolean;
}) {
  const isRo = locale === "ro";
  const L = {
    listen: isRo ? "Ascultă articolul" : "Listen to the article",
    playing: isRo ? "Se redă" : "Playing",
    paused: isRo ? "În pauză" : "Paused",
    min: "min",
    voice: isRo ? "voce generată" : "generated voice",
  };

  /* ── Vocea browserului (fallback opțional) — toate hook-urile rulează mereu ── */
  const [status, setStatus] = useState<Status>("idle");
  const [ttsOk, setTtsOk] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const keepRef = useRef<number | null>(null);

  const stopKeep = () => {
    if (keepRef.current) {
      clearInterval(keepRef.current);
      keepRef.current = null;
    }
  };
  const startKeep = () => {
    stopKeep();
    keepRef.current = window.setInterval(() => {
      const s = window.speechSynthesis;
      if (s.speaking && !s.paused) {
        s.pause();
        s.resume();
      }
    }, 9000);
  };

  useEffect(() => {
    if (
      !allowBrowserVoice ||
      audioUrl ||
      typeof window === "undefined" ||
      !("speechSynthesis" in window) ||
      !text.trim()
    ) {
      return;
    }
    setTtsOk(true);
    const pick = () => {
      const vs = window.speechSynthesis.getVoices();
      const want = isRo ? "ro" : "en";
      const match = vs.find((v) => v.lang?.toLowerCase().startsWith(want));
      if (match) voiceRef.current = match;
    };
    pick();
    window.speechSynthesis.addEventListener("voiceschanged", pick);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pick);
      stopKeep();
      window.speechSynthesis.cancel();
    };
  }, [text, isRo, audioUrl, allowBrowserVoice]);

  const start = useCallback(() => {
    const s = window.speechSynthesis;
    s.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = isRo ? "ro-RO" : "en-US";
    if (voiceRef.current) u.voice = voiceRef.current;
    u.onend = () => {
      stopKeep();
      setStatus("idle");
    };
    u.onerror = () => {
      stopKeep();
      setStatus("idle");
    };
    s.speak(u);
    startKeep();
    setStatus("playing");
  }, [text, isRo]);

  const toggle = () => {
    const s = window.speechSynthesis;
    if (status === "idle") start();
    else if (status === "playing") {
      s.pause();
      stopKeep();
      setStatus("paused");
    } else {
      s.resume();
      startKeep();
      setStatus("playing");
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    stopKeep();
    setStatus("idle");
  };

  /* ── Cale premium: fișier MP3 ── */
  if (audioUrl) {
    return (
      <div className="my-8 flex items-center gap-4 rounded-2xl border border-[rgba(13,13,11,0.12)] bg-[#f0efec] px-5 py-4">
        <span className="shrink-0 text-[11px] font-extrabold tracking-[0.16em] uppercase text-[rgba(13,13,11,0.55)]">
          {L.listen}
        </span>
        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <audio controls preload="none" src={audioUrl} className="h-10 w-full min-w-0" />
      </div>
    );
  }

  /* ── Fără MP3 și fără voce de browser permisă → nimic ── */
  if (!allowBrowserVoice || !ttsOk) return null;

  const playing = status === "playing";
  const title =
    status === "idle" ? L.listen : playing ? `${L.playing}…` : L.paused;

  return (
    <div className="my-8 flex items-center gap-4 rounded-2xl border border-[rgba(13,13,11,0.12)] bg-[#f0efec] px-4 py-3">
      <button
        type="button"
        onClick={toggle}
        aria-label={title}
        className="grid place-items-center w-11 h-11 shrink-0 rounded-full bg-[var(--black)] text-white transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <rect x="3" y="2" width="4" height="12" rx="1" />
            <rect x="9" y="2" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M4 2.5l9 5.5-9 5.5z" />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        <span className="block text-[13px] font-extrabold tracking-[0.02em] text-[var(--black)]">
          {title}
        </span>
        <span className="block text-[11px] text-[rgba(13,13,11,0.5)]">
          {minutes ? `~${minutes} ${L.min} · ` : ""}
          {L.voice}
        </span>
      </div>

      {status !== "idle" && (
        <button
          type="button"
          onClick={stop}
          aria-label="Stop"
          className="shrink-0 text-[13px] font-extrabold text-[rgba(13,13,11,0.45)] hover:text-[var(--black)] transition-colors px-1"
        >
          ✕
        </button>
      )}
    </div>
  );
}
