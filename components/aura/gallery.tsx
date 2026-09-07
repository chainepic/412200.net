"use client";

import Image from "next/image";
import { useState } from "react";

import { auraConfig } from "@/config/aura";

const filters = [
  { id: "all", label: "全部" },
  { id: "space", label: "空间" },
  { id: "work", label: "工作" },
  { id: "daily", label: "日常" },
] as const;

export function AuraGallery() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const photos = auraConfig.photos.filter(
    (photo) => filter === "all" || photo.tag === filter,
  );

  return (
    <section id="gallery" className="aura-gallery scroll-mt-24">
      <div className="aura-container">
        <div className="aura-filter-row">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={filter === item.id ? "aura-filter is-active" : "aura-filter"}
              onClick={() => setFilter(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="aura-gallery-grid">
          {photos.map((photo) => (
            <div key={photo.src} className="aura-gallery-item">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="360px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
