
import React from 'react';
import { CardType } from '../types';

interface CardItemProps {
  name: CardType;
}

const ICON_MAP: Record<CardType, string> = {
  'Game based Learning': 'fa-chalkboard-user',
  'Skills Mastery': 'fa-award',
  'Retention': 'fa-brain',
  'Avatar/Character': 'fa-user-ninja',
  'Branching Story': 'fa-route',
  'Challenges': 'fa-mountain-sun',
  'Learning by Failure': 'fa-heart-circle-exclamation',
  'Decisions': 'fa-code-branch',
  'VR': 'fa-vr-cardboard',
  'AR': 'fa-mobile-screen',
  'AI': 'fa-robot',
  'Lego Serious Play': 'fa-cubes',
  'Flight Simulator': 'fa-plane-up',
  'SimCity Game': 'fa-city',
  'Gamification': 'fa-puzzle-piece',
  'Behavior Change': 'fa-arrows-spin',
  'Motivation': 'fa-fire-flame-curved',
  'Points & Badges': 'fa-medal',
  'Progress Bar': 'fa-bars-progress',
  'Quizzes': 'fa-list-check',
  'Competition': 'fa-flag-checkered',
  'Ranking': 'fa-list-ol',
  'Starbucks Reward': 'fa-mug-hot',
  'LinkedIn Profile Strength': 'fa-id-card-clip',
  'Flight Miles Program': 'fa-passport'
};

const CardItem: React.FC<CardItemProps> = ({ name }) => {
  const iconClass = ICON_MAP[name] || 'fa-shapes';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex items-center gap-3 select-none hover:shadow-md transition-shadow">
      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-indigo-600 shrink-0">
        <i className={`fa-solid ${iconClass} text-sm`}></i>
      </div>
      <span className="text-sm font-semibold text-slate-700 leading-tight">
        {name}
      </span>
    </div>
  );
};

export default CardItem;
