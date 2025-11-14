"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { UserStats, Task } from '@/lib/types';
import { Flame, Trophy, Star, TrendingUp, Target, Zap, Calendar } from 'lucide-react';
import { calculateDailyProgress } from '@/lib/utils-app';

interface StatsDialogProps {
  open: boolean;
  onClose: () => void;
  stats: UserStats;
  tasks: Task[];
}

export function StatsDialog({ open, onClose, stats, tasks }: StatsDialogProps) {
  const dailyProgress = calculateDailyProgress(tasks);
  const weeklyProgress = Math.min(Math.round((stats.tasksCompletedThisWeek / 35) * 100), 100);

  // Dados para gráfico semanal (simulado)
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const currentDay = new Date().getDay();
  
  // Simular dados da semana
  const weekData = weekDays.map((day, index) => {
    if (index > currentDay) return 0;
    if (index === currentDay) return stats.tasksCompletedToday;
    return Math.floor(Math.random() * 8) + 2; // Simulação
  });

  const maxTasks = Math.max(...weekData, 10);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Suas Estatísticas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Cards de Estatísticas Principais */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Flame className="w-6 h-6" />
                <span className="text-2xl font-bold">{stats.currentStreak}</span>
              </div>
              <p className="text-xs opacity-90">Dias Seguidos</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Star className="w-6 h-6" />
                <span className="text-2xl font-bold">{stats.totalPoints}</span>
              </div>
              <p className="text-xs opacity-90">Pontos Totais</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Trophy className="w-6 h-6" />
                <span className="text-2xl font-bold">{stats.totalTasksCompleted}</span>
              </div>
              <p className="text-xs opacity-90">Tarefas Totais</p>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <Zap className="w-6 h-6" />
                <span className="text-2xl font-bold">{stats.focusTimeToday}</span>
              </div>
              <p className="text-xs opacity-90">Min. de Foco</p>
            </div>
          </div>

          {/* Progresso Diário */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Progresso Diário</h3>
              </div>
              <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{dailyProgress}%</span>
            </div>
            <Progress value={dailyProgress} className="h-4 bg-blue-200 dark:bg-blue-900" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {stats.tasksCompletedToday} de {tasks.length} tarefas concluídas hoje
            </p>
          </div>

          {/* Progresso Semanal */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <h3 className="font-bold text-gray-900 dark:text-gray-100">Progresso Semanal</h3>
              </div>
              <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{weeklyProgress}%</span>
            </div>
            <Progress value={weeklyProgress} className="h-4 bg-purple-200 dark:bg-purple-900" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {stats.tasksCompletedThisWeek} tarefas concluídas esta semana
            </p>
          </div>

          {/* Gráfico Semanal */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-bold text-gray-900 dark:text-gray-100">Tarefas por Dia</h3>
            </div>
            
            <div className="flex items-end justify-between gap-2 h-40">
              {weekData.map((count, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full flex items-end justify-center h-32">
                    <div
                      className={`
                        w-full rounded-t-lg transition-all duration-500
                        ${index === currentDay 
                          ? 'bg-gradient-to-t from-blue-500 to-blue-600' 
                          : 'bg-gradient-to-t from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700'
                        }
                      `}
                      style={{ height: `${(count / maxTasks) * 100}%` }}
                    >
                      {count > 0 && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-gray-700 dark:text-gray-300">
                          {count}
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`
                    text-xs font-medium
                    ${index === currentDay 
                      ? 'text-blue-600 dark:text-blue-400 font-bold' 
                      : 'text-gray-500 dark:text-gray-400'
                    }
                  `}>
                    {weekDays[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recordes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 rounded-xl p-4 border-2 border-amber-300 dark:border-amber-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Maior Sequência</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.longestStreak} dias</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-xl p-4 border-2 border-green-300 dark:border-green-700">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Tempo de Foco Semanal</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.focusTimeThisWeek} min</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
