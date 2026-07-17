'use client';

import { useEffect, useState } from 'react';
import type { SiteConfig } from '@/lib/config';

interface Props {
  config: SiteConfig;
}

const DAY_MAP: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

function getHeroStatus(hours: SiteConfig['businessHours']): { isOpen: boolean; isHoliday: boolean } {
  const now = new Date();
  const todayIdx = now.getDay();
  const todayHour = hours.find((h) => (DAY_MAP[h.dayEn ?? ''] ?? -1) === todayIdx);
  if (!todayHour) return { isOpen: false, isHoliday: false };
  if (todayHour.isHoliday) return { isOpen: false, isHoliday: true };
  const timeStr = todayHour.hoursEn || todayHour.hours;
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/);
  if (!match) return { isOpen: false, isHoliday: false };
  const [, sh, sm, eh, em] = match;
  const cur = now.getHours() * 60 + now.getMinutes();
  const start = parseInt(sh) * 60 + parseInt(sm);
  const end = parseInt(eh) * 60 + parseInt(em);
  return { isOpen: cur >= start && cur < end, isHoliday: false };
}

export function HeroSection({ config }: Props) {
  const [status, setStatus] = useState<{ isOpen: boolean; isHoliday: boolean } | null>(null);

  useEffect(() => {
    if (config.businessHours?.length) {
      setStatus(getHeroStatus(config.businessHours));
    }
  }, [config.businessHours]);

  const statusText = status === null
    ? '확인 중…'
    : status.isOpen
    ? '현재 영업 중'
    : status.isHoliday
    ? '오늘 정기휴무'
    : '영업 종료';

  const statusClass = status?.isOpen ? 'open' : 'closed';

  return (
    <section className="hero" id="top">
      <div className="hero-bg-img" />
      <div className="hero-overlay" />
      <div className="hero-gradient" />

      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {config.heroCategory || config.description || config.name}
        </div>

        <h1 className="hero-name">{config.name}</h1>

        {config.nameEn && (
          <p className="hero-name-en">{config.nameEn}</p>
        )}

        <div className="hero-divider">
          <span className="hero-divider-line" />
          <span className="hero-divider-bean">☕</span>
          <span className="hero-divider-line" />
        </div>

        {config.description && (
          <p className="hero-slogan">"{config.description}"</p>
        )}

        {config.businessHours?.length > 0 && (
          <div className={`hero-status ${statusClass}`}>
            <span className="hero-status-dot" />
            <span>{statusText}</span>
          </div>
        )}

        <div className="hero-actions">
          {config.menuItems.length > 0 && (
            <a href="#menu" className="btn btn-primary">메뉴 보기</a>
          )}
          {config.address && (
            <a href="#info" className="btn btn-outline">오시는 길</a>
          )}
          {!config.menuItems.length && config.phone && (
            <a
              href={`tel:${config.phone.replace(/[^+\d]/g, '')}`}
              className="btn btn-primary"
            >
              📞 전화하기
            </a>
          )}
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-arrow" />
      </div>
    </section>
  );
}
