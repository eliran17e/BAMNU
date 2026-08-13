"use client";

import { useEffect, useRef, useState } from "react";

const tracks = [
  { src: "/audio/bamnu-rise.mp3", title: "BAM-NU RISE" },
  { src: "/audio/bamnu-5.mp3", title: "BAMNU FIVE" },
];

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const startedRef = useRef(false);

  // Start the anthem at low volume as soon as the browser allows it: immediately
  // when autoplay is permitted, otherwise on the visitor's first interaction.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.35;

    const start = (event?: Event) => {
      if (startedRef.current) return;
      // let the toggle button handle its own click instead of racing it
      if (event?.target instanceof Element && event.target.closest(".music-player")) return;
      startedRef.current = true;
      cleanup();
      audio.play().then(() => setPlaying(true)).catch(() => {});
    };
    const cleanup = () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("keydown", start);
      window.removeEventListener("touchstart", start);
    };

    audio.play().then(() => {
      startedRef.current = true;
      setPlaying(true);
    }).catch(() => {
      window.addEventListener("pointerdown", start, { passive: true });
      window.addEventListener("keydown", start);
      window.addEventListener("touchstart", start, { passive: true });
    });
    return cleanup;
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, index]);

  function toggle() {
    startedRef.current = true;
    setPlaying((value) => !value);
  }

  function next() {
    setIndex((value) => (value + 1) % tracks.length);
  }

  return (
    <div className={`music-player ${playing ? "playing" : ""}`}>
      <audio ref={audioRef} src={tracks[index].src} preload="none" onEnded={next} />
      <button type="button" className="music-toggle" onClick={toggle} aria-pressed={playing} aria-label={playing ? `Pause music: ${tracks[index].title}` : "Play the BAMNU anthem"}>
        <span className="music-bars" aria-hidden="true"><i /><i /><i /></span>
        <span className="music-label">{playing ? tracks[index].title : "PLAY THE ANTHEM"}</span>
        <span className="music-icon" aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      </button>
      {playing && tracks.length > 1 && (
        <button type="button" className="music-next" onClick={next} aria-label="Next track">⏭</button>
      )}
    </div>
  );
}
