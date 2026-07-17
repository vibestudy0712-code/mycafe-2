'use client';

import { useState, useEffect } from 'react';
import type { SiteConfig } from '@/lib/config';

interface Props {
  config: SiteConfig;
}

export function NavHeader({ config }: Props) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme');
    const initial = (saved as 'light' | 'dark') || (prefersDark ? 'dark' : 'light');
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  };

  const navLinks = [
    { href: '#about', label: '소개' },
    { href: '#menu', label: '메뉴' },
    { href: '#info', label: '영업정보' },
    { href: '#gallery', label: '갤러리' },
  ].filter((link) => {
    if (link.href === '#menu' && config.menuItems.length === 0) return false;
    if (link.href === '#gallery' && config.galleryImages.length === 0) return false;
    return true;
  });

  return (
    <nav className="nav" role="navigation" aria-label="주 메뉴">
      <div className="nav-left">
        <div>
          <a href="#top" className="nav-logo">{config.name}</a>
          {config.nameEn && (
            <span className="nav-logo-sub">{config.nameEn}</span>
          )}
        </div>
      </div>
      <ul className="nav-links">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
      <div className="nav-right">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="다크/라이트 모드 전환"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
        {config.phone && (
          <a href={`tel:${config.phone.replace(/[^+\d]/g, '')}`} className="nav-cta">
            전화하기
          </a>
        )}
      </div>
    </nav>
  );
}
