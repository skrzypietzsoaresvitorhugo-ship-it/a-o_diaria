"use client";

import { useState, useRef } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, CreditCard, MessageCircle, Check, Crown, Zap, Star, Camera, User } from 'lucide-react';

interface SettingsSheetProps {
  open: boolean;
  onClose: () => void;
  userName: string;
  onSaveName: (name: string) => void;
}

export function SettingsSheet({ open, onClose, userName, onSaveName }: SettingsSheetProps) {
  const [tempName, setTempName] = useState(userName);
  const [profileImage, setProfileImage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('profileImage') || '';
    }
    return '';
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [notifications, setNotifications] = useState({
    taskReminders: true,
    dailyMotivation: true,
    streakAlerts: false,
    focusMode: true,
  });

  const handleSaveName = () => {
    if (tempName.trim()) {
      onSaveName(tempName.trim());
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setProfileImage(imageUrl);
        localStorage.setItem('profileImage', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const plans = [
    {
      name: 'Básico',
      price: 'R$ 14,00',
      period: '/mês',
      icon: Star,
      color: 'from-blue-500 to-blue-600',
      benefits: [
        'Até 10 tarefas diárias',
        'Estatísticas básicas',
        'Modo Foco Pomodoro',
        'Frases motivacionais',
        'Suporte por email',
      ],
    },
    {
      name: 'Intermediário',
      price: 'R$ 25,99',
      period: '/mês',
      icon: Zap,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      benefits: [
        'Tarefas ilimitadas',
        'Estatísticas avançadas',
        'Modo Foco personalizado',
        'Temas personalizados',
        'Notificações inteligentes',
        'Backup automático',
        'Suporte prioritário',
      ],
    },
    {
      name: 'Premium',
      price: 'R$ 99,00',
      period: '/mês',
      icon: Crown,
      color: 'from-orange-500 to-red-500',
      benefits: [
        'Tudo do Intermediário',
        'Análise de produtividade com IA',
        'Metas e objetivos personalizados',
        'Relatórios semanais detalhados',
        'Integração com calendário',
        'Modo offline completo',
        'Acesso antecipado a novidades',
        'Suporte VIP 24/7',
        'Sessões de coaching mensais',
      ],
    },
  ];

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Configurações
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Editar Perfil */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Editar Perfil
              </h3>
            </div>

            <div className="flex flex-col items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-xl border-2 border-blue-200 dark:border-blue-800">
              {/* Foto de Perfil */}
              <div className="relative group">
                <Avatar className="w-24 h-24 border-4 border-white dark:border-gray-800 shadow-lg">
                  <AvatarImage src={profileImage} alt={userName} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl font-bold">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={handleImageClick}
                  className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-200 group-hover:scale-110"
                  aria-label="Alterar foto de perfil"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Clique no ícone da câmera para alterar sua foto
                </p>
              </div>

              {/* Nome do Usuário */}
              <div className="w-full space-y-2">
                <Label htmlFor="userName" className="text-sm font-medium">
                  Nome de Usuário
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="userName"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    placeholder="Digite seu nome"
                    className="flex-1"
                  />
                  <Button 
                    onClick={handleSaveName} 
                    size="sm"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notificações */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Notificações
              </h3>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="taskReminders" className="text-sm font-medium">
                    Lembretes de Tarefas
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Receba alertas para tarefas pendentes
                  </p>
                </div>
                <Switch
                  id="taskReminders"
                  checked={notifications.taskReminders}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, taskReminders: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="dailyMotivation" className="text-sm font-medium">
                    Motivação Diária
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Frases inspiradoras todo dia
                  </p>
                </div>
                <Switch
                  id="dailyMotivation"
                  checked={notifications.dailyMotivation}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, dailyMotivation: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="streakAlerts" className="text-sm font-medium">
                    Alertas de Sequência
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Avisos sobre dias consecutivos
                  </p>
                </div>
                <Switch
                  id="streakAlerts"
                  checked={notifications.streakAlerts}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, streakAlerts: checked })
                  }
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="space-y-0.5">
                  <Label htmlFor="focusMode" className="text-sm font-medium">
                    Modo Foco
                  </Label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Notificações durante sessões Pomodoro
                  </p>
                </div>
                <Switch
                  id="focusMode"
                  checked={notifications.focusMode}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, focusMode: checked })
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Planos de Assinatura */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Planos de Assinatura
              </h3>
            </div>

            <div className="space-y-4">
              {plans.map((plan) => {
                const Icon = plan.icon;
                return (
                  <div
                    key={plan.name}
                    className={`relative p-5 rounded-xl border-2 ${
                      plan.popular
                        ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
                    } transition-all hover:shadow-lg`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-2 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        Mais Popular
                      </Badge>
                    )}
                    
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${plan.color}`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                            {plan.name}
                          </h4>
                          <div className="flex items-baseline gap-1">
                            <span className={`text-2xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                              {plan.price}
                            </span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {plan.period}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-4">
                      {plan.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 text-white shadow-md`}
                    >
                      Assinar {plan.name}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Suporte */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Suporte 24/7
              </h3>
            </div>

            <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 rounded-xl border-2 border-emerald-200 dark:border-emerald-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 bg-emerald-500 rounded-full">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-gray-100">
                    Precisa de ajuda?
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Estamos disponíveis 24 horas
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                Entre em contato conosco pelo WhatsApp para resolver qualquer problema com o aplicativo ou sua assinatura.
              </p>

              <Button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-md"
                onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Preciso de ajuda com o Ação Diária', '_blank')}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Falar no WhatsApp
              </Button>

              <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
                Resposta em até 2 horas
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
