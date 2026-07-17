'use client';

import { useEffect, useRef } from 'react';

interface Props {
  images: string[];
  galleryLabels?: string[];
}

export function GallerySection({ images, galleryLabels }: Props) {
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
      { threshold: 0.1 }
    );
    revealEls?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (images.length === 0) return null;

  const handleItemClick = (src: string) => {
    window.open(src, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section gallery-section" id="gallery" ref={sectionRef}>
      <div className="section-inner">
        <p className="section-label reveal">갤러리</p>
        <h2 className="section-title reveal">매장 &amp; 메뉴 사진</h2>
        <p className="section-desc reveal">건대입구 카페 라이츠의 공간과 메뉴를 소개합니다.</p>

        <div className="gallery-grid reveal">
          {images.map((src, i) => (
            <div
              key={i}
              className="gallery-item"
              onClick={() => handleItemClick(src)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') handleItemClick(src); }}
              aria-label={`갤러리 이미지 ${i + 1} 크게 보기`}
            >
              <img src={src} alt={`갤러리 이미지 ${i + 1}`} loading="lazy" />
              <div className="gallery-item-overlay">
                {galleryLabels?.[i] && (
                  <span className="gallery-item-label">{galleryLabels[i]}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="gallery-caption reveal">이미지를 클릭하면 더 자세히 볼 수 있습니다</p>
      </div>
    </section>
  );
}
