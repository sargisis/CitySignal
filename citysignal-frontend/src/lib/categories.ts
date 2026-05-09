import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'pothole',
    icon: 'construction',
    name: { en: 'Pothole', hy: 'Փոսdelays', ru: 'Яма' },
    description: {
      en: 'Road damage, cracks, sinkholes',
      hy: 'Road damage',
      ru: 'Повреждение дороги, трещины',
    },
  },
  {
    id: 'streetlight',
    icon: 'lightbulb-off',
    name: { en: 'Streetlight', hy: 'Streetlight AM', ru: 'Освещение' },
    description: {
      en: 'Broken or flickering street lights',
      hy: 'Broken lights',
      ru: 'Сломанные фонари',
    },
  },
  {
    id: 'water',
    icon: 'droplets',
    name: { en: 'Water Issue', hy: 'Water AM', ru: 'Водоснабжение' },
    description: {
      en: 'Leaks, outages, water quality',
      hy: 'Water issues',
      ru: 'Утечки, отключения воды',
    },
  },
  {
    id: 'garbage',
    icon: 'trash-2',
    name: { en: 'Garbage', hy: 'Garbage AM', ru: 'Мусор' },
    description: {
      en: 'Illegal dumping, overflowing bins',
      hy: 'Garbage issues',
      ru: 'Незаконный сброс мусора',
    },
  },
  {
    id: 'greenspace',
    icon: 'trees',
    name: { en: 'Green Space', hy: 'Green AM', ru: 'Озеленение' },
    description: {
      en: 'Fallen trees, park damage',
      hy: 'Park issues',
      ru: 'Деревья, повреждение парков',
    },
  },
  {
    id: 'infrastructure',
    icon: 'building-2',
    name: { en: 'Infrastructure', hy: 'Infra AM', ru: 'Инфраструктура' },
    description: {
      en: 'Broken sidewalks, fences, signs',
      hy: 'Infrastructure issues',
      ru: 'Тротуары, заборы, знаки',
    },
  },
  {
    id: 'electrical',
    icon: 'zap',
    name: { en: 'Electrical', hy: 'Electrical AM', ru: 'Электричество' },
    description: {
      en: 'Exposed wires, electrical hazards',
      hy: 'Electrical hazards',
      ru: 'Оголённые провода',
    },
  },
  {
    id: 'construction',
    icon: 'hard-hat',
    name: { en: 'Construction', hy: 'Construction AM', ru: 'Стройка' },
    description: {
      en: 'Illegal construction, noise violations',
      hy: 'Construction issues',
      ru: 'Незаконное строительство',
    },
  },
  {
    id: 'traffic',
    icon: 'traffic-cone',
    name: { en: 'Traffic', hy: 'Traffic AM', ru: 'Движение' },
    description: {
      en: 'Signal malfunction, missing signs',
      hy: 'Traffic issues',
      ru: 'Светофоры, знаки',
    },
  },
  {
    id: 'other',
    icon: 'flag',
    name: { en: 'Other', hy: 'Other AM', ru: 'Другое' },
    description: {
      en: "Anything that doesn't fit above",
      hy: 'Other issues',
      ru: 'Прочее',
    },
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export const categoryColors: Record<string, string> = {
  pothole: '#EF4444',
  streetlight: '#F59E0B',
  water: '#3B82F6',
  garbage: '#10B981',
  greenspace: '#22C55E',
  infrastructure: '#8B5CF6',
  electrical: '#F97316',
  construction: '#EC4899',
  traffic: '#06B6D4',
  other: '#6B7280',
};
