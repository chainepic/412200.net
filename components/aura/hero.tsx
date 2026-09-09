"use client";

import { useEffect, useRef, useState } from "react";

import { auraConfig } from "@/config/aura";

export function AuraHero() {
  const phrases = auraConfig.hero.titles;
  const slides = auraConfig.heroSlides;
  const [slideIndex, setSlideIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState<string>(phrases[0]);
  const [deleting, setDeleting] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  function goNext() {
    setSlideIndex((current) => (current + 1) % slides.length);
  }

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === slideIndex) {
        void video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [slideIndex]);

  useEffect(() => {
    const timer = window.setTimeout(goNext, 12000);
    return () => window.clearTimeout(timer);
  }, [slideIndex]);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const pause = !deleting && text === current;
    const speed = pause ? 2000 : deleting ? 45 : 110;

    const timer = window.setTimeout(() => {
      if (pause) {
        setDeleting(true);
        return;
      }

      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        return;
      }

      const next = current.slice(0, Math.max(0, text.length - 1));
      setText(next);
      if (next === "") {
        setDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
      }
    }, speed);

    return () => window.clearTimeout(timer);
  }, [deleting, phraseIndex, phrases, text]);

  return (
    <header className="aura-hero">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className="aura-hero-media"
          style={{ opacity: index === slideIndex ? 1 : 0, transition: "opacity 1.2s ease" }}
        >
          <video
            ref={(node) => {
              videoRefs.current[index] = node;
            }}
            src={slide.src}
            muted
            autoPlay={index === 0}
            playsInline
            loop
            preload={index === 0 ? "auto" : "metadata"}
            onCanPlay={(event) => {
              if (index === slideIndex) {
                void event.currentTarget.play().catch(() => undefined);
              }
            }}
          />
        </div>
      ))}
      <div className="aura-hero-overlay" />
      <div className="aura-hero-copy">
        <p className="aura-hero-tagline aura-display">{auraConfig.hero.tagline}</p>
        <h1>
          <span className="sr-only">{auraConfig.hero.title}</span>
          <span aria-hidden>
            {text}
            <span className="aura-cursor">|</span>
          </span>
        </h1>
        <p className="aura-hero-sub">{auraConfig.hero.subtitle}</p>
        <a href="#apply" className="aura-hero-cta" data-label={auraConfig.hero.cta}>
          {auraConfig.hero.cta}
        </a>
        <p className="aura-hero-note">{auraConfig.hero.note}</p>
      </div>
    </header>
  );
}
