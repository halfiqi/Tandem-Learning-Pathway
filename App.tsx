
import React, { useState, useEffect, useCallback } from 'react';
import { CardType, ColumnData, RowCategory, DragItem } from './types';
import { CARD_LIST, BOARD_ROWS } from './constants';
import { shuffleArray, generateId } from './utils';
import Sidebar from './components/Sidebar';
import Board from './components/Board';

const App: React.FC = () => {
  const [paletteCards, setPaletteCards] = useState<CardType[]>([]);
  const [columns, setColumns] = useState<ColumnData[]>([]);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  // Initialize and shuffle cards once on mount to maintain the "sorted in same order" requirement
  useEffect(() => {
    setPaletteCards(shuffleArray([...CARD_LIST]));
  }, []);

  const handleDragStart = useCallback((item: DragItem) => {
    setDraggedItem(item);
  }, []);

  const handleDrop = useCallback((targetColId: string | null, targetRow: RowCategory) => {
    if (!draggedItem) return;

    if (targetRow === 'Learning Approach') {
      const newCol: ColumnData = {
        id: generateId(),
        classificationCard: { id: generateId(), name: draggedItem.name },
        rows: {
          'Strategy': [],
          'Mechanics': [],
          'User Experience': [],
          'Theme & Examples': []
        }
      };
      setColumns(prev => [...prev, newCol]);
    } else if (targetColId) {
      setColumns(prev => prev.map(col => {
        if (col.id === targetColId) {
          const category = targetRow as Exclude<RowCategory, 'Learning Approach'>;
          return {
            ...col,
            rows: {
              ...col.rows,
              [category]: [...col.rows[category], { id: generateId(), name: draggedItem.name }]
            }
          };
        }
        return col;
      }));
    }

    setDraggedItem(null);
  }, [draggedItem]);

  const removeCard = useCallback((colId: string, row: RowCategory, cardId: string) => {
    if (row === 'Learning Approach') {
      setColumns(prev => prev.filter(col => col.id !== colId));
    } else {
      setColumns(prev => prev.map(col => {
        if (col.id === colId) {
          const category = row as Exclude<RowCategory, 'Learning Approach'>;
          return {
            ...col,
            rows: {
              ...col.rows,
              [category]: col.rows[category].filter(c => c.id !== cardId)
            }
          };
        }
        return col;
      }));
    }
  }, []);

  const resetBoard = useCallback(() => {
    if (!isConfirmingClear) {
      setIsConfirmingClear(true);
      // Auto-cancel confirmation after 3 seconds if not clicked again
      const timer = setTimeout(() => setIsConfirmingClear(false), 3000);
      return () => clearTimeout(timer);
    } else {
      setColumns([]);
      setIsConfirmingClear(false);
    }
  }, [isConfirmingClear]);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 font-sans selection:bg-indigo-100">
      {/* Left Area: Header + Board */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 shrink-0 z-50 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <i className="fa-solid fa-scroll text-xl"></i>
            </div>
            <div>
              <h1 className="text-xl font-black text-slate-800 tracking-tight leading-none">EduDesign Canvas</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Design Learning Ecosystems</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Columns</span>
              <span className="text-sm font-black text-indigo-600 leading-none">{columns.length}</span>
            </div>
            
            <div className="h-8 w-[1px] bg-slate-200"></div>
            
            <button 
              onClick={resetBoard}
              className={`group relative px-6 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center gap-2 border-2 ${
                isConfirmingClear 
                  ? 'bg-rose-600 border-rose-600 text-white shadow-lg shadow-rose-200' 
                  : 'bg-white border-slate-200 text-slate-500 hover:border-rose-400 hover:text-rose-600'
              }`}
            >
              <i className={`fa-solid ${isConfirmingClear ? 'fa-triangle-exclamation animate-bounce' : 'fa-trash-can'} transition-transform group-hover:scale-110`}></i>
              <span>{isConfirmingClear ? 'Confirm Clear?' : 'Clear Board'}</span>
              
              {isConfirmingClear && (
                <div className="absolute bottom-0 left-0 h-1 bg-white/30 animate-[shrink_3s_linear_forwards]" style={{ width: '100%' }}></div>
              )}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-12 custom-scrollbar relative">
          {/* Subtle grid pattern for visual context */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          <div className="relative z-10">
            <Board 
              columns={columns} 
              onDrop={handleDrop} 
              onRemove={removeCard}
              onDragStart={handleDragStart}
            />
          </div>
        </main>
      </div>

      {/* Right Area: Palette */}
      <Sidebar cards={paletteCards} onDragStart={handleDragStart} />

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default App;
