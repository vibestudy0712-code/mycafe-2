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

function getStatusText(hours: SiteConfig['businessHours']): string {
  const now = new Date();
  const todayIdx = now.getDay();
  const todayHour = hours.find((h) => (DAY_MAP[h.dayEn ?? ''] ?? -1) === todayIdx);
  if (!todayHour) return '';
  if (todayHour.isHoliday) return '오늘 휴무';
  const timeStr = todayHour.hoursEn || todayHour.hours;
  const match = timeStr.match(/(\d{1,2}):(\d{2})\s*[-–]\s*(\d{1,2}):(\d{2})/);
  if (!match) return '';
  const [, sh, sm, eh, em] = match;
  const cur = now.getHours() * 60 + now.getMinutes();
  const start = parseInt(sh) * 60 + parseInt(sm);
  const end = parseInt(eh) * 60 + parseInt(em);
  if (cur >= start && cur < end) return '현재 영업 중';
  return '영업 종료';
}

export function QuickActions({ config }: Props) {
  const [statusText, setStatusText] = useState('');

  useEffect(() => {
    if (config.businessHours?.length) {
      setStatusText(getStatusText(config.businessHours));
    }
  }, [config.businessHours]);

  const address = config.address;

  return (
    <div className="quick-actions">
      {config.phone && (
        <>
          <a
            href={`tel:${config.phone.replace(/[^+\d]/g, '')}`}
            className="quick-action quick-action-tel"
          >
            <span className="quick-action-icon">📞</span>
            {config.phone}
          </a>
          <span className="quick-sep" />
        </>
      )}
      {address && (
        <>
          <span className="quick-action">
            <span className="quick-action-icon">📍</span>
            {address}
          </span>
          {statusText && <span className="quick-sep" />}
        </>
      )}
      {statusText && (
        <span className="quick-action">
          <span className="quick-action-icon">🕐</span>
          {statusText}
        </span>
      )}
    </div>
  );
}
