import { 
  TrendingUp, Megaphone, Zap, Briefcase, Cpu, Rocket, Coins, Siren, Utensils, 
  Dog, ChefHat, Sparkles, Dumbbell, GraduationCap, Ghost, Gamepad2, Music, 
  Video, Car, HeartHandshake, Microscope, Palette, Tent
} from 'lucide-react';

export const WIN_SCORE = 100;
export const SILVER_SCORE = 10;
export const SPONSOR_REQ = 7;
export const SYNERGY_REQ = 4;

// [GENRE_DB] : 시너지 효과와 설명의 개연성 강화
export const GENRE_DB = [
  // 1. [Red Group] : 공격적, 자본주의, 도파민
  { 
    id: 'stock', 
    name: '주식/재테크', 
    icon: <TrendingUp size={14}/>, 
    color: 'text-red-500', 
    bg: 'bg-red-600', 
    border: 'border-red-400', 
    colorGroup: 'red', 
    synName: '복리 효과', 
    type: 'Economy', 
    synDesc: '자원을 3개 이상 보유 시, 턴마다 이자(추가 자원) 획득', 
    reason: '돈이 돈을 법니다. 불어난 자산을 재투자하여 스노우볼을 굴리세요.' 
  },
  { 
    id: 'politics', 
    name: '정치/이슈', 
    icon: <Megaphone size={14}/>, 
    color: 'text-rose-600', 
    bg: 'bg-rose-800', 
    border: 'border-rose-600', 
    colorGroup: 'red', 
    synName: '여론 선동', 
    type: 'Attack', 
    synDesc: '카드 구매 시 모든 경쟁자에게 악플(감점) 부여', 
    reason: '갈등은 최고의 콘텐츠입니다. 적을 만들고 지지층을 결집시켜 상대를 깎아내립니다.' 
  },
  { 
    id: 'shorts', 
    name: '숏폼/릴스', 
    icon: <Zap size={14}/>, 
    color: 'text-orange-500', 
    bg: 'bg-orange-600', 
    border: 'border-orange-400', 
    colorGroup: 'red', 
    synName: '알고리즘 간택', 
    type: 'Score', 
    synDesc: '카드 구매 시 즉시 추가 구독자(+5만) 획득', 
    reason: '도파민 중독! 짧고 강렬한 영상으로 알고리즘의 선택을 받아 폭발적으로 성장합니다.' 
  },

  // 2. [Blue Group] : 기술, 지식, 전문성
  { 
    id: 'tech', 
    name: 'IT/테크', 
    icon: <Cpu size={14}/>, 
    color: 'text-blue-500', 
    bg: 'bg-blue-600', 
    border: 'border-blue-400', 
    colorGroup: 'blue', 
    synName: '장비빨', 
    type: 'Utility', 
    synDesc: '스폰서 계약 조건 1개 완화 (장비 협찬)', 
    reason: '최신 장비와 자동화 툴을 도입하여 작업 효율을 극대화합니다. 남들보다 빠르게 납품하세요.' 
  },
  { 
    id: 'science', 
    name: '과학/실험', 
    icon: <Microscope size={14}/>, 
    color: 'text-sky-500', 
    bg: 'bg-sky-600', 
    border: 'border-sky-400', 
    colorGroup: 'blue', 
    synName: '연금술', 
    type: 'Utility', 
    synDesc: '보유한 자원 2개를 조커(알고리즘) 1개로 변환 가능', 
    reason: '실패한 실험 데이터조차 콘텐츠로 승화시킵니다. 쓰레기를 황금으로 바꾸세요.' 
  },
  { 
    id: 'game', 
    name: '게임', 
    icon: <Gamepad2 size={14}/>, 
    color: 'text-indigo-400', 
    bg: 'bg-indigo-600', 
    border: 'border-indigo-400', 
    colorGroup: 'blue', 
    synName: '고인물', 
    type: 'Utility', 
    synDesc: '3티어(고급) 카드 구매 시 비용 할인', 
    reason: '압도적인 피지컬과 공략법으로 가장 어려운 난이도(3티어)를 손쉽게 클리어합니다.' 
  },

  // 3. [Yellow Group] : 음식, 즐거움, 대중성
  { 
    id: 'mukbang', 
    name: '먹방', 
    icon: <Utensils size={14}/>, 
    color: 'text-yellow-500', 
    bg: 'bg-yellow-600', 
    border: 'border-yellow-400', 
    colorGroup: 'yellow', 
    synName: '위장 확장', 
    type: 'Economy', 
    synDesc: '자원 보유 한도가 10개에서 13개로 증가', 
    reason: '끊임없이 들어갑니다! 넉넉한 인벤토리로 물량을 비축해 대규모 합방에 대비하세요.' 
  },
  { 
    id: 'cooking', 
    name: '요리', 
    icon: <ChefHat size={14}/>, 
    color: 'text-amber-500', 
    bg: 'bg-amber-700', 
    border: 'border-amber-500', 
    colorGroup: 'yellow', 
    synName: '백종원 매직', 
    type: 'Utility', 
    synDesc: '자원 획득 시 조커(알고리즘) 1개 추가 획득 확률 증가', 
    reason: '평범한 재료도 황금 레시피와 만나면 요리가 됩니다. 부족한 자원을 실력으로 커버하세요.' 
  },

  // 4. [Green Group] : 건강, 자연, 회복
  { 
    id: 'health', 
    name: '헬스/운동', 
    icon: <Dumbbell size={14}/>, 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-600', 
    border: 'border-emerald-400', 
    colorGroup: 'green', 
    synName: '3대 500', 
    type: 'Utility', 
    synDesc: '자원 수집 시 해당 자원 1개 더 획득 (피지컬)', 
    reason: '강한 콘텐츠는 강한 육체에서 나옵니다. 남들이 지칠 때 한 세트 더(자원+1) 수행합니다.' 
  },
  { 
    id: 'healing', 
    name: '힐링/자연', 
    icon: <Tent size={14}/>, 
    color: 'text-green-500', 
    bg: 'bg-green-700', 
    border: 'border-green-500', 
    colorGroup: 'green', 
    synName: '정화', 
    type: 'Defense', 
    synDesc: '자원 수집 시 내 악플 1개 자동 제거', 
    reason: '보는 것만으로 마음이 정화됩니다. 평화로운 영상으로 시청자들의 악플을 선플로 바꿉니다.' 
  },

  // 5. [Purple Group] : 미스터리, 예술, 호기심
  { 
    id: 'mystery', 
    name: '미스터리', 
    icon: <Ghost size={14}/>, 
    color: 'text-purple-500', 
    bg: 'bg-purple-600', 
    border: 'border-purple-400', 
    colorGroup: 'purple', 
    synName: '진실 탐사', 
    type: 'Attack', 
    synDesc: '카드 구매 시 1등 플레이어의 자원 1개를 뺏어옴', 
    reason: '그것이 알고 싶다. 경쟁자의 은밀한 비밀(자원)을 파헤쳐 내 콘텐츠로 만듭니다.' 
  },
  { 
    id: 'art', 
    name: '예술/그림', 
    icon: <Palette size={14}/>, 
    color: 'text-pink-500', 
    bg: 'bg-pink-600', 
    border: 'border-pink-400', 
    colorGroup: 'purple', 
    synName: '보정의 신', 
    type: 'Utility', 
    synDesc: '구매 비용 중 1개를 무작위로 면제', 
    reason: '비주얼이 곧 개연성입니다. 화려한 썸네일과 편집으로 부족한 기획력(비용)을 때웁니다.' 
  },

  // 6. [Neutral Group] : 일상, 기타
  { 
    id: 'vlog', 
    name: '브이로그', 
    icon: <Video size={14}/>, 
    color: 'text-stone-400', 
    bg: 'bg-stone-500', 
    border: 'border-stone-400', 
    colorGroup: 'neutral', 
    synName: '꾸준함', 
    type: 'Utility', 
    synDesc: '자원 수집 턴을 소모하지 않고 자원 1개 획득 (확률)', 
    reason: '숨 쉬는 것도 콘텐츠입니다. 특별한 기획 없이도 일상을 찍어 올려 자원을 법니다.' 
  },
  { 
    id: 'car', 
    name: '자동차', 
    icon: <Car size={14}/>, 
    color: 'text-zinc-400', 
    bg: 'bg-zinc-600', 
    border: 'border-zinc-400', 
    colorGroup: 'neutral', 
    synName: '하차감', 
    type: 'Economy', 
    synDesc: '보유 자원이 0개일 때, 즉시 자원 2개 긴급 수혈', 
    reason: '슈퍼카로 어그로를 끕니다. 가진 게 없어도 차만 보여주면 사람들이 모입니다.' 
  }
];

export const SPONSORS_TEMPLATE = [
    // Tier 1: 초반용 (쉬운 난이도)
    { id: 'sp_basic', name: '중소기업 체험단', type: 'resource', rewardDesc: '자원 +5', points: 5, req: {}, difficulty: 1 },
    { id: 'sp_viral', name: '바이럴 광고', type: 'score', rewardDesc: '+10만 구독자', points: 10, req: {}, difficulty: 1 },

    // Tier 2: 중반용 (특정 장르 요구)
    { id: 'sp_gaming', name: '게이밍 기어 협찬', type: 'score', rewardDesc: '+25만 & 장비', points: 25, req: {}, difficulty: 2, theme: ['game', 'tech'] },
    { id: 'sp_beauty', name: '화장품 런칭 모델', type: 'cleanse', rewardDesc: '+20만 & 악플제거', points: 20, req: {}, difficulty: 2, theme: ['beauty', 'vlog'] },
    { id: 'sp_food', name: '프랜차이즈 계약', type: 'resource', rewardDesc: '모든 자원 +2', points: 15, req: {}, difficulty: 2, theme: ['mukbang', 'cook'] },
    { id: 'sp_finance', name: '코인 거래소 광고', type: 'score', rewardDesc: '+30만 (위험)', points: 30, req: {}, difficulty: 2, theme: ['coin', 'stock'] },

    // Tier 3: 후반용 (높은 난이도)
    { id: 'sp_global', name: '글로벌 앰버서더', type: 'score', rewardDesc: '+50만 구독자', points: 50, req: {}, difficulty: 3 },
    { id: 'sp_gov', name: '공익광고 홍보대사', type: 'cleanse', rewardDesc: '+30만 & 면제권', points: 30, req: {}, difficulty: 3 }
];

export const TIER_DATA = {
  1: {
    adj: ['방구석', '초보', '어설픈', '동네', '가성비', '심심한', '흔한', '급조한', '짧은', '저화질'],
    noun: ['리뷰', '소개', '브이로그', '썰', '영상', '챌린지', '체험기', '먹방', '라이브', 'Q&A']
  },
  2: {
    adj: ['본격적인', '전문적인', '화려한', '편집된', '감동적인', '논란의', '화제의', '작정하고 만든', '고화질', '콜라보'],
    noun: ['대탐험', '프로젝트', '다큐', '실험', '분석', '참교육', '인터뷰', '성대모사', '커버', '강의']
  },
  3: {
    adj: ['전설의', '역대급', '최초공개', '블록버스터', '월드클래스', '충격적인', '모두가 놀란', '100억 투자', '신의', '완벽한'],
    noun: ['진실', '피날레', '마스터피스', '독점공개', '초대석', '생존기', '참교육', '플렉스', '세계일주', '우주여행']
  }
};