
export type CardType = 
  | 'Game based Learning' | 'Skills Mastery' | 'Retention' | 'Avatar/Character' 
  | 'Branching Story' | 'Challenges' | 'Learning by Failure' | 'Decisions' 
  | 'VR' | 'AR' | 'AI' | 'Lego Serious Play' | 'Flight Simulator' 
  | 'SimCity Game' | 'Gamification' | 'Behavior Change' | 'Motivation' 
  | 'Points & Badges' | 'Progress Bar' | 'Quizzes' | 'Competition' 
  | 'Ranking' | 'Starbucks Reward' | 'LinkedIn Profile Strength' | 'Flight Miles Program';

export interface Card {
  id: string;
  name: CardType;
}

export type RowCategory = 
  | 'Learning Approach'
  | 'Strategy'
  | 'Mechanics'
  | 'User Experience'
  | 'Theme & Examples';

export interface ColumnData {
  id: string;
  classificationCard: Card;
  rows: Record<Exclude<RowCategory, 'Learning Approach'>, Card[]>;
}

export interface DragItem {
  name: CardType;
  source: 'palette' | 'board';
  sourceColId?: string;
  sourceRow?: RowCategory;
  cardId?: string;
}
