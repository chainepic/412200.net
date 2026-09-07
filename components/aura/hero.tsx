"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { auraConfig } from "@/config/aura";

export function AuraHero() {
  const phrases = auraConfig.hero.titles;
  const photos = auraConfig.photos;
  const [photoIndex, setPhotoIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState<string>(phrases[0]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPhotoIndex((current) => (current + 1) % photos.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [photos.length]);

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
      {photos.map((photo, index) => (
        <div
          key={photo.src}
          className="aura-hero-media"
          style={{ opacity: index === photoIndex ? 1 : 0, transition: "opacity 1.2s ease" }}
        >
          <Image
            src={photo.src}
            alt={index === photoIndex ? photo.alt : ""}
            fill
            priority={index === 0}
            sizes="100vw"
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
