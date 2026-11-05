// APIの英語の値 → 画面に出す日本語ラベル・色 の対応表

export const TYPE_LABELS = {
  normal: { label: 'ノーマル', color: '#9FA19F' },
  fire: { label: 'ほのお', color: '#E62829' },
  water: { label: 'みず', color: '#2980EF' },
  grass: { label: 'くさ', color: '#3FA129' },
  electric: { label: 'でんき', color: '#E4B000' },
  ice: { label: 'こおり', color: '#3DCEF3' },
  fighting: { label: 'かくとう', color: '#FF8000' },
  poison: { label: 'どく', color: '#9141CB' },
  ground: { label: 'じめん', color: '#915121' },
  flying: { label: 'ひこう', color: '#81B9EF' },
  psychic: { label: 'エスパー', color: '#EF4179' },
  bug: { label: 'むし', color: '#91A119' },
  rock: { label: 'いわ', color: '#AFA981' },
  ghost: { label: 'ゴースト', color: '#704170' },
  dragon: { label: 'ドラゴン', color: '#5060E1' },
  dark: { label: 'あく', color: '#624D4E' },
  steel: { label: 'はがね', color: '#60A1B8' },
  fairy: { label: 'フェアリー', color: '#EF70EF' },
};

export const STAT_LABELS = {
  hp: 'HP',
  attack: 'こうげき',
  defense: 'ぼうぎょ',
  'special-attack': 'とくこう',
  'special-defense': 'とくぼう',
  speed: 'すばやさ',
};

// 図鑑番号を「No.0025」の形に整える
export function formatNumber(id) {
  return `No.${String(id).padStart(4, '0')}`;
}
