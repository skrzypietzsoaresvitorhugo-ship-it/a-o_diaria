"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Camera, 
  Bell, 
  CreditCard, 
  MessageCircle, 
  Trophy,
  Check,
  X,
  Crown,
  Zap,
  Star,
  Lock,
  Sparkles
} from 'lucide-react';
import { getUserName, setUserName, getUserAvatar, setUserAvatar, getAchievements } from '@/lib/utils-app';
import { UserStats } from '@/lib/types';

interface SettingsPanelProps {
  open: boolean;
  onClose: () => void;
  onUpdate: () => void;
  stats: UserStats;
  showStats: boolean;
  onShowStatsChange: (show: boolean) => void;
}

export function SettingsPanel({ open, onClose, onUpdate, stats, showStats, onShowStatsChange }: SettingsPanelProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'subscription' | 'achievements'>('profile');
  const [tempName, setTempName] = useState('');
  const [tempAvatar, setTempAvatar] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    if (open) {
      setTempName(getUserName());
      setTempAvatar(getUserAvatar());
    }
  }, [open]);

  const handleSaveProfile = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      setUserAvatar(tempAvatar);
      onUpdate();
    }
  };

  const handleWhatsAppSupport = () => {
    window.open('https://wa.me/5541995986457?text=Olá,%20preciso%20de%20ajuda%20com%20o%20DayAction', '_blank');
  };

  const achievements = getAchievements(stats);
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const achievementProgress = Math.round((unlockedCount / achievements.length) * 100);

  // Calcular desconto baseado em dias consecutivos
  const getDiscountPercentage = () => {
    const days = stats.currentStreak;
    if (days >= 180) return 15; // 6 meses
    if (days >= 90) return 10; // 3 meses
    if (days >= 60) return 8; // 2 meses
    if (days >= 30) return 5; // 1 mês
    return 0;
  };

  const discount = getDiscountPercentage();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Configurações
            </DialogTitle>
          </DialogHeader>

          {/* Tabs */}
          <div className="flex gap-2 px-6 pb-4 overflow-x-auto">
            <Button
              variant={activeTab === 'profile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('profile')}
              className="whitespace-nowrap"
            >
              <User className="w-4 h-4 mr-2" />
              Perfil
            </Button>
            <Button
              variant={activeTab === 'notifications' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('notifications')}
              className="whitespace-nowrap"
            >
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </Button>
            <Button
              variant={activeTab === 'subscription' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('subscription')}
              className="whitespace-nowrap"
            >
              <CreditCard className="w-4 h-4 mr-2" />
              Planos
            </Button>
            <Button
              variant={activeTab === 'achievements' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('achievements')}
              className="whitespace-nowrap"
            >
              <Trophy className="w-4 h-4 mr-2" />
              Conquistas
              {unlockedCount > 0 && (
                <Badge className="ml-2 bg-orange-500">{unlockedCount}</Badge>
              )}
            </Button>
          </div>

          <Separator />

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {/* Perfil */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-24 w-24 border-4 border-blue-500">
                      <AvatarImage src={tempAvatar} alt={tempName} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                        {tempName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        const url = prompt('Cole a URL da sua foto de perfil:');
                        if (url) setTempAvatar(url);
                      }}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Digite seu nome"
                      className="text-base"
                    />
                  </div>

                  <Button
                    onClick={handleSaveProfile}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            )}

            {/* Notificações */}
            {activeTab === 'notifications' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">Notificações de Tarefas</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Receba lembretes das suas tarefas</p>
                    </div>
                  </div>
                  <Button
                    variant={notificationsEnabled ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  >
                    {notificationsEnabled ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-300">
                    💡 As notificações ajudam você a manter o foco e não esquecer suas tarefas importantes!
                  </p>
                </div>
              </div>
            )}

            {/* Planos */}
            {activeTab === 'subscription' && (
              <div className="space-y-6">
                {discount > 0 && (
                  <div className="p-4 bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-950/30 dark:to-orange-900/30 rounded-lg border-2 border-orange-400 dark:border-orange-600 animate-pulse">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      <p className="font-bold text-orange-800 dark:text-orange-300">
                        🎉 Parabéns! Você desbloqueou {discount}% de desconto!
                      </p>
                    </div>
                    <p className="text-sm text-orange-700 dark:text-orange-400">
                      {stats.currentStreak} dias consecutivos de uso. Continue assim para manter seu desconto!
                    </p>
                  </div>
                )}

                {/* Plano Básico */}
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Básico</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-blue-600">R$ 14</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">/mês</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Tarefas ilimitadas
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Modo Foco básico
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Estatísticas semanais
                    </li>
                  </ul>
                  <Button className="w-full" variant="outline">
                    Plano Atual
                  </Button>
                </div>

                {/* Plano Intermediário */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 rounded-xl border-2 border-purple-400 dark:border-purple-600 hover:border-purple-500 dark:hover:border-purple-500 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-purple-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Intermediário</h3>
                      <Badge className="bg-purple-600">Popular</Badge>
                    </div>
                    <div className="text-right">
                      {discount > 0 ? (
                        <>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-through">R$ 25,99</p>
                          <p className="text-3xl font-bold text-purple-600">R$ {(25.99 * (1 - discount / 100)).toFixed(2)}</p>
                        </>
                      ) : (
                        <p className="text-3xl font-bold text-purple-600">R$ 25,99</p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">/mês</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Tudo do Básico
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Modo Foco personalizável
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Estatísticas mensais
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Conquistas exclusivas
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Suporte prioritário
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    Assinar Agora
                  </Button>
                </div>

                {/* Plano Premium */}
                <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 rounded-xl border-2 border-orange-400 dark:border-orange-600 hover:border-orange-500 dark:hover:border-orange-500 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-orange-600" />
                      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Premium</h3>
                      <Badge className="bg-gradient-to-r from-orange-500 to-orange-600">VIP</Badge>
                    </div>
                    <div className="text-right">
                      {discount > 0 ? (
                        <>
                          <p className="text-sm text-gray-500 dark:text-gray-400 line-through">R$ 99,00</p>
                          <p className="text-3xl font-bold text-orange-600">R$ {(99 * (1 - discount / 100)).toFixed(2)}</p>
                        </>
                      ) : (
                        <p className="text-3xl font-bold text-orange-600">R$ 99</p>
                      )}
                      <p className="text-sm text-gray-500 dark:text-gray-400">/mês</p>
                    </div>
                  </div>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Tudo do Intermediário
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Análise de produtividade com IA
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Relatórios personalizados
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Integração com calendários
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Suporte 24/7 via WhatsApp
                    </li>
                    <li className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <Check className="w-4 h-4 text-green-600" />
                      Acesso antecipado a novos recursos
                    </li>
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700">
                    Assinar Premium
                  </Button>
                </div>

                {/* Suporte */}
                <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 rounded-lg border border-green-300 dark:border-green-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Precisa de ajuda?</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fale conosco pelo WhatsApp</p>
                      </div>
                    </div>
                    <Button
                      onClick={handleWhatsAppSupport}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Suporte
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Conquistas */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                {/* Progresso Geral */}
                <div className="text-center p-6 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-950/30 dark:to-orange-950/30 rounded-xl border-2 border-yellow-400 dark:border-yellow-600">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <Sparkles className="w-6 h-6 text-yellow-600" />
                    <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {unlockedCount} / {achievements.length}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Conquistas Desbloqueadas</p>
                  <Progress value={achievementProgress} className="h-3 bg-yellow-200 dark:bg-yellow-900" />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{achievementProgress}% completo</p>
                </div>

                {/* Lista de Conquistas */}
                <div className="grid gap-4">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`
                        p-4 rounded-xl border-2 transition-all duration-300
                        ${achievement.unlocked
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/30 dark:to-orange-950/30 border-yellow-400 dark:border-yellow-600 shadow-lg'
                          : 'bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-60'
                        }
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`text-4xl ${achievement.unlocked ? 'animate-bounce' : 'grayscale'}`}>
                          {achievement.unlocked ? achievement.icon : <Lock className="w-10 h-10 text-gray-400" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-gray-900 dark:text-gray-100">
                              {achievement.title}
                            </h4>
                            {achievement.unlocked && (
                              <Badge className="bg-green-600">
                                <Check className="w-3 h-3 mr-1" />
                                Desbloqueada
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {achievement.description}
                          </p>
                          {achievement.reward && (
                            <div className="flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400 font-medium bg-orange-100 dark:bg-orange-950/30 px-2 py-1 rounded-full inline-flex">
                              <Trophy className="w-3 h-3" />
                              {achievement.reward}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mensagem Especial para Conquista Máxima */}
                {stats.currentStreak >= 180 && (
                  <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl border-2 border-purple-400 dark:border-purple-600 animate-pulse">
                    <div className="flex items-center gap-3 mb-3">
                      <Crown className="w-8 h-8 text-purple-600" />
                      <p className="text-xl font-bold text-purple-800 dark:text-purple-300">
                        🎉 Conquista Máxima Alcançada!
                      </p>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-400">
                      Você ganhou 15% de desconto permanente no plano Premium! Parabéns por sua dedicação e consistência! 🏆
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
