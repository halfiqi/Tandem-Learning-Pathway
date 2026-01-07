
import { CardType, RowCategory } from './types';

export const CARD_LIST: CardType[] = [
  'Game based Learning', 'Skills Mastery', 'Retention', 'Avatar/Character',
  'Branching Story', 'Challenges', 'Learning by Failure', 'Decisions',
  'VR', 'AR', 'AI', 'Lego Serious Play', 'Flight Simulator',
  'SimCity Game', 'Gamification', 'Behavior Change', 'Motivation',
  'Points & Badges', 'Progress Bar', 'Quizzes', 'Competition',
  'Ranking', 'Starbucks Reward', 'LinkedIn Profile Strength', 'Flight Miles Program'
];

export const BOARD_ROWS: RowCategory[] = [
  'Learning Approach',
  'Strategy',
  'Mechanics',
  'User Experience',
  'Theme & Examples'
];

export const COLUMN_COLORS = [
  'bg-blue-50 border-blue-200 text-blue-800',
  'bg-emerald-50 border-emerald-200 text-emerald-800',
  'bg-amber-50 border-amber-200 text-amber-800',
  'bg-rose-50 border-rose-200 text-rose-800',
  'bg-purple-50 border-purple-200 text-purple-800',
  'bg-indigo-50 border-indigo-200 text-indigo-800',
  'bg-teal-50 border-teal-200 text-teal-800',
  'bg-orange-50 border-orange-200 text-orange-800',
];

export const CATEGORY_ICONS: Record<RowCategory, string> = {
  'Learning Approach': 'fa-solid fa-layer-group',
  'Strategy': 'fa-solid fa-chess',
  'Mechanics': 'fa-solid fa-gears',
  'User Experience': 'fa-solid fa-user-astronaut',
  'Theme & Examples': 'fa-solid fa-lightbulb'
};
