export interface MenuItem {
  name: string;
  nameEn?: string;
  desc: string;
  descEn?: string;
  price: string;
  priceSub?: string;
  category: string;
  emoji: string;
  imageUrl?: string;
  isNew?: boolean;
  isPopular?: boolean;
  isSeason?: boolean;
}

export interface BusinessHour {
  day: string;
  dayEn?: string;
  hours: string;
  hoursEn?: string;
  isHoliday?: boolean;
}

export interface AboutValue {
  icon: string;
  title: string;
  desc: string;
}

const DEMO_MENU: MenuItem[] = [
  {
    name: '라이츠라떼',
    nameEn: 'Wrights Latte',
    desc: '우유베이스에 진한 에스프레소, 사과크림과 시나몬',
    price: '₩7,800',
    category: '시그니처',
    emoji: '☕',
    imageUrl: 'https://linkmap.biz/img/templates/cafe-wrights-latte.jpg',
    isPopular: true,
  },
  {
    name: '크랑떼',
    nameEn: 'Crangtte',
    desc: '크루아상 결에 버터 풍미, 바삭한 페이스트리',
    price: '₩4,800',
    category: '시그니처',
    emoji: '🥐',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=120&h=120&q=80&auto=format&fit=crop',
    isPopular: true,
  },
  {
    name: 'MONTHLY PAIRING',
    nameEn: 'Monthly Pairing',
    desc: '샌드위치+에이드 등 매달 새로운 조합의 월간 페어링',
    price: '변동',
    category: '시그니처',
    emoji: '🥪',
    imageUrl: 'https://linkmap.biz/img/templates/cafe-wrights-pairing.jpg',
    isPopular: true,
    isNew: true,
  },
  {
    name: '플랫화이트',
    nameEn: 'Flat White',
    desc: '크리미한 우유와 진한 에스프레소',
    price: '₩6,300',
    category: '커피',
    emoji: '☕',
  },
  {
    name: '썬셋피치',
    nameEn: 'Sunset Peach',
    desc: '복숭아와 아쌈의 우아한 조화',
    price: '₩7,800',
    category: '티·라떼',
    emoji: '🍑',
  },
  {
    name: '유자민트브리즈',
    nameEn: 'Yuzu Mint Breeze',
    desc: '고흥 유자와 페퍼민트의 청량한 만남',
    price: '₩7,800',
    category: '티·라떼',
    emoji: '🍋',
  },
  {
    name: '보성말차라떼',
    nameEn: 'Boseong Matcha Latte',
    desc: '보성 말차의 깊은 풍미',
    price: '₩8,000',
    category: '티·라떼',
    emoji: '🍵',
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=120&h=120&q=80&auto=format&fit=crop',
  },
  {
    name: '얼그레이 베일 밀크티',
    nameEn: 'Earl Grey Veil Milk Tea',
    desc: '얼그레이에 바닐라가 감도는 밀크티',
    price: '₩7,500',
    category: '티·라떼',
    emoji: '🍵',
  },
  {
    name: '스트로베리라떼',
    nameEn: 'Strawberry Latte',
    desc: '딸기 과육이 살아있는 라떼',
    price: '₩7,500',
    category: '티·라떼',
    emoji: '🍓',
  },
  {
    name: '다크초콜릿',
    nameEn: 'Dark Chocolate',
    desc: '진하고 부드러운 초콜릿 라떼',
    price: '₩7,500',
    category: '티·라떼',
    emoji: '🍫',
  },
  {
    name: '피치블루밍',
    nameEn: 'Peach Blooming',
    desc: '복숭아와 패션후르츠, 이른 여름의 맛',
    price: '₩7,500',
    category: '에이드',
    emoji: '🍑',
  },
  {
    name: '레몬에이드',
    nameEn: 'Lemon Ade',
    desc: '청량한 레몬 스파클링',
    price: '₩7,000',
    category: '에이드',
    emoji: '🍋',
  },
  {
    name: '자몽에이드',
    nameEn: 'Grapefruit Ade',
    desc: '자몽 과육이 담긴 스파클링',
    price: '₩7,000',
    category: '에이드',
    emoji: '🍊',
  },
  {
    name: '라임에이드',
    nameEn: 'Lime Ade',
    desc: '라임의 싱그러운 산뜻함',
    price: '₩7,000',
    category: '에이드',
    emoji: '🍋',
  },
];

const DEMO_HOURS: BusinessHour[] = [
  { day: '월요일', dayEn: 'Monday', hours: '08:00 – 22:30', hoursEn: '08:00 – 22:30' },
  { day: '화요일', dayEn: 'Tuesday', hours: '08:00 – 22:30', hoursEn: '08:00 – 22:30' },
  { day: '수요일', dayEn: 'Wednesday', hours: '08:00 – 22:30', hoursEn: '08:00 – 22:30' },
  { day: '목요일', dayEn: 'Thursday', hours: '08:00 – 22:30', hoursEn: '08:00 – 22:30' },
  { day: '금요일', dayEn: 'Friday', hours: '08:00 – 22:30', hoursEn: '08:00 – 22:30' },
  { day: '토요일', dayEn: 'Saturday', hours: '08:00 – 22:30', hoursEn: '08:00 – 22:30' },
  { day: '일요일', dayEn: 'Sunday', hours: '08:00 – 22:30', hoursEn: '08:00 – 22:30' },
];

function parseJSON<T>(raw: string | undefined, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || '카페 라이츠',
  nameEn: process.env.NEXT_PUBLIC_SITE_NAME_EN || 'Kafe Wrights',
  description:
    process.env.NEXT_PUBLIC_DESCRIPTION ||
    '모던한 인테리어와 어우러진 감성 카페',
  descriptionEn:
    process.env.NEXT_PUBLIC_DESCRIPTION_EN ||
    'A cozy cafe with a modern interior',
  heroCategory:
    process.env.NEXT_PUBLIC_HERO_CATEGORY ||
    '건대입구 대형 베이커리 카페',
  phone: process.env.NEXT_PUBLIC_PHONE || '0507-1485-8892',
  address: process.env.NEXT_PUBLIC_ADDRESS || '서울 광진구 동일로20길 114',
  addressDetail: process.env.NEXT_PUBLIC_ADDRESS_DETAIL || '1,2,3층 (자양동)',
  addressEn: process.env.NEXT_PUBLIC_ADDRESS_EN || '114, Dongil-ro 20-gil, Gwangjin-gu, Seoul',
  kakaoMapId: process.env.NEXT_PUBLIC_KAKAO_MAP_ID || '',
  naverPlaceUrl: process.env.NEXT_PUBLIC_NAVER_PLACE_URL || 'https://map.naver.com/p/entry/place/2007976823',
  hoursNote: process.env.NEXT_PUBLIC_HOURS_NOTE || '라스트오더 22:00 · 연중무휴',
  footerTagline: process.env.NEXT_PUBLIC_FOOTER_TAGLINE || 'Bakery & Coffee',
  menuItems: parseJSON<MenuItem[]>(process.env.NEXT_PUBLIC_MENU_ITEMS, DEMO_MENU),
  businessHours: parseJSON<BusinessHour[]>(process.env.NEXT_PUBLIC_BUSINESS_HOURS, DEMO_HOURS),
  galleryImages: parseJSON<string[]>(process.env.NEXT_PUBLIC_GALLERY_IMAGES, [
    'https://linkmap.biz/img/templates/cafe-wrights-interior.jpg',
    'https://linkmap.biz/img/templates/cafe-wrights-counter.jpg',
    'https://linkmap.biz/img/templates/cafe-wrights-pairing.jpg',
    'https://linkmap.biz/img/templates/cafe-wrights-latte.jpg',
  ]),
  galleryLabels: parseJSON<string[]>(process.env.NEXT_PUBLIC_GALLERY_LABELS, [
    '매장 내부',
    '카운터 & 바',
    '월간 페어링',
    '시그니처 라이츠라떼',
  ]),
  aboutStories: parseJSON<string[]>(process.env.NEXT_PUBLIC_ABOUT_STORIES, [
    '카페 라이츠는 건대입구역 인근 자양동에 자리한 1~3층 규모의 베이커리 카페입니다. 모던한 인테리어와 층마다 다른 분위기의 공간에서 커피와 디저트를 여유롭게 즐길 수 있습니다.',
    '지하 베이커리 스튜디오에서 매일 직접 굽는 페스츄리가 자랑입니다. 크루아상 결의 크랑떼부터 사과크림을 올린 시그니처 라이츠라떼, 매달 새롭게 선보이는 월간 페어링까지 — 직접 만드는 맛으로 계절을 전합니다.',
  ]),
  aboutTags: parseJSON<string[]>(process.env.NEXT_PUBLIC_ABOUT_TAGS, [
    '#건대입구', '#베이커리카페', '#페스츄리', '#대형카페', '#시그니처음료',
  ]),
  aboutValues: parseJSON<AboutValue[]>(process.env.NEXT_PUBLIC_ABOUT_VALUES, [
    { icon: '🥐', title: '매일 굽는 베이커리', desc: '지하 베이커리 스튜디오에서 매일 직접 굽는 페스츄리를 선보입니다.' },
    { icon: '☕', title: '시그니처 음료', desc: '라이츠라떼 등 직접 개발한 시그니처 음료와 월간 페어링을 만나보세요.' },
    { icon: '🏢', title: '층별로 다른 공간', desc: '1~3층 층마다 다른 분위기, 단체 이용도 가능한 여유로운 좌석.' },
  ]),
  transportBadges: parseJSON<string[]>(process.env.NEXT_PUBLIC_TRANSPORT_BADGES, [
    '🚇 건대입구역 5번 출구 도보 2분 (108m)',
    '🚗 인근 공영주차장 이용',
  ]),
  instagramUrl: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/kafe.wrights',
  naverBlogUrl: process.env.NEXT_PUBLIC_NAVER_BLOG_URL || 'https://blog.naver.com/kafewrights_',
  youtubeUrl: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://www.youtube.com/@kafe.wrights',
  kakaoChannelUrl: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || '',
  primaryColor: process.env.NEXT_PUBLIC_PRIMARY_COLOR || '#8b6914',
  fontFamily: process.env.NEXT_PUBLIC_FONT_FAMILY || 'Nanum Myeongjo',
  gaId: process.env.NEXT_PUBLIC_GA_ID || null,
};

export type SiteConfig = typeof siteConfig;
