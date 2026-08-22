import React, { useEffect, useState } from 'react';
import { BookOpen, Clock, Target, Bookmark } from 'lucide-react';
import { executiveReaderService } from '../../services/executiveReaderService';
import { readerService } from '../../services/readerService';

export default function ExecutiveIndicators() {
  const [stats, setStats] = useState(() => executiveReaderService.getReadingStats());

  useEffect(() => {
    const updateStats = () => {
      setStats(executiveReaderService.getReadingStats());
    };

    const unsubReader = readerService.subscribe(updateStats);
    const unsubExec = executiveReaderService.subscribe(updateStats);

    return () => {
      unsubReader();
      unsubExec();
    };
  }, []);

  const indicators = [
    {
      label: 'LETTRES LUES',
      value: stats.readCount,
      unit: 'dossiers',
      icon: BookOpen,
      color: '#C8102E',
    },
    {
      label: 'MINUTES Ã‰COUTÃ‰ES',
      value: stats.minutesListened,
      unit: 'min',
      icon: Clock,
      color: '#D4AF37',
    },
    {
      label: 'THÃˆMES EXPLORÃ‰S',
      value: stats.themesExploredCount,
      unit: 'piliers',
      icon: Target,
      color: '#3B82F6',
    },
    {
      label: 'SAUVEGARDÃ‰ES',
      value: stats.savedCount,
      unit: 'sÃ©lections',
      icon: Bookmark,
      color: '#10B981',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
      {indicators.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#09090c] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                {item.label}
              </span>
              <Icon className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white transition-colors" />
            </div>

            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">
                {item.value}
              </span>
              <span className="text-[9px] font-mono text-neutral-400 uppercase">
                {item.unit}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
