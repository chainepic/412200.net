import Image from "next/image";
import Link from "next/link";

import { AuraApplicationForm } from "@/components/aura/application-form";
import { AuraGallery } from "@/components/aura/gallery";
import { AuraHero } from "@/components/aura/hero";
import { AuraNav } from "@/components/aura/nav";
import { AuraPartnerForm } from "@/components/aura/partner-form";
import { AuraToTop } from "@/components/aura/to-top";
import { auraConfig } from "@/config/aura";

export function AuraLanding() {
  const outcomeRows = [
    auraConfig.deliverables.items.slice(0, 2),
    auraConfig.deliverables.items.slice(2, 4),
  ];

  return (
    <div className="aura-page min-h-screen bg-white">
      <AuraNav />
      <AuraHero />

      <section id="about" className="aura-about scroll-mt-24">
        <div className="aura-container">
          <p className="aura-about-question aura-display">{auraConfig.about.question}</p>
          <h2>{auraConfig.about.name}</h2>
          <p className="aura-about-full">{auraConfig.about.fullName}</p>
          <p className="aura-about-full-zh">{auraConfig.about.fullNameZh}</p>
          <div className="aura-about-why">
            {auraConfig.about.reasons.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="cases" className="aura-cases scroll-mt-24">
        <div className="aura-container">
          <h2>{auraConfig.cases.title}</h2>
          <p className="aura-cases-lead">{auraConfig.cases.lead}</p>
          <div className="aura-cases-grid">
            {auraConfig.cases.items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={
                  "featured" in item && item.featured
                    ? "aura-case-card is-featured"
                    : "aura-case-card"
                }
                {...(item.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                <div className="aura-case-thumb">
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    sizes={"featured" in item && item.featured ? "1170px" : "560px"}
                  />
                </div>
                <div className="aura-case-info">
                  <p className="aura-case-tag">{item.tag}</p>
                  <h3>{item.name}</h3>
                  <p>{item.body}</p>
                </div>
              </a>
            ))}
          </div>
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

      <section id="partner" className="aura-partner scroll-mt-24">
        <div className="aura-container">
          <div className="aura-partner-grid">
            <div>
              <h2>{auraConfig.partner.title}</h2>
              <p>{auraConfig.partner.lead}</p>
            </div>
            <AuraPartnerForm />
          </div>
        </div>
      </section>

      <section id="apply" className="aura-book scroll-mt-24">
        <video
          className="aura-book-video"
          src="/aura/video/travel-2.mp4"
          muted
          autoPlay
          loop
          playsInline
          preload="metadata"
        />
        <div className="aura-book-overlay" />
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

      <section id="days" className="aura-days scroll-mt-24">
        <div className="aura-container">
          <h2>{auraConfig.days.title}</h2>
          <p className="aura-days-lead">{auraConfig.days.lead}</p>
          <p className="aura-days-body">{auraConfig.days.body}</p>
        </div>
      </section>

      <section id="outcomes" className="aura-blog scroll-mt-24">
        <div className="aura-container">
          <h2>{auraConfig.deliverables.title}</h2>
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
                  <a href="#about">是什么</a>
                </li>
                <li>
                  <a href="#cases">案例</a>
                </li>
                <li>
                  <a href="#stay">住哪儿</a>
                </li>
                <li>
                  <a href="#days">七天</a>
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
                  <a href="#partner">民宿合作</a>
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
      </footer>

      <AuraToTop />
    </div>
  );
}
