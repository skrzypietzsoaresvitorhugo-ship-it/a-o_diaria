"use client";

import { Task, Stats } from '@/lib/types';
import { Progress } from '@/components/ui/progress';
import { Flame, Trophy, Target } from 'lucide-react';

interface StatsCardProps {
  tasks: Task[];
  stats: Stats;
}

export function StatsCard({ tasks, stats }: StatsCardProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-2xl p-6 text-white shadow-2xl">
      <div className="space-y-4">
        {/* Progresso do Dia */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium opacity-90">Progresso do Dia</span>
            <span className="text-sm font-bold">{completedTasks}/{totalTasks}</span>
          </div>
          <Progress value={progress} className="h-3 bg-white/20" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Flame className="w-5 h-5 mx-auto mb-1 text-orange-300" />
            <div className="text-2xl font-bold">{stats.currentStreak}</div>
            <div className="text-xs opacity-80">Dias</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Trophy className="w-5 h-5 mx-auto mb-1 text-yellow-300" />
            <div className="text-2xl font-bold">{stats.totalPoints}</div>
            <div className="text-xs opacity-80">Pontos</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
            <Target className="w-5 h-5 mx-auto mb-1 text-emerald-300" />
            <div className="text-2xl font-bold">{stats.tasksCompletedToday}</div>
            <div className="text-xs opacity-80">Hoje</div>
          </div>
        </div>
      </div>
    </div>
  );
}
