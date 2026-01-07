
import React, { useState } from 'react';
import { ColumnData, RowCategory, DragItem } from '../types';
import { BOARD_ROWS, COLUMN_COLORS, CATEGORY_ICONS } from '../constants';
import CardItem from './CardItem';

interface BoardProps {
  columns: ColumnData[];
  onDrop: (targetColId: string | null, targetRow: RowCategory) => void;
  onRemove: (colId: string, row: RowCategory, cardId: string) => void;
  onDragStart: (item: DragItem) => void;
}

const Board: React.FC<BoardProps> = ({ columns, onDrop, onRemove, onDragStart }) => {
  const [activeDropZone, setActiveDropZone] = useState<{ colId: string | null; row: RowCategory } | null>(null);

  const handleDragOver = (e: React.DragEvent, colId: string | null, row: RowCategory) => {
    e.preventDefault();
    setActiveDropZone({ colId, row });
  };

  const handleDragLeave = () => {
    setActiveDropZone(null);
  };

  const handleDropLocal = (e: React.DragEvent, colId: string | null, row: RowCategory) => {
    e.preventDefault();
    setActiveDropZone(null);
    onDrop(colId, row);
  };

  // Helper to extract the border class from our predefined color palette strings
  const getBorderClass = (colorClasses: string) => {
    return colorClasses.split(' ').find(c => c.startsWith('border-')) || 'border-slate-100';
  };

  const numCols = columns.length;

  return (
    <div className="min-w-max flex flex-col gap-8">
      {BOARD_ROWS.map((rowName) => {
        const isApproachRow = rowName === 'Learning Approach';
        
        return (
          <div key={rowName} className="flex flex-col gap-3">
            {/* Row Label */}
            <div className="flex items-center gap-3 ml-1">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md ${
                isApproachRow ? 'bg-indigo-600' : 'bg-slate-400'
              }`}>
                <i className={`${CATEGORY_ICONS[rowName]} text-sm`}></i>
              </div>
              <h3 className={`text-sm font-bold uppercase tracking-[0.15em] ${
                isApproachRow ? 'text-indigo-900' : 'text-slate-500'
              }`}>
                {rowName}
              </h3>
            </div>

            {/* Row Content (Dynamic Columns) */}
            <div className="flex gap-4 min-h-[120px]">
              {isApproachRow ? (
                // Row 1: The Learning Approach Row (Main Column Headers)
                <>
                  {columns.map((col, idx) => (
                    <div 
                      key={col.id} 
                      className={`relative group w-72 p-5 rounded-2xl border-2 shadow-sm transition-all flex flex-col justify-center ${COLUMN_COLORS[idx % COLUMN_COLORS.length]}`}
                    >
                      <button 
                        onClick={() => onRemove(col.id, 'Learning Approach', col.classificationCard.id)}
                        className="absolute -top-2 -right-2 w-7 h-7 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-500 hover:border-rose-200 flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all z-20"
                      >
                        <i className="fa-solid fa-xmark text-xs"></i>
                      </button>
                      <CardItem name={col.classificationCard.name} />
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1 h-4 bg-current opacity-20"></div>
                    </div>
                  ))}
                  
                  {/* Plus zone to add new column */}
                  <div 
                    onDragOver={(e) => handleDragOver(e, null, 'Learning Approach')}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDropLocal(e, null, 'Learning Approach')}
                    className={`w-72 h-24 flex items-center justify-center border-2 border-dashed rounded-2xl transition-all ${
                      activeDropZone?.colId === null && activeDropZone?.row === 'Learning Approach'
                        ? 'bg-indigo-50 border-indigo-400 scale-[0.98] shadow-inner'
                        : 'border-slate-300 hover:border-indigo-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1 text-slate-400">
                      <i className="fa-solid fa-plus-circle text-2xl"></i>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Add Approach</span>
                    </div>
                  </div>
                </>
              ) : (
                // Rows 2-5: Category Cells that follow the column's color
                columns.length === 0 ? (
                  <div className="w-full h-32 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                    <p className="text-xs text-slate-400 italic font-medium">Add a learning approach above to unlock this path</p>
                  </div>
                ) : (
                  columns.map((col, idx) => {
                    const rowCards = col.rows[rowName as Exclude<RowCategory, 'Learning Approach'>];
                    const isActive = activeDropZone?.colId === col.id && activeDropZone?.row === rowName;
                    const colColorSet = COLUMN_COLORS[idx % COLUMN_COLORS.length];
                    const borderClass = getBorderClass(colColorSet);

                    return (
                      <div 
                        key={`${col.id}-${rowName}`}
                        onDragOver={(e) => handleDragOver(e, col.id, rowName)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDropLocal(e, col.id, rowName)}
                        className={`w-72 min-h-[160px] p-4 rounded-2xl border-2 transition-all flex flex-col gap-3 relative ${
                          isActive 
                            ? 'bg-indigo-50 border-indigo-500 ring-4 ring-indigo-500/10 z-10' 
                            : `bg-white/40 ${borderClass} shadow-sm border-opacity-60`
                        }`}
                      >
                        {/* Decorative background line to reinforce column identity */}
                        <div className={`absolute inset-0 rounded-2xl pointer-events-none opacity-[0.03] ${colColorSet.split(' ')[0]}`}></div>
                        
                        {rowCards.map((card) => (
                          <div key={card.id} className="relative group">
                             <button 
                                onClick={() => onRemove(col.id, rowName, card.id)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-white border border-slate-100 rounded-full text-slate-300 hover:text-rose-500 hover:border-rose-100 flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all z-20"
                              >
                                <i className="fa-solid fa-xmark text-[10px]"></i>
                              </button>
                            <CardItem name={card.name} />
                          </div>
                        ))}
                        
                        <div className={`mt-auto pt-2 flex items-center justify-center border-2 border-dashed rounded-xl h-12 transition-all group ${
                          isActive 
                            ? 'border-indigo-400 bg-white shadow-inner' 
                            : `border-slate-200 border-opacity-40 hover:border-opacity-100 hover:${borderClass}`
                        }`}>
                          <i className={`fa-solid fa-arrow-down-long text-sm ${
                            isActive ? 'text-indigo-500 animate-bounce' : 'text-slate-300 opacity-50'
                          }`}></i>
                        </div>
                      </div>
                    );
                  })
                )
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Board;
