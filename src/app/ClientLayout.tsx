"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import PageTransition from "@/components/PageTransition";
import { CurrencyProvider } from "@/components/CurrencySelector";
import ContactSupport from "@/components/ContactSupport";
import ImmigrationConciergeChat from "@/components/ImmigrationConciergeChat";
import LogoPreloader from "@/components/LogoPreloader";
import TrustRibbon from "@/components/TrustRibbon";
import SystemStatusBanner from "@/components/SystemStatusBanner";
import { ErrorBoundary } from "@/components/ErrorHandling";
import { Pause, Play, SlidersHorizontal, VolumeX } from "lucide-react";
import { getAllTracks, type MusicTrack } from "@/data/musicTracks";
import MusicStudioModal from "@/components/music/MusicStudioModal";
import {
  deriveDefaultStudioSettings,
  derivePlaylistOrder,
  deriveStudioTheme,
  fnv1a32,
  mergeStudioSettings,
  safeParseStudioSettings
} from "@/lib/musicStudioPersonalization";
import { nextId, prevId } from "@/lib/playlistNav";

interface ClientLayoutProps {
  children: React.ReactNode;
}

type PlaybackStatus = "idle" | "loading" | "ready" | "playing" | "buffering" | "blocked" | "error";

function getCookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const parts = document.cookie.split(";").map((p) => p.trim());
  for (const part of parts) {
    if (part.startsWith(`${name}=`)) return decodeURIComponent(part.slice(name.length + 1));
  }
  return undefined;
}

function setCookieValue(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${Math.max(
    60,
    Math.floor(maxAgeSeconds)
  )}; SameSite=Lax`;
}

function randomHex(bytes: number): string {
  const arr = new Uint8Array(bytes);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

function safeJsonParseArray(value: string | null): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((v) => typeof v === "string");
  } catch {
    return [];
  }
}

function getOrCreateUserId(): string {
  const cookieName = "vanhsya_uid";
  const existing = getCookieValue(cookieName);
  if (existing && existing.length >= 8) return existing;
  const next = randomHex(16);
  setCookieValue(cookieName, next, 60 * 60 * 24 * 365);
  return next;
}

function getMediaUrl(fileName: string): string {
  return `/vanhsya-media/${encodeURIComponent(fileName)}`;
}

function getAudioMime(url: string): string | undefined {
  const lower = url.toLowerCase();
  if (lower.endsWith(".mp3")) return "audio/mpeg";
  if (lower.endsWith(".ogg")) return "audio/ogg";
  if (lower.endsWith(".aac")) return "audio/aac";
  if (lower.endsWith(".m4a") || lower.endsWith(".mp4") || lower.endsWith(".m4a.mp4")) return "audio/mp4";
  return undefined;
}

async function urlExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch {
    return false;
  }
}

function rampVolume(audio: HTMLAudioElement, to: number, durationMs: number): void {
  const from = audio.volume;
  const start = performance.now();
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const target = clamp(to);
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / Math.max(1, durationMs));
    audio.volume = clamp(from + (target - from) * t);
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function SessionBackgroundMusic() {
  const pathname = usePathname();
  const tracks = useMemo(() => getAllTracks(), []);

  const audioARef = useRef<HTMLAudioElement | null>(null);
  const audioBRef = useRef<HTMLAudioElement | null>(null);
  const [activeDeck, setActiveDeck] = useState<0 | 1>(0);
  const activeDeckRef = useRef<0 | 1>(0);
  const transitionRef = useRef(false);

  const getActiveAudio = () => (activeDeckRef.current === 0 ? audioARef.current : audioBRef.current);
  const getInactiveAudio = () => (activeDeckRef.current === 0 ? audioBRef.current : audioARef.current);
  useEffect(() => {
    activeDeckRef.current = activeDeck;
  }, [activeDeck]);

  const fxRef = useRef<{
    ctx: AudioContext;
    sourceA: MediaElementAudioSourceNode;
    sourceB: MediaElementAudioSourceNode;
    gainA: GainNode;
    gainB: GainNode;
    master: GainNode;
    low: BiquadFilterNode;
    mid: BiquadFilterNode;
    high: BiquadFilterNode;
    analyser: AnalyserNode;
    convolver: ConvolverNode;
    wet: GainNode;
    dry: GainNode;
  } | null>(null);
  const pendingAutoPlayRef = useRef(false);
  const urlCacheRef = useRef<Map<string, string>>(new Map());

  const [userId, setUserId] = useState<string | null>(() =>
    typeof document === "undefined" ? null : getOrCreateUserId()
  );
  const [track, setTrack] = useState<MusicTrack | null>(null);
  const [trackUrl, setTrackUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<PlaybackStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [userEnabled, setUserEnabled] = useState(false);
  const [studioOpen, setStudioOpen] = useState(false);
  const [studioSettings, setStudioSettings] = useState(() =>
    mergeStudioSettings(deriveDefaultStudioSettings("seed"), {})
  );
  const settingsRef = useRef(studioSettings);
  const userEnabledRef = useRef(userEnabled);

  const storageKey = userId ? `vanhsya.musicStudio.${userId}` : null;

  const studioTheme = useMemo(() => deriveStudioTheme(userId || "seed"), [userId]);

  const orderedTrackIds = useMemo(() => {
    const ids = tracks.map((t) => t.id);
    if (!userId) return ids;
    if (!studioSettings.shuffle) return ids;
    return derivePlaylistOrder(ids, userId);
  }, [tracks, userId, studioSettings.shuffle]);

  const tracksRef = useRef(tracks);
  const orderedIdsRef = useRef(orderedTrackIds);
  const trackIdRef = useRef<string | null>(null);

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  useEffect(() => {
    orderedIdsRef.current = orderedTrackIds;
  }, [orderedTrackIds]);

  useEffect(() => {
    trackIdRef.current = track?.id ?? null;
  }, [track]);

  const patchStudioSettings = (patch: Partial<typeof studioSettings>) => {
    setStudioSettings((current) => {
      const nextPatch: Partial<typeof studioSettings> = { ...patch };
      if (nextPatch.journeyMode) nextPatch.loop = false;
      if (nextPatch.loop) nextPatch.journeyMode = false;
      return mergeStudioSettings(current, nextPatch);
    });
  };

  const getAnalyser = () => fxRef.current?.analyser ?? null;

  const ensureFx = useCallback((opts?: { resume?: boolean }) => {
    const audioA = audioARef.current;
    const audioB = audioBRef.current;
    if (!audioA || !audioB) return;
    if (typeof window === "undefined") return;

    const AudioContextCtor = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextCtor) return;

    let fx = fxRef.current;
    if (!fx) {
      const ctx: AudioContext = new AudioContextCtor();
      const sourceA = ctx.createMediaElementSource(audioA);
      const sourceB = ctx.createMediaElementSource(audioB);
      const gainA = ctx.createGain();
      const gainB = ctx.createGain();
      const master = ctx.createGain();

      const low = ctx.createBiquadFilter();
      low.type = "lowshelf";
      low.frequency.value = 80;

      const mid = ctx.createBiquadFilter();
      mid.type = "peaking";
      mid.frequency.value = 1000;
      mid.Q.value = 0.9;

      const high = ctx.createBiquadFilter();
      high.type = "highshelf";
      high.frequency.value = 8000;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.86;

      const convolver = ctx.createConvolver();
      const wet = ctx.createGain();
      const dry = ctx.createGain();

      const seed = fnv1a32(`vanhsya:studio:reverb:${userId || "seed"}:${studioTheme.textureSeed}`);
      const prng = (() => {
        let a = seed >>> 0;
        return () => {
          a ^= a << 13;
          a ^= a >>> 17;
          a ^= a << 5;
          return ((a >>> 0) / 4294967296) * 2 - 1;
        };
      })();

      const lengthSeconds = 2.2;
      const length = Math.max(1, Math.floor(ctx.sampleRate * lengthSeconds));
      const impulse = ctx.createBuffer(2, length, ctx.sampleRate);
      for (let ch = 0; ch < impulse.numberOfChannels; ch++) {
        const channel = impulse.getChannelData(ch);
        for (let i = 0; i < channel.length; i++) {
          const t = i / channel.length;
          const decay = Math.pow(1 - t, 3.6);
          channel[i] = prng() * decay * (0.65 + Math.abs(prng()) * 0.35);
        }
      }
      convolver.buffer = impulse;

      sourceA.connect(gainA);
      sourceB.connect(gainB);
      gainA.connect(master);
      gainB.connect(master);

      master.connect(low);
      low.connect(mid);
      mid.connect(high);
      high.connect(analyser);
      analyser.connect(dry);
      analyser.connect(convolver);
      convolver.connect(wet);
      dry.connect(ctx.destination);
      wet.connect(ctx.destination);

      fx = { ctx, sourceA, sourceB, gainA, gainB, master, low, mid, high, analyser, convolver, wet, dry };
      fxRef.current = fx;
    }

    const s = settingsRef.current;
    fx.low.gain.value = s.eqLowDb;
    fx.mid.gain.value = s.eqMidDb;
    fx.high.gain.value = s.eqHighDb;
    fx.wet.gain.value = Math.max(0, Math.min(1, s.space));
    fx.dry.gain.value = 1;
    fx.master.gain.value = s.muted ? 0 : Math.max(0, Math.min(1, s.volume));

    if (!transitionRef.current) {
      if (activeDeckRef.current === 0) {
        fx.gainA.gain.value = 1;
        fx.gainB.gain.value = 0;
      } else {
        fx.gainA.gain.value = 0;
        fx.gainB.gain.value = 1;
      }
    }

    if (opts?.resume) {
      void fx.ctx.resume().catch(() => undefined);
    }
  }, [studioTheme.textureSeed, userId]);

  const requestFxWarmup = useCallback(() => ensureFx(), [ensureFx]);

  useEffect(() => {
    if (!studioOpen) return;
    requestAnimationFrame(() => ensureFx());
  }, [studioOpen, ensureFx]);

  useEffect(() => {
    if (!fxRef.current) return;
    ensureFx();
  }, [ensureFx, studioSettings.eqLowDb, studioSettings.eqMidDb, studioSettings.eqHighDb, studioSettings.space]);

  useEffect(() => {
    if (userId) return;
    const uid = getOrCreateUserId();
    requestAnimationFrame(() => setUserId(uid));
  }, [userId]);

  useEffect(() => {
    if (!storageKey || !userId) return;
    const defaults = deriveDefaultStudioSettings(userId);
    const stored = safeParseStudioSettings(localStorage.getItem(storageKey));
    const merged = mergeStudioSettings(defaults, stored);
    requestAnimationFrame(() => setStudioSettings(merged));
  }, [storageKey, userId]);

  useEffect(() => {
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(studioSettings));
  }, [storageKey, studioSettings]);

  useEffect(() => {
    settingsRef.current = studioSettings;
  }, [studioSettings]);

  useEffect(() => {
    userEnabledRef.current = userEnabled;
  }, [userEnabled]);

  useEffect(() => {
    if (!tracks.length) return;

    const sessionTrackKey = "vanhsya.sessionTrackId";
    const sessionUrlKey = "vanhsya.sessionTrackUrl";
    const sessionSeedKey = "vanhsya.sessionSeed";
    const usedKey = "vanhsya.usedTrackIds";

    const existingSessionTrackId = sessionStorage.getItem(sessionTrackKey);
    if (existingSessionTrackId) {
      const existingTrack = tracks.find((t) => t.id === existingSessionTrackId) ?? null;
      if (existingTrack) {
        requestAnimationFrame(() => setTrack(existingTrack));
        return;
      }
    }

    const uid = getOrCreateUserId();
    let sessionSeed = sessionStorage.getItem(sessionSeedKey);
    if (!sessionSeed) {
      sessionSeed = randomHex(12);
      sessionStorage.setItem(sessionSeedKey, sessionSeed);
    }

    const used = safeJsonParseArray(localStorage.getItem(usedKey));
    const usedSet = new Set(used);
    const allUsed = usedSet.size >= tracks.length;
    if (allUsed) {
      localStorage.setItem(usedKey, JSON.stringify([]));
      usedSet.clear();
    }

    const ids = derivePlaylistOrder(
      tracks.map((t) => t.id),
      uid
    );
    const startIndex = fnv1a32(`${uid}:${sessionSeed}`) % ids.length;
    const byId = new Map(tracks.map((t) => [t.id, t] as const));

    let finalPicked: MusicTrack | null = null;
    for (let i = 0; i < ids.length; i++) {
      const candidateId = ids[(startIndex + i) % ids.length];
      if (!candidateId) continue;
      if (usedSet.has(candidateId)) continue;
      const candidate = byId.get(candidateId) ?? null;
      if (candidate) {
        finalPicked = candidate;
        break;
      }
    }
    if (!finalPicked) finalPicked = byId.get(ids[startIndex] || "") ?? null;
    if (!finalPicked) return;

    const pickedId = finalPicked.id;
    sessionStorage.setItem(sessionTrackKey, pickedId);
    sessionStorage.removeItem(sessionUrlKey);
    localStorage.setItem(usedKey, JSON.stringify([...used.filter((id) => id !== pickedId), pickedId]));
    requestAnimationFrame(() => setTrack(finalPicked));
  }, [tracks]);

  useEffect(() => {
    const a = audioARef.current;
    const b = audioBRef.current;
    if (a) a.muted = studioSettings.muted;
    if (b) b.muted = studioSettings.muted;
  }, [studioSettings.muted]);

  useEffect(() => {
    const active = getActiveAudio();
    const inactive = getInactiveAudio();
    if (active) active.loop = studioSettings.journeyMode ? false : studioSettings.loop;
    if (inactive) inactive.loop = false;
  }, [activeDeck, studioSettings.loop, studioSettings.journeyMode]);

  useEffect(() => {
    const target = studioSettings.muted ? 0 : studioSettings.volume;
    const fx = fxRef.current;
    if (fx) {
      fx.master.gain.value = target;
      return;
    }
    const a = audioARef.current;
    const b = audioBRef.current;
    if (a) a.volume = target;
    if (b) b.volume = target;
  }, [studioSettings.volume, studioSettings.muted]);

  useEffect(() => {
    let cancelled = false;
    const audio = getActiveAudio();
    if (!audio) return;
    if (!track) return;

    const init = async () => {
      setError(null);
      setStatus("loading");
      setTrackUrl(null);

      const cacheKey = `vanhsya.trackUrl.${track.id}`;
      const runtimeCached = urlCacheRef.current.get(track.id) || null;
      const cachedUrl = runtimeCached || sessionStorage.getItem(cacheKey);
      const candidate = getMediaUrl(track.fileName);

      const supported = (url: string) => {
        const mime = getAudioMime(url);
        if (!mime) return false;
        return audio.canPlayType(mime) !== "";
      };

      let resolvedUrl: string | null = null;
      if (cachedUrl && supported(cachedUrl)) resolvedUrl = cachedUrl;
      else if (supported(candidate)) resolvedUrl = candidate;

      if (cancelled) return;
      if (!resolvedUrl) {
        setStatus("error");
        setError("Audio is unavailable in this browser or the file could not be found.");
        return;
      }

      urlCacheRef.current.set(track.id, resolvedUrl);
      sessionStorage.setItem(cacheKey, resolvedUrl);
      audio.setAttribute("playsinline", "true");
      audio.crossOrigin = "anonymous";
      audio.preload = "none";
      const s = settingsRef.current;
      audio.loop = s.journeyMode ? false : s.loop;
      audio.volume = 1;
      const fx = fxRef.current;
      if (fx) fx.master.gain.value = s.muted ? 0 : Math.max(0, Math.min(1, s.volume));
      setTrackUrl(resolvedUrl);
      const expected = typeof window !== "undefined" ? new URL(resolvedUrl, window.location.origin).href : resolvedUrl;
      const currentSrc = audio.currentSrc || audio.src;
      if (currentSrc === expected) {
        setStatus(audio.paused ? "ready" : "playing");
        return;
      }

      setStatus("ready");

      const wantsAuto = pendingAutoPlayRef.current || (!audio.paused && userEnabledRef.current);
      if (!wantsAuto) return;
      pendingAutoPlayRef.current = false;

      audio.src = resolvedUrl;
      audio.preload = "auto";
      audio.load();
      ensureFx({ resume: true });
      try {
        await audio.play();
        setStatus("playing");
      } catch {
        setStatus("blocked");
      }
    };

    init();
    return () => {
      cancelled = true;
    };
  }, [ensureFx, track]);

  const resolveTrackUrl = useCallback(
    (t: MusicTrack, audio: HTMLAudioElement): string | null => {
      const cacheKey = `vanhsya.trackUrl.${t.id}`;
      const runtimeCached = urlCacheRef.current.get(t.id) || null;
      const cached = runtimeCached || sessionStorage.getItem(cacheKey);
      const candidate = getMediaUrl(t.fileName);

      const supported = (url: string) => {
        const mime = getAudioMime(url);
        if (!mime) return false;
        return audio.canPlayType(mime) !== "";
      };

      const resolved = cached && supported(cached) ? cached : supported(candidate) ? candidate : null;
      if (resolved) {
        urlCacheRef.current.set(t.id, resolved);
        try {
          sessionStorage.setItem(cacheKey, resolved);
        } catch {
        }
      }
      return resolved;
    },
    []
  );

  const rampParam = useCallback((param: AudioParam, to: number, durationMs: number) => {
    const fx = fxRef.current;
    if (!fx) {
      param.value = to;
      return;
    }
    const now = fx.ctx.currentTime;
    const target = Math.max(0, Math.min(1, to));
    param.cancelScheduledValues(now);
    param.setValueAtTime(param.value, now);
    param.linearRampToValueAtTime(target, now + Math.max(0.01, durationMs / 1000));
  }, []);

  const persistActiveTrackId = useCallback((id: string) => {
    try {
      sessionStorage.setItem("vanhsya.sessionTrackId", id);
      const usedKey = "vanhsya.usedTrackIds";
      const used = safeJsonParseArray(localStorage.getItem(usedKey));
      localStorage.setItem(usedKey, JSON.stringify([...used.filter((x) => x !== id), id]));
    } catch {
    }
  }, []);

  const transitionToTrack = useCallback(
    async (nextTrack: MusicTrack, opts?: { crossfade?: boolean }) => {
      const activeAudio = getActiveAudio();
      const inactiveAudio = getInactiveAudio();
      if (!activeAudio || !inactiveAudio) {
        requestAnimationFrame(() => setTrack(nextTrack));
        return;
      }

      const resolvedUrl = resolveTrackUrl(nextTrack, inactiveAudio);
      if (!resolvedUrl) {
        setError("Audio is unavailable in this browser or the file could not be found.");
        setStatus("error");
        return;
      }

      const expected = typeof window !== "undefined" ? new URL(resolvedUrl, window.location.origin).href : resolvedUrl;
      const inactiveSrc = inactiveAudio.currentSrc || inactiveAudio.src;

      inactiveAudio.setAttribute("playsinline", "true");
      inactiveAudio.crossOrigin = "anonymous";
      inactiveAudio.loop = false;

      const shouldCrossfade = Boolean(opts?.crossfade) && !activeAudio.paused && userEnabledRef.current;
      if (inactiveSrc !== expected) {
        inactiveAudio.src = resolvedUrl;
        inactiveAudio.preload = userEnabledRef.current ? "auto" : "none";
        inactiveAudio.load();
      }

      if (!shouldCrossfade) {
        pendingAutoPlayRef.current = !activeAudio.paused;
        persistActiveTrackId(nextTrack.id);
        requestAnimationFrame(() => setTrack(nextTrack));
        return;
      }

      if (transitionRef.current) return;
      transitionRef.current = true;
      setError(null);

      const fx = fxRef.current;
      if (fx) {
        if (activeDeckRef.current === 0) {
          fx.gainA.gain.value = 1;
          fx.gainB.gain.value = 0;
        } else {
          fx.gainA.gain.value = 0;
          fx.gainB.gain.value = 1;
        }
      }

      ensureFx({ resume: true });

      try {
        inactiveAudio.currentTime = 0;
      } catch {
      }

      try {
        await inactiveAudio.play();
      } catch {
        transitionRef.current = false;
        pendingAutoPlayRef.current = true;
        persistActiveTrackId(nextTrack.id);
        requestAnimationFrame(() => setTrack(nextTrack));
        return;
      }

      const fadeMs = 900;
      if (fx) {
        if (activeDeckRef.current === 0) {
          fx.gainB.gain.value = 0;
          rampParam(fx.gainA.gain, 0, fadeMs);
          rampParam(fx.gainB.gain, 1, fadeMs);
        } else {
          fx.gainA.gain.value = 0;
          rampParam(fx.gainB.gain, 0, fadeMs);
          rampParam(fx.gainA.gain, 1, fadeMs);
        }
      } else {
        inactiveAudio.volume = 0;
        rampVolume(activeAudio, 0, fadeMs);
        rampVolume(inactiveAudio, 1, fadeMs);
      }

      window.setTimeout(() => {
        try {
          activeAudio.pause();
          activeAudio.removeAttribute("src");
          activeAudio.load();
        } catch {
        }
        const nextDeck = activeDeckRef.current === 0 ? 1 : 0;
        activeDeckRef.current = nextDeck;
        setActiveDeck(nextDeck);
        persistActiveTrackId(nextTrack.id);
        requestAnimationFrame(() => setTrack(nextTrack));
        transitionRef.current = false;
      }, fadeMs + 40);
    },
    [ensureFx, persistActiveTrackId, rampParam, resolveTrackUrl]
  );

  const transitionToTrackId = useCallback(
    async (id: string, opts?: { crossfade?: boolean }) => {
      const next = tracks.find((t) => t.id === id) ?? null;
      if (!next) return;
      await transitionToTrack(next, opts);
    },
    [tracks, transitionToTrack]
  );

  useEffect(() => {
    const a = audioARef.current;
    const b = audioBRef.current;
    if (!a || !b) return;

    const isActive = (el: EventTarget | null) => el === getActiveAudio();

    const onCanPlay = (e: Event) => {
      if (!isActive(e.target)) return;
      setStatus((s) => (s === "loading" || s === "buffering" ? "ready" : s));
    };
    const onPlaying = (e: Event) => {
      if (!isActive(e.target)) return;
      setStatus("playing");
    };
    const onPause = (e: Event) => {
      if (!isActive(e.target)) return;
      setStatus((s) => (s === "playing" ? "ready" : s));
    };
    const onWaiting = (e: Event) => {
      if (!isActive(e.target)) return;
      setStatus((s) => (s === "error" ? "error" : "buffering"));
    };
    const onError = (e: Event) => {
      if (!isActive(e.target)) return;
      setStatus("error");
      setError("Audio failed to load. Try again or use a different browser.");
    };

    const onEnded = async (e: Event) => {
      if (!isActive(e.target)) return;
      const s = settingsRef.current;
      if (!s.journeyMode) return;
      const ids = orderedIdsRef.current;
      const currentId = trackIdRef.current;
      const n = nextId(ids, currentId);
      if (!n) return;
      await transitionToTrackId(n, { crossfade: false });
    };

    const onTimeUpdate = async (e: Event) => {
      if (!isActive(e.target)) return;
      const s = settingsRef.current;
      if (!s.journeyMode) return;
      const audio = getActiveAudio();
      if (!audio || audio.paused) return;
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
      if (transitionRef.current) return;

      const remaining = audio.duration - audio.currentTime;
      if (remaining > 1.8) return;

      const ids = orderedIdsRef.current;
      const currentId = trackIdRef.current;
      const n = nextId(ids, currentId);
      if (!n) return;
      await transitionToTrackId(n, { crossfade: true });
    };

    for (const el of [a, b]) {
      el.addEventListener("canplaythrough", onCanPlay);
      el.addEventListener("canplay", onCanPlay);
      el.addEventListener("playing", onPlaying);
      el.addEventListener("pause", onPause);
      el.addEventListener("waiting", onWaiting);
      el.addEventListener("stalled", onWaiting);
      el.addEventListener("timeupdate", onTimeUpdate);
      el.addEventListener("ended", onEnded);
      el.addEventListener("error", onError);
    }

    return () => {
      for (const el of [a, b]) {
        el.removeEventListener("canplaythrough", onCanPlay);
        el.removeEventListener("canplay", onCanPlay);
        el.removeEventListener("playing", onPlaying);
        el.removeEventListener("pause", onPause);
        el.removeEventListener("waiting", onWaiting);
        el.removeEventListener("stalled", onWaiting);
        el.removeEventListener("timeupdate", onTimeUpdate);
        el.removeEventListener("ended", onEnded);
        el.removeEventListener("error", onError);
      }
    };
  }, [transitionToTrackId]);

  useEffect(() => {
    const audio = getActiveAudio();
    if (!audio) return;
    if (!track) return;
    if (typeof navigator === "undefined") return;
    const ms = (navigator as any).mediaSession as MediaSession | undefined;
    if (!ms) return;
    if (typeof (window as any).MediaMetadata !== "function") return;

    try {
      ms.metadata = new (window as any).MediaMetadata({
        title: track.title,
        artist: "VANHSYA",
        album: "VANHSYA Library"
      });
      ms.setActionHandler("play", () => {
        void audio.play().catch(() => setStatus("blocked"));
      });
      ms.setActionHandler("pause", () => audio.pause());
      ms.setActionHandler("stop", () => audio.pause());
      ms.setActionHandler("nexttrack", () => {
        const n = nextId(orderedIdsRef.current, trackIdRef.current);
        if (!n) return;
        void transitionToTrackId(n, { crossfade: true });
      });
      ms.setActionHandler("previoustrack", () => {
        const p = prevId(orderedIdsRef.current, trackIdRef.current);
        if (!p) return;
        void transitionToTrackId(p, { crossfade: true });
      });
    } catch {
    }

    return () => {
      try {
        ms.setActionHandler("play", null);
        ms.setActionHandler("pause", null);
        ms.setActionHandler("stop", null);
        ms.setActionHandler("nexttrack", null);
        ms.setActionHandler("previoustrack", null);
      } catch {
      }
    };
  }, [track, transitionToTrackId]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const base = studioSettings.muted ? 0 : studioSettings.volume;
    const onVis = () => {
      const fx = fxRef.current;
      if (document.hidden) {
        if (fx) rampParam(fx.master.gain, 0, 160);
        else {
          const audio = getActiveAudio();
          if (audio && !audio.paused) rampVolume(audio, 0, 160);
        }
      } else {
        if (fx) rampParam(fx.master.gain, base, 220);
        else {
          const audio = getActiveAudio();
          if (audio && !audio.paused) rampVolume(audio, base, 220);
        }
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [rampParam, studioSettings.muted, studioSettings.volume]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const base = studioSettings.muted ? 0 : studioSettings.volume;
    const fx = fxRef.current;
    if (fx) rampParam(fx.master.gain, Math.min(base, 0.18), 120);
    else {
      const audio = getActiveAudio();
      if (audio && !audio.paused) rampVolume(audio, Math.min(base, 0.18), 120);
    }
    const id = window.setTimeout(() => {
      const fx2 = fxRef.current;
      if (fx2) rampParam(fx2.master.gain, base, 260);
      else {
        const audio2 = getActiveAudio();
        if (audio2 && !audio2.paused) rampVolume(audio2, base, 260);
      }
    }, 420);
    return () => window.clearTimeout(id);
  }, [pathname, rampParam, studioSettings.muted, studioSettings.volume]);

  useEffect(() => {
    if (userEnabled) return;
    if (status !== "ready") return;
    const audio = getActiveAudio();
    if (!audio) return;

    const tryStart = async () => {
      if (!audio.src && trackUrl) {
        audio.src = trackUrl;
        audio.preload = "auto";
        audio.load();
      }
      try {
        ensureFx({ resume: true });
        await audio.play();
        setUserEnabled(true);
        setStatus("playing");
      } catch {
        setStatus("blocked");
      }
    };

    const onFirstGesture = () => {
      window.removeEventListener("pointerdown", onFirstGesture, { capture: true } as any);
      window.removeEventListener("keydown", onFirstGesture, { capture: true } as any);
      void tryStart();
    };

    window.addEventListener("pointerdown", onFirstGesture, { capture: true, once: true });
    window.addEventListener("keydown", onFirstGesture, { capture: true, once: true });

    return () => {
      window.removeEventListener("pointerdown", onFirstGesture, { capture: true } as any);
      window.removeEventListener("keydown", onFirstGesture, { capture: true } as any);
    };
  }, [ensureFx, status, userEnabled, trackUrl]);

  useEffect(() => {
    if (!userEnabled) return;
    const a = audioARef.current;
    const b = audioBRef.current;
    if (a && a.src) {
      a.preload = "auto";
      a.load();
    }
    if (b && b.src) {
      b.preload = "auto";
      b.load();
    }
  }, [userEnabled]);

  useEffect(() => {
    if (!userEnabled) return;
    if (!studioSettings.journeyMode) return;
    if (!track) return;
    if (transitionRef.current) return;

    const active = getActiveAudio();
    const inactive = getInactiveAudio();
    if (!active || !inactive) return;
    if (active.paused) return;

    const ids = orderedTrackIds.length ? orderedTrackIds : tracks.map((t) => t.id);
    const n = nextId(ids, track.id);
    if (!n) return;
    const nextTrack = tracks.find((t) => t.id === n) ?? null;
    if (!nextTrack) return;

    const resolvedUrl = resolveTrackUrl(nextTrack, inactive);
    if (!resolvedUrl) return;
    const expected = typeof window !== "undefined" ? new URL(resolvedUrl, window.location.origin).href : resolvedUrl;
    const current = inactive.currentSrc || inactive.src;
    if (current === expected) return;

    inactive.setAttribute("playsinline", "true");
    inactive.crossOrigin = "anonymous";
    inactive.loop = false;
    inactive.src = resolvedUrl;
    inactive.preload = "auto";
    inactive.load();
  }, [orderedTrackIds, resolveTrackUrl, studioSettings.journeyMode, track, tracks, userEnabled]);

  const selectTrackId = (id: string) => {
    void transitionToTrackId(id, { crossfade: true });
  };

  const goNext = () => {
    const ids = orderedTrackIds.length ? orderedTrackIds : tracks.map((t) => t.id);
    const n = nextId(ids, track?.id ?? null);
    if (!n) return;
    selectTrackId(n);
  };

  const goPrev = () => {
    const ids = orderedTrackIds.length ? orderedTrackIds : tracks.map((t) => t.id);
    const p = prevId(ids, track?.id ?? null);
    if (!p) return;
    selectTrackId(p);
  };

  const togglePlay = async () => {
    const active = getActiveAudio();
    const inactive = getInactiveAudio();
    if (!active) return;
    setError(null);

    if (!active.paused || (inactive && !inactive.paused)) {
      try {
        active.pause();
      } catch {
      }
      try {
        inactive?.pause();
      } catch {
      }
      return;
    }

    try {
      if (!active.src && trackUrl) {
        active.src = trackUrl;
        active.preload = "auto";
        active.load();
      }
      ensureFx({ resume: true });
      await active.play();
      setUserEnabled(true);
      setStatus("playing");
    } catch {
      setStatus("blocked");
    }
  };

  const toggleMute = () => patchStudioSettings({ muted: !studioSettings.muted });

  if (!tracks.length) return null;

  const statusLabel =
    error ||
    (status === "blocked"
      ? "Tap Play to enable audio"
      : status === "buffering"
        ? "Buffering…"
        : status === "playing"
          ? "Playing"
          : status === "ready"
            ? "Ready"
            : status);

  return (
    <>
      <audio ref={audioARef} className="hidden" />
      <audio ref={audioBRef} className="hidden" />
      <div className="fixed bottom-4 left-4 z-[95]">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md px-3 py-2 shadow-xl">
          <button
            type="button"
            onClick={togglePlay}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center"
            aria-label={status === "playing" ? "Pause music" : "Play music"}
          >
            {status === "playing" ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 flex items-center justify-center"
            aria-label={studioSettings.muted ? "Unmute music" : "Mute music"}
          >
            <VolumeX className={`w-5 h-5 ${studioSettings.muted ? "text-amber-200" : "text-white/70"}`} />
          </button>

          <button
            type="button"
            onClick={() => setStudioOpen(true)}
            className="w-10 h-10 rounded-2xl bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-500/25 flex items-center justify-center"
            aria-label="Open Music Studio"
          >
            <SlidersHorizontal className="w-5 h-5 text-white" />
          </button>

          <div className="min-w-0">
            <div className="text-white font-extrabold text-sm truncate max-w-[48vw] sm:max-w-[22rem]">
              {track?.title ?? "Vanhsya Music"}
            </div>
            <div className="text-xs text-white/60 font-semibold">
              {statusLabel}
            </div>
          </div>
        </div>
      </div>

      <MusicStudioModal
        open={studioOpen}
        onClose={() => setStudioOpen(false)}
        theme={studioTheme}
        tracks={tracks}
        orderedTrackIds={orderedTrackIds}
        activeTrackId={track?.id ?? null}
        statusLabel={statusLabel}
        canPlay={status === "playing"}
        onPlayPause={togglePlay}
        onPrev={goPrev}
        onNext={goNext}
        onSelectTrackId={selectTrackId}
        settings={studioSettings}
        onPatchSettings={patchStudioSettings}
        getAnalyser={getAnalyser}
        requestFxWarmup={requestFxWarmup}
      />
    </>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <ErrorBoundary>
        <CurrencyProvider>
          <TrustRibbon />
          <SystemStatusBanner />
          <LogoPreloader />
          <SessionBackgroundMusic />
          <PageTransition>
            {children}
          </PageTransition>
          <ImmigrationConciergeChat />
          <ContactSupport variant="floating" />
        </CurrencyProvider>
      </ErrorBoundary>
    </>
  );
}
