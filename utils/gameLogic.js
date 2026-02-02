// 무기 데이터베이스
const WEAPON_DB = {
  Physical: [
    { id: 'w_knife', name: 'Ceramic Blade', desc: '금속 탐지기 회피', hint: 'Clean Cut' },
    { id: 'w_glass', name: 'Broken Shard', desc: '우발적 범행 도구', hint: 'Jagged Wound' },
    { id: 'w_scalpel', name: 'Surgical Scalpel', desc: '전문가의 도구', hint: 'Precision Cut' },
    { id: 'w_scissor', name: 'Rusted Scissors', desc: '오래된 가정용', hint: 'Rough Puncture' },
  ],
  Chemical: [
    { id: 'w_neuro', name: 'Neurotoxin', desc: '흔적 없는 마비', hint: 'No External Marks' },
    { id: 'w_pills', name: 'Sleeping Pills', desc: '다량 복용 흔적', hint: 'Foaming Mouth' },
    { id: 'w_venom', name: 'Snake Venom', desc: '두 개의 자국', hint: 'Puncture Marks' },
  ],
  // ... 추가 가능
};

export const generateCrimeScene = (realWeaponId) => {
  // 1. 진짜 무기 찾기
  let category = 'Physical';
  let realWeapon = null;
  
  for (const [cat, items] of Object.entries(WEAPON_DB)) {
    const found = items.find(i => i.id === realWeaponId);
    if (found) {
      category = cat;
      realWeapon = found;
      break;
    }
  }
  if (!realWeapon) return [];

  // 2. 더미 섞기 (같은 카테고리)
  const categoryItems = WEAPON_DB[category];
  const dummies = categoryItems
    .filter(i => i.id !== realWeapon.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  // 3. 최종 리스트 (섞어서 반환)
  const evidence = [realWeapon, ...dummies];
  for (let i = evidence.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [evidence[i], evidence[j]] = [evidence[j], evidence[i]];
  }
  
  return evidence.map(item => ({
    ...item,
    isReal: item.id === realWeapon.id,
    uid: Math.random().toString(36).substr(2, 9) // 고유 키
  }));
};