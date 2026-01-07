
import React from 'react';
import { CardType, DragItem } from '../types';
import CardItem from './CardItem';

interface SidebarProps {
  cards: CardType[];
  onDragStart: (item: DragItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ cards, onDragStart }) => {
  return (
    <aside className="w-80 h-full bg-white border-l border-slate-200 flex flex-col shrink-0 glass-panel">
      <div className="p-6 border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <i className="fa-solid fa-rectangle-list text-indigo-500"></i>
          Toolkit
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Reuse these cards as many times as needed.
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-1 gap-3">
          {cards.map((cardName, index) => (
            <div 
              key={`${cardName}-${index}`} 
              draggable 
              onDragStart={(e) => {
                e.dataTransfer.setData('application/react-dnd', cardName);
                onDragStart({ name: cardName, source: 'palette' });
              }}
              className="cursor-grab active:cursor-grabbing transform transition hover:scale-[1.02]"
            >
              <CardItem name={cardName} />
            </div>
          ))}
        </div>
      </div>

      <div className="p-6 bg-slate-50 border-t border-slate-200">
        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] text-center">
          EduDesign Canvas v1.0
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
