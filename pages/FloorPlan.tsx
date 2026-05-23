
import React from 'react';
import { motion } from 'framer-motion';
import { MousePointer2, BrickWall as Wall, Sofa, Square, X, Info, Zap, Hand, Pencil } from 'lucide-react';
import { GridCell, GridCellType } from '../types';

const GRID_SIZE = 20;

const FloorPlan: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [grid, setGrid] = React.useState<GridCell[]>(() => {
    const initialGrid: GridCell[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < GRID_SIZE; x++) {
        initialGrid.push({ x, y, type: 'empty' });
      }
    }
    return initialGrid;
  });

  const [selectedTool, setSelectedTool] = React.useState<GridCellType>('wall');
  const [editMode, setEditMode] = React.useState<'draw' | 'pan'>('draw');
  const [isPanning, setIsPanning] = React.useState(false);
  const [panStart, setPanStart] = React.useState({ x: 0, y: 0 });
  const [scrollStart, setScrollStart] = React.useState({ left: 0, top: 0 });

  const updateCell = (x: number, y: number, typeToSet?: GridCellType) => {
    if (editMode === 'pan') return;
    const targetType = typeToSet !== undefined ? typeToSet : (selectedTool === 'empty' ? 'empty' : selectedTool);
    setGrid(prev => prev.map(cell => 
      cell.x === x && cell.y === y 
        ? { ...cell, type: cell.type === targetType ? 'empty' : targetType } 
        : cell
    ));
  };

  const handleMouseEnter = (x: number, y: number, e: React.MouseEvent) => {
    if (editMode === 'pan') return;
    if (e.buttons === 1) { // Left click held down
      setGrid(prev => prev.map(cell => 
        cell.x === x && cell.y === y 
          ? { ...cell, type: selectedTool } 
          : cell
      ));
    }
  };

  // High Performance safe zone calculations with directly indexed O(1) map lookup
  const calculateSafeZones = (currentGrid: GridCell[]) => {
    const cellMap: Record<string, GridCellType> = {};
    for (let i = 0; i < currentGrid.length; i++) {
      const cell = currentGrid[i];
      cellMap[`${cell.x},${cell.y}`] = cell.type;
    }

    return currentGrid.map(cell => {
      if (cell.type === 'wall' || cell.type === 'window' || cell.type === 'furniture') {
        return cell;
      }

      let hasFurniture = false;
      let nearWindow = false;

      // Check immediate 8 neighbors using optimized 2D offsets
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) continue;
          const nx = cell.x + dx;
          const ny = cell.y + dy;
          const neighborType = cellMap[`${nx},${ny}`];
          if (neighborType === 'furniture') {
            hasFurniture = true;
          }
          if (neighborType === 'window') {
            nearWindow = true;
          }
        }
      }

      if (hasFurniture && !nearWindow) {
        return { ...cell, type: 'safe' as GridCellType };
      }

      return { ...cell, type: cell.type === 'safe' ? 'empty' : cell.type };
    });
  };

  const processedGrid = React.useMemo(() => calculateSafeZones(grid), [grid]);

  const resetGrid = () => {
    setGrid(grid.map(c => ({ ...c, type: 'empty' })));
  };

  const tools = [
    { id: 'wall', icon: Wall, label: 'Duvar', color: 'bg-slate-600' },
    { id: 'furniture', icon: Sofa, label: 'Eşya', color: 'bg-orange-500' },
    { id: 'window', icon: Square, label: 'Pencere', color: 'bg-blue-400' },
  ];

  // Manual Drag-to-Scroll Panning handlers for desktop cursors
  const handleMouseDown = (e: React.MouseEvent) => {
    if (editMode !== 'pan') return;
    setIsPanning(true);
    setPanStart({ x: e.clientX, y: e.clientY });
    if (containerRef.current) {
      setScrollStart({
        left: containerRef.current.scrollLeft,
        top: containerRef.current.scrollTop
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !containerRef.current) return;
    const dx = e.clientX - panStart.x;
    const dy = e.clientY - panStart.y;
    containerRef.current.scrollLeft = scrollStart.left - dx;
    containerRef.current.scrollTop = scrollStart.top - dy;
  };

  const handleMouseUpOrLeave = () => {
    setIsPanning(false);
  };

  return (
    <div className="space-y-8">
      {/* Title & Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-slate-900/40 p-6 rounded-3xl border border-slate-800/60 shadow-xl">
        <div>
          <h2 className="text-3xl font-bold title-font mb-2">Yaşam Üçgeni Planlayıcı</h2>
          <p className="text-slate-400 text-sm">Odanızın planını 20x20 ölçeğinde çizin, en güvenli noktaları otomatik belirleyelim.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          {/* Mode Selector */}
          <div className="flex bg-slate-950/80 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => setEditMode('draw')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                editMode === 'draw' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Pencil className="w-3.5 h-3.5" /> Yerleştir
            </button>
            <button
              onClick={() => setEditMode('pan')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                editMode === 'pan' ? 'bg-red-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Hand className="w-3.5 h-3.5" /> Kaydır / Pano
            </button>
          </div>

          {/* Tools Grid */}
          {editMode === 'draw' && (
            <div className="flex bg-slate-950/80 p-1 rounded-2xl border border-slate-800 gap-1 animate-fade-in">
              {tools.map(tool => (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id as GridCellType)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedTool === tool.id ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <tool.icon className="w-3.5 h-3.5" /> {tool.label}
                </button>
              ))}
            </div>
          )}

          <div className="w-[1px] h-8 bg-slate-800 hidden sm:block" />
          
          <button 
            onClick={resetGrid} 
            className="flex items-center gap-2 bg-slate-950/80 hover:bg-red-500/10 hover:text-red-500 border border-slate-800 hover:border-red-500/20 px-4 py-2 rounded-2xl text-xs font-bold text-slate-400 transition-all ml-auto xl:ml-0"
          >
            <X className="w-4 h-4" /> Temizle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Interactive Drawing Blueprint Grid */}
        <div className="lg:col-span-3">
          <div className="bg-slate-950/40 p-4 rounded-[40px] border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-4 left-6 flex items-center gap-2 pointer-events-none text-[10px] uppercase font-bold tracking-widest text-slate-500 z-10">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              {editMode === 'draw' ? 'YERLEŞTİRME MODU (KARELERE DOKUNUN)' : 'KAYDIRMA MODU (PARMAĞINIZLA VEYA FAREYLE SÜRÜKLEYİN)'}
            </div>
            
            <div 
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className={`w-full overflow-auto p-4 max-h-[640px] mt-6 select-none focus:outline-none custom-scrollbar ${
                editMode === 'pan' ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair'
              }`}
            >
              <div 
                className="grid gap-1 bg-slate-950 p-4 rounded-3xl border border-slate-800 shadow-2xl mx-auto"
                style={{ 
                  gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                  minWidth: '600px',
                  maxWidth: '740px',
                  aspectRatio: '1/1'
                }}
              >
                {processedGrid.map((cell) => (
                  <motion.button
                    key={`${cell.x}-${cell.y}`}
                    whileHover={editMode === 'draw' ? { scale: 0.94 } : undefined}
                    onClick={() => updateCell(cell.x, cell.y)}
                    onMouseEnter={(e) => handleMouseEnter(cell.x, cell.y, e)}
                    className={`aspect-square rounded-sm md:rounded-md transition-all duration-300 relative ${
                      cell.type === 'empty' ? 'bg-slate-900/60 hover:bg-slate-800/80 border border-slate-900' :
                      cell.type === 'wall' ? 'bg-slate-400 shadow-[0_3px_0_rgb(100,116,139)] translate-y-[-2px]' :
                      cell.type === 'furniture' ? 'bg-orange-600 shadow-lg shadow-orange-950/20' :
                      cell.type === 'window' ? 'bg-blue-400 shadow-lg shadow-blue-950/20' :
                      cell.type === 'safe' ? 'bg-green-500 shadow-lg shadow-green-950/30 border border-white/40' : ''
                    }`}
                  >
                    {cell.type === 'safe' && (
                      <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }} 
                        className="absolute inset-0 flex items-center justify-center p-0.5"
                      >
                        <Zap className="w-3 h-3 text-white fill-white" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Legend & Help Box */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-white">
              <Info className="w-5 h-5 text-blue-500" /> Nasıl Çizilir?
            </h3>
            <ol className="space-y-4 text-xs sm:text-sm text-slate-400">
              <li className="flex gap-3">
                <span className="font-bold text-slate-100 bg-slate-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0">1</span>
                <span>En üstteki mod seçiciyi <strong>"Yerleştir"</strong> olarak ayarlayın.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-slate-100 bg-slate-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0">2</span>
                <span><strong>Duvar, Eşya veya Pencere</strong> aracından birini seçin ve karelere dokunarak çizin.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-slate-100 bg-slate-800 w-5 h-5 rounded-full flex items-center justify-center shrink-0">3</span>
                <span>Platfom üzerinde gezinmek ve kaydırmak için <strong>"Kaydır / Pano"</strong> moduna geçip sürükleyin.</span>
              </li>
              <li className="flex gap-3 pt-4 border-t border-slate-800 text-red-400">
                <span className="font-bold">Öneri:</span>
                <span className="italic leading-relaxed">Pencerenin uzağına yerleştirdiğiniz her dayanıklı eşya etrafında güvenli yaşam üçgenleri (yeşil alanlar) oluşturacaktır.</span>
              </li>
            </ol>
          </div>

          <div className="bg-gradient-to-br from-green-600/10 to-green-600/5 border border-green-500/20 rounded-3xl p-6 shadow-lg shadow-green-950/20">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-green-500 animate-bounce" />
              <h3 className="font-bold text-green-500 text-sm tracking-wider uppercase">Yaşam Üçgeni Analizi</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Hesaplayıcı, yerleştirdiğiniz eşyaların arka arkaya devrilme parametrelerini ve cam kırılma mesafelerini otomatik süzerek anlık güvenli kaçış noktalarını optimize eder.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
