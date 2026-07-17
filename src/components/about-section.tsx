'use client';

import { useEffect, useRef } from 'react';
import type { SiteConfig } from '@/lib/config';

interface Props {
  config: SiteConfig;
}

export function AboutSection({ config }: Props) {
  const sectionRef = useRef<HTMLElement>(null);

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

  const stories = config.aboutStories ?? [
    '카페 라이츠는 건대입구역 인근 자양동에 자리한 1~3층 규모의 베이커리 카페입니다. 모던한 인테리어와 층마다 다른 분위기의 공간에서 커피와 디저트를 여유롭게 즐길 수 있습니다.',
    '지하 베이커리 스튜디오에서 매일 직접 굽는 페스츄리가 자랑입니다. 크루아상 결의 크랑떼부터 시그니처 라이츠라떼, 매달 새로운 월간 페어링까지 직접 만드는 맛으로 계절을 전합니다.',
  ];

  const tags = config.aboutTags ?? ['#건대입구', '#베이커리카페', '#페스츄리', '#대형카페', '#시그니처음료'];

  const values = config.aboutValues ?? [
    { icon: '🥐', title: '매일 굽는 베이커리', desc: '지하 베이커리 스튜디오에서 매일 직접 굽는 페스츄리를 선보입니다.' },
    { icon: '☕', title: '시그니처 음료', desc: '라이츠라떼 등 직접 개발한 시그니처 음료와 월간 페어링을 만나보세요.' },
    { icon: '🏢', title: '층별로 다른 공간', desc: '1~3층 층마다 다른 분위기, 단체 이용도 가능한 여유로운 좌석.' },
  ];

  return (
    <section className="section about-section" id="about" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label reveal">우리 가게</p>
        <h2 className="section-title reveal">커피 한 잔에 담긴 철학</h2>

        <div className="about-grid">
          <div className="reveal">
            {stories.map((story, i) => (
              <p key={i} className="about-story">{story}</p>
            ))}
            <div className="about-tags">
              {tags.map((tag, i) => (
                <span key={i} className="about-tag">{tag}</span>
              ))}
            </div>
          </div>
          <div className="about-values reveal">
            {values.map((v, i) => (
              <div key={i} className="about-value-card">
                <span className="about-value-icon">{v.icon}</span>
                <div>
                  <p className="about-value-title">{v.title}</p>
                  <p className="about-value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
