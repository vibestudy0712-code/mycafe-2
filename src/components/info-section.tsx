'use client';

import { useEffect, useRef, useState } from 'react';
import type { SiteConfig, BusinessHour } from '@/lib/config';

interface Props {
  config: SiteConfig;
}

const DAY_MAP: Record<string, number> = {
  Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3,
  Thursday: 4, Friday: 5, Saturday: 6,
};

function getTodayIndex(): number {
  return new Date().getDay();
}

function getOpenStatus(hours: BusinessHour[]): { isOpen: boolean; isHoliday: boolean; closeTime: string } {
  const now = new Date();
  const todayIdx = now.getDay();
  const todayHour = hours.find((h) => (DAY_MAP[h.dayEn ?? ''] ?? -1) === todayIdx);
  if (!todayHour) return { isOpen: false, isHoliday: false, closeTime: '' };
  if (todayHour.isHoliday) return { isOpen: false, isHoliday: true, closeTime: '' };
  const timeStr = todayHour.hoursEn || todayHour.hours;
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/);
  if (!match) return { isOpen: false, isHoliday: false, closeTime: '' };
  const [, sh, sm, eh, em] = match;
  const cur = now.getHours() * 60 + now.getMinutes();
  const start = parseInt(sh) * 60 + parseInt(sm);
  const end = parseInt(eh) * 60 + parseInt(em);
  return { isOpen: cur >= start && cur < end, isHoliday: false, closeTime: `${eh}:${em}` };
}

function getDayDataIndex(dayEn: string | undefined): number {
  if (!dayEn) return -1;
  const jsDay = DAY_MAP[dayEn] ?? -1;
  return jsDay === 0 ? 6 : jsDay - 1;
}

export function InfoSection({ config }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [openStatus, setOpenStatus] = useState<{ isOpen: boolean; isHoliday: boolean; closeTime: string } | null>(null);
  const todayIndex = getTodayIndex();

  useEffect(() => {
    if (config.businessHours?.length) {
      setOpenStatus(getOpenStatus(config.businessHours));
    }

    const revealEls = sectionRef.current?.querySelectorAll<HTMLElement>('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [config.businessHours]);

  const hasHours = config.businessHours?.length > 0;
  const hasLocation = !!config.address;
  if (!hasHours && !hasLocation) return null;

  const kakaoMapUrl = config.kakaoMapId
    ? `https://place.map.kakao.com/${config.kakaoMapId}`
    : config.address
    ? `https://map.kakao.com/link/search/${encodeURIComponent(config.address)}`
    : null;

  const naverMapUrl = config.naverPlaceUrl
    ? config.naverPlaceUrl
    : config.address
    ? `https://map.naver.com/v5/search/${encodeURIComponent(config.address)}`
    : null;

  const transportBadges = config.transportBadges ?? [];

  return (
    <section className="section info-section" id="info" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label reveal">영업 정보</p>
        <h2 className="section-title reveal">영업시간 &amp; 오시는 길</h2>

        <div className="info-grid reveal">
          {/* 영업시간 카드 */}
          {hasHours && (
            <div className="info-card">
              <h3 className="info-card-title">
                <span>🕐</span>
                영업시간
              </h3>
              <ul className="hours-list">
                {config.businessHours.map((hour, i) => {
                  const dayIdx = DAY_MAP[hour.dayEn ?? ''] ?? -1;
                  const isToday = dayIdx === todayIndex;
                  const dataIdx = getDayDataIndex(hour.dayEn);
                  return (
                    <li
                      key={i}
                      className={`hours-item${isToday ? ' today' : ''}${hour.isHoliday ? ' holiday' : ''}`}
                      data-day={dataIdx}
                    >
                      <span className="hours-day">{hour.day}</span>
                      <span className="hours-time">{hour.isHoliday ? '정기휴무' : hour.hours}</span>
                    </li>
                  );
                })}
              </ul>

              {config.hoursNote && (
                <p className="hours-note">{config.hoursNote}</p>
              )}

              {openStatus !== null && (
                <div className={`open-badge ${openStatus.isOpen ? 'open' : 'closed'}`}>
                  <span className="open-dot" />
                  {openStatus.isOpen
                    ? `현재 영업 중 (${openStatus.closeTime} 마감)`
                    : openStatus.isHoliday
                    ? '오늘은 정기휴무입니다'
                    : '영업 종료'}
                </div>
              )}

              {config.phone && (
                <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--bg-card-border)' }}>
                  <a
                    href={`tel:${config.phone.replace(/[^+\d]/g, '')}`}
                    className="phone-link"
                  >
                    <span>📞</span>
                    {config.phone}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* 위치 카드 */}
          {hasLocation && (
            <div className="info-card" id="location">
              <h3 className="info-card-title">
                <span>📍</span>
                오시는 길
              </h3>
              <p className="address-text">
                {config.address}
                {config.addressDetail && <><br />{config.addressDetail}</>}
              </p>
              {config.addressEn && (
                <p className="address-text-en">{config.addressEn}</p>
              )}

              {config.kakaoMapId && (
                <div style={{ marginBottom: '1rem', borderRadius: 'var(--radius-sm)', overflow: 'hidden', aspectRatio: '16/10' }}>
                  <iframe
                    src={`https://map.kakao.com/?map_type=TYPE_MAP&itemId=${config.kakaoMapId}`}
                    title="카카오맵"
                    style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                    loading="lazy"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="map-buttons">
                {kakaoMapUrl && (
                  <a
                    href={kakaoMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-btn map-btn-kakao"
                  >
                    🗺️ 카카오맵
                  </a>
                )}
                {naverMapUrl && (
                  <a
                    href={naverMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="map-btn map-btn-naver"
                  >
                    📍 네이버지도
                  </a>
                )}
              </div>

              {transportBadges.length > 0 && (
                <div className="transport-badges">
                  {transportBadges.map((badge, i) => (
                    <span key={i} className="transport-badge">{badge}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
