'use client';

import { useEffect, useRef, useState } from 'react';
import type { MenuItem } from '@/lib/config';

interface Props {
  items: MenuItem[];
}

const TAB_EMOJIS: Record<string, string> = {
  '시그니처': '⭐',
  '커피': '☕',
  '티·라떼': '🍵',
  '논커피': '🍵',
  '에이드': '🍋',
  '디저트': '🥐',
  '원두': '🫘',
};

export function MenuSection({ items }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const categories = [...new Set(items.map((item) => item.category))];
  const [activeTab, setActiveTab] = useState(categories[0] ?? '');

  const grouped = categories.reduce<Record<string, MenuItem[]>>((acc, cat) => {
    acc[cat] = items.filter((item) => item.category === cat);
    return acc;
  }, {});

  // reveal observer
  useEffect(() => {
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
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 탭 전환 시 메뉴 아이템 stagger 애니메이션
  useEffect(() => {
    const panel = sectionRef.current?.querySelector<HTMLElement>('.menu-panel.active');
    if (!panel) return;
    const menuItems = panel.querySelectorAll<HTMLElement>('.menu-item');
    menuItems.forEach((item, i) => {
      item.classList.remove('visible');
      item.style.transitionDelay = `${i * 70}ms`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          item.classList.add('visible');
        });
      });
    });
  }, [activeTab]);

  // 초기 메뉴 아이템 IntersectionObserver
  useEffect(() => {
    const menuObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const panel = entry.target.closest('.menu-panel');
            if (!panel) return;
            const panelItems = panel.querySelectorAll<HTMLElement>('.menu-item');
            panelItems.forEach((item, i) => {
              item.style.transitionDelay = `${i * 70}ms`;
              setTimeout(() => item.classList.add('visible'), i * 70);
            });
            menuObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    sectionRef.current?.querySelectorAll<HTMLElement>('.menu-panel').forEach((panel) => {
      const first = panel.querySelector<HTMLElement>('.menu-item');
      if (first) menuObserver.observe(first);
    });
    return () => menuObserver.disconnect();
  }, []);

  return (
    <section className="section menu-section" id="menu" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label reveal">메뉴</p>
        <h2 className="section-title reveal">오늘의 메뉴</h2>
        <p className="section-desc reveal">지하 베이커리 스튜디오에서 매일 굽는 페스츄리와 직접 개발한 시그니처 음료를 만나보세요.</p>

        {/* 탭 버튼 */}
        <div className="menu-tabs reveal" role="tablist" aria-label="메뉴 카테고리">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`menu-tab-btn${activeTab === cat ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === cat}
              onClick={() => setActiveTab(cat)}
            >
              {TAB_EMOJIS[cat] ?? '🍽️'} {cat}
            </button>
          ))}
        </div>

        {/* 탭 패널 */}
        {categories.map((cat) => (
          <div
            key={cat}
            id={`panel-${cat}`}
            className={`menu-panel${activeTab === cat ? ' active' : ''}`}
            role="tabpanel"
          >
            {(grouped[cat] ?? []).map((item, i) => (
              <div key={i} className="menu-item">
                {item.imageUrl ? (
                  <img
                    className="menu-item-thumb"
                    src={item.imageUrl}
                    alt={item.name}
                    loading="lazy"
                  />
                ) : (
                  <div className="menu-item-thumb-placeholder">{item.emoji}</div>
                )}
                <div className="menu-item-name-row">
                  <span className="menu-item-name">{item.name}</span>
                  {item.nameEn && (
                    <span className="menu-item-name-en">{item.nameEn}</span>
                  )}
                  {item.isNew && <span className="badge badge-new">NEW</span>}
                  {item.isPopular && <span className="badge badge-popular">인기</span>}
                  {item.isSeason && <span className="badge badge-season">시즌</span>}
                </div>
                {item.desc && <div className="menu-item-desc">{item.desc}</div>}
                <span className="menu-item-price">{item.price}</span>
                {item.priceSub && (
                  <span className="menu-item-price-sub">{item.priceSub}</span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
