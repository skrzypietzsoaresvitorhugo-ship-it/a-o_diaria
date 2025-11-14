"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Stats } from '@/lib/types';
import { Trophy, Flame, Target, Zap, Crown, Star, Gift } from 'lucide-react';

interface AchievementsDialogProps {
  open: boolean;
  onClose: () => void;
  stats: Stats;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirement: number;
  currentProgress: number;
  unlocked: boolean;
  category: 'streak' | 'tasks' | 'focus' | 'special';
  reward?: string;
  color: string;
}

export function AchievementsDialog({ open, onClose, stats }: AchievementsDialogProps) {
  // Calcular dias consecutivos (baseado no currentStreak)
  const consecutiveDays = stats.currentStreak;

  // Definir conquistas com sistema de recompensas progressivas
  const achievements: Achievement[] = [
    // Conquistas de Sequência (Streak)
    {
      id: 'streak-7',
      title: 'Uma Semana Forte',
      description: 'Complete tarefas por 7 dias consecutivos',
      icon: <Flame className="w-6 h-6" />,
      requirement: 7,
      currentProgress: consecutiveDays,
      unlocked: consecutiveDays >= 7,
      category: 'streak',
      reward: '🎁 +50 pontos de bônus',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 'streak-14',
      title: 'Duas Semanas Imparável',
      description: 'Complete tarefas por 14 dias consecutivos',
      icon: <Flame className="w-6 h-6" />,
      requirement: 14,
      currentProgress: consecutiveDays,
      unlocked: consecutiveDays >= 14,
      category: 'streak',
      reward: '🎁 +100 pontos de bônus',
      color: 'from-orange-600 to-red-600',
    },
    {
      id: 'streak-30',
      title: 'Mestre da Consistência',
      description: 'Complete tarefas por 30 dias consecutivos',
      icon: <Crown className="w-6 h-6" />,
      requirement: 30,
      currentProgress: consecutiveDays,
      unlocked: consecutiveDays >= 30,
      category: 'streak',
      reward: '🎁 +200 pontos + Badge Especial',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'streak-60',
      title: 'Lenda dos 2 Meses',
      description: 'Complete tarefas por 60 dias consecutivos',
      icon: <Star className="w-6 h-6" />,
      requirement: 60,
      currentProgress: consecutiveDays,
      unlocked: consecutiveDays >= 60,
      category: 'streak',
      reward: '🎁 +500 pontos + 5% desconto Premium',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'streak-90',
      title: 'Campeão dos 3 Meses',
      description: 'Complete tarefas por 90 dias consecutivos',
      icon: <Trophy className="w-6 h-6" />,
      requirement: 90,
      currentProgress: consecutiveDays,
      unlocked: consecutiveDays >= 90,
      category: 'streak',
      reward: '🎁 +1000 pontos + 10% desconto Premium',
      color: 'from-blue-500 to-purple-500',
    },
    {
      id: 'streak-180',
      title: 'Lendário - 6 Meses',
      description: 'Complete tarefas por 180 dias consecutivos',
      icon: <Crown className="w-6 h-6" />,
      requirement: 180,
      currentProgress: consecutiveDays,
      unlocked: consecutiveDays >= 180,
      category: 'special',
      reward: '🎉 +2000 pontos + 15% desconto Premium PERMANENTE',
      color: 'from-yellow-400 via-orange-500 to-red-500',
    },

    // Conquistas de Tarefas
    {
      id: 'tasks-10',
      title: 'Primeiros Passos',
      description: 'Complete 10 tarefas no total',
      icon: <Target className="w-6 h-6" />,
      requirement: 10,
      currentProgress: stats.totalTasksCompleted,
      unlocked: stats.totalTasksCompleted >= 10,
      category: 'tasks',
      reward: '🎁 +20 pontos',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      id: 'tasks-50',
      title: 'Produtivo',
      description: 'Complete 50 tarefas no total',
      icon: <Target className="w-6 h-6" />,
      requirement: 50,
      currentProgress: stats.totalTasksCompleted,
      unlocked: stats.totalTasksCompleted >= 50,
      category: 'tasks',
      reward: '🎁 +100 pontos',
      color: 'from-emerald-600 to-teal-600',
    },
    {
      id: 'tasks-100',
      title: 'Centenário',
      description: 'Complete 100 tarefas no total',
      icon: <Trophy className="w-6 h-6" />,
      requirement: 100,
      currentProgress: stats.totalTasksCompleted,
      unlocked: stats.totalTasksCompleted >= 100,
      category: 'tasks',
      reward: '🎁 +250 pontos',
      color: 'from-emerald-700 to-teal-700',
    },

    // Conquistas de Foco
    {
      id: 'focus-60',
      title: 'Hora de Foco',
      description: 'Acumule 60 minutos de foco',
      icon: <Zap className="w-6 h-6" />,
      requirement: 60,
      currentProgress: stats.focusTimeToday + stats.focusTimeThisWeek,
      unlocked: (stats.focusTimeToday + stats.focusTimeThisWeek) >= 60,
      category: 'focus',
      reward: '🎁 +50 pontos',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'focus-300',
      title: 'Mestre do Foco',
      description: 'Acumule 300 minutos de foco',
      icon: <Zap className="w-6 h-6" />,
      requirement: 300,
      currentProgress: stats.focusTimeToday + stats.focusTimeThisWeek,
      unlocked: (stats.focusTimeToday + stats.focusTimeThisWeek) >= 300,
      category: 'focus',
      reward: '🎁 +200 pontos',
      color: 'from-purple-600 to-indigo-600',
    },
  ];

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'streak':
        return <Flame className="w-4 h-4" />;
      case 'tasks':
        return <Target className="w-4 h-4" />;
      case 'focus':
        return <Zap className="w-4 h-4" />;
      case 'special':
        return <Crown className="w-4 h-4" />;
      default:
        return <Trophy className="w-4 h-4" />;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'streak':
        return 'Sequência';
      case 'tasks':
        return 'Tarefas';
      case 'focus':
        return 'Foco';
      case 'special':
        return 'Especial';
      default:
        return 'Geral';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2">
            <Trophy className="w-7 h-7 text-yellow-500" />
            Suas Conquistas
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Progresso Geral */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 rounded-xl p-5 border-2 border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  Progresso Total
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {unlockedCount} de {totalCount} conquistas desbloqueadas
                </p>
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {Math.round((unlockedCount / totalCount) * 100)}%
              </div>
            </div>
            <Progress value={(unlockedCount / totalCount) * 100} className="h-3" />
          </div>

          {/* Conquista Especial - 6 Meses */}
          {consecutiveDays >= 180 && (
            <div className="bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 dark:from-yellow-950/30 dark:via-orange-950/30 dark:to-red-950/30 rounded-xl p-6 border-4 border-yellow-400 dark:border-yellow-600 shadow-2xl animate-pulse">
              <div className="flex items-center gap-4 mb-3">
                <div className="p-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900 dark:text-gray-100">
                    🎉 CONQUISTA LENDÁRIA DESBLOQUEADA!
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Você completou 6 meses consecutivos!
                  </p>
                </div>
              </div>
              <div className="bg-white/50 dark:bg-gray-900/50 rounded-lg p-4 backdrop-blur-sm">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100 mb-2">
                  🎁 Recompensa Especial:
                </p>
                <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>✨ +2000 pontos de bônus</li>
                  <li>👑 Badge Lendário exclusivo</li>
                  <li>💎 15% de desconto PERMANENTE no plano Premium</li>
                  <li>🌟 Acesso VIP a recursos futuros</li>
                </ul>
              </div>
            </div>
          )}

          {/* Lista de Conquistas */}
          <div className="space-y-3">
            {achievements.map((achievement) => {
              const progress = Math.min((achievement.currentProgress / achievement.requirement) * 100, 100);
              
              return (
                <div
                  key={achievement.id}
                  className={`relative p-4 rounded-xl border-2 transition-all ${
                    achievement.unlocked
                      ? `bg-gradient-to-br ${achievement.color} bg-opacity-10 border-current shadow-lg`
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Ícone */}
                    <div
                      className={`p-3 rounded-lg ${
                        achievement.unlocked
                          ? `bg-gradient-to-br ${achievement.color} text-white shadow-md`
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }`}
                    >
                      {achievement.icon}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                            {achievement.title}
                            {achievement.unlocked && (
                              <Badge className={`bg-gradient-to-r ${achievement.color} text-white text-xs`}>
                                Desbloqueada
                              </Badge>
                            )}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {achievement.description}
                          </p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1 whitespace-nowrap">
                          {getCategoryIcon(achievement.category)}
                          <span className="text-xs">{getCategoryLabel(achievement.category)}</span>
                        </Badge>
                      </div>

                      {/* Progresso */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            Progresso: {achievement.currentProgress} / {achievement.requirement}
                          </span>
                          <span className="font-bold text-gray-900 dark:text-gray-100">
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>

                      {/* Recompensa */}
                      {achievement.reward && (
                        <div className={`mt-3 p-2 rounded-lg text-sm ${
                          achievement.unlocked
                            ? 'bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm'
                            : 'bg-gray-100 dark:bg-gray-700'
                        }`}>
                          <span className="font-medium text-gray-700 dark:text-gray-300">
                            {achievement.reward}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dica Motivacional */}
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              💡 <strong>Continue assim!</strong> Quanto mais dias consecutivos você mantiver, maiores serão suas recompensas. 
              Ao atingir 6 meses (180 dias), você ganha 15% de desconto permanente no plano Premium!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
