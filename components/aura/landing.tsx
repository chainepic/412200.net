import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { AuraApplicationForm } from "@/components/aura/application-form";
import { AuraGallery } from "@/components/aura/gallery";
import { AuraHero } from "@/components/aura/hero";
import { AuraNav } from "@/components/aura/nav";
import { AuraToTop } from "@/components/aura/to-top";
import { auraConfig } from "@/config/aura";

export function AuraLanding() {
  const bookImage = auraConfig.photos[2]?.src ?? auraConfig.photos[0].src;
  const daysImage = auraConfig.photos[5]?.src ?? auraConfig.photos[0].src;
  const outcomeRows = [
    auraConfig.deliverables.slice(0, 2),
    auraConfig.deliverables.slice(2, 4),
  ];

  return (
    <div className="aura-page min-h-screen bg-white">
      <AuraNav />
      <AuraHero />

      <section className="aura-welcome">
        <div className="aura-container">
          <h2>住一周，把产品做上线</h2>
          <p>
            {auraConfig.hero.subtitle}
            {auraConfig.cohort.label}。
          </p>
        </div>
      </section>

      <section id="stay" className="aura-slides-wrap scroll-mt-24">
        <div className="aura-container">
          <div className="aura-slides">
            {auraConfig.photos.map((photo) => (
              <article key={photo.src} className="aura-slide">
                <Image src={photo.src} alt={photo.alt} fill sizes="250px" />
                <p className="aura-slide-info aura-display">{photo.label}</p>
              </article>
            ))}
          </div>
          <div className="aura-experience">
            {auraConfig.experience.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="apply"
        className="aura-book scroll-mt-24"
        style={{ "--aura-book-image": `url(${bookImage})` } as CSSProperties}
      >
        <div className="aura-container">
          <div className="aura-book-grid">
            <div className="aura-book-copy">
              <h2>申请</h2>
              <div className="aura-clock">
                <div>
                  <strong>{auraConfig.pricing.earlyBird.price}</strong>
                  <span>{auraConfig.pricing.earlyBird.label}</span>
                </div>
                <div>
                  <strong>{auraConfig.pricing.standard.price}</strong>
                  <span>{auraConfig.pricing.standard.label}</span>
                </div>
                <div>
                  <strong>6 席</strong>
                  <span>第一期</span>
                </div>
                <div>
                  <strong>7 天</strong>
                  <span>六晚住宿</span>
                </div>
              </div>
              <ul className="aura-book-includes">
                {auraConfig.pricing.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-6 text-[15px] font-medium text-white">
                一天内看材料。合适的话，微信约十五分钟。位子以确认信为准。
              </p>
            </div>
            <div className="aura-book-form">
              <AuraApplicationForm />
            </div>
          </div>
        </div>
      </section>

      <AuraGallery />

      <section
        id="days"
        className="aura-days scroll-mt-24"
        style={{ "--aura-days-image": `url(${daysImage})` } as CSSProperties}
      >
        <div className="aura-container">
          <h2>七天</h2>
          <div className="aura-carousel">
            {auraConfig.days.map((item, index) => {
              const photo = auraConfig.photos[index % auraConfig.photos.length];
              return (
                <article key={item.day} className="aura-carousel-card">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="500px"
                  />
                  <div className="aura-carousel-info">
                    <h3>{item.title}</h3>
                    <p>
                      {item.day}
                      <br />
                      {item.body}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="outcomes" className="aura-blog scroll-mt-24">
        <div className="aura-container">
          <h2>带走什么</h2>
          <p className="aura-blog-lead">七天结束，你带走这些。</p>
          {outcomeRows.map((row, rowIndex) => (
            <div key={rowIndex} className="aura-blog-row">
              {row.map((item, index) => {
                const photo =
                  auraConfig.photos[(rowIndex * 2 + index) % auraConfig.photos.length];
                return (
                  <article key={item.title} className="aura-blog-card">
                    <div className="aura-blog-thumb">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="220px"
                      />
                    </div>
                    <div className="aura-blog-info">
                      <p className="aura-blog-meta">
                        {String(rowIndex * 2 + index + 1).padStart(2, "0")} ·{" "}
                        {auraConfig.shortName}
                      </p>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          ))}
          <ol className="aura-process">
            {auraConfig.pricing.process.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="aura-footer">
        <div className="aura-container">
          <div className="aura-footer-grid">
            <div>
              <p className="aura-footer-logo aura-display">{auraConfig.logo}</p>
            </div>
            <div>
              <h3>这一周</h3>
              <ul>
                <li>
                  <a href="#stay">住哪儿</a>
                </li>
                <li>
                  <a href="#days">七天</a>
                </li>
                <li>
                  <a href="#outcomes">带走什么</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>申请</h3>
              <ul>
                <li>
                  <a href="#apply">提交申请</a>
                </li>
                <li>
                  <a href="#gallery">现场照片</a>
                </li>
              </ul>
            </div>
            <div>
              <h3>需要帮助？</h3>
              <ul>
                <li>
                  <Link href="/">412200.net</Link>
                </li>
                <li>
                  <p>{auraConfig.organizer}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <p className="aura-copyright">
          {auraConfig.name} · {auraConfig.organizer} ·{" "}
          <Link href="/">412200.net</Link>
        </p>
      </footer>

      <AuraToTop />
    </div>
  );
}
