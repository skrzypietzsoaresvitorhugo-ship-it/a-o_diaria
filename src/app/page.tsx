"use client";

import { useState, useEffect } from 'react';
import { useTasks } from '@/hooks/useTasks';
import { TaskItem } from '@/components/TaskItem';
import { AddTaskDialog } from '@/components/AddTaskDialog';
import { EditTaskDialog } from '@/components/EditTaskDialog';
import { StatsCard } from '@/components/StatsCard';
import { PomodoroTimer } from '@/components/PomodoroTimer';
import { MotivationalBanner } from '@/components/MotivationalBanner';
import { SettingsSheet } from '@/components/SettingsSheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Timer, BarChart3, Trophy, Settings } from 'lucide-react';
import { getGreeting, getUserName, setUserName } from '@/lib/utils-app';
import { Task } from '@/lib/types';

export default function Home() {
  const { tasks, stats, addTask, toggleTask, deleteTask, editTask, addFocusTime } = useTasks();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showPomodoro, setShowPomodoro] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserNameState] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const name = getUserName();
    setUserNameState(name);
    
    const savedImage = localStorage.getItem('profileImage') || '';
    setProfileImage(savedImage);
    
    if (name === 'Usuário') {
      setShowSettings(true);
    }
  }, []);

  const handleSaveName = (name: string) => {
    setUserName(name);
    setUserNameState(name);
  };

  const handleSettingsClose = () => {
    setShowSettings(false);
    // Atualiza a foto de perfil quando fecha as configurações
    const savedImage = localStorage.getItem('profileImage') || '';
    setProfileImage(savedImage);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar 
              className="w-14 h-14 border-2 border-blue-500 shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setShowSettings(true)}
            >
              <AvatarImage src={profileImage} alt={userName} />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg font-bold">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-orange-600 bg-clip-text text-transparent">
                Ação Diária
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                {getGreeting()}, {userName} 👋
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowSettings(true)}
            className="h-10 w-10"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </div>

        {/* Frase Motivacional */}
        <MotivationalBanner />

        {/* Stats Card */}
        <StatsCard tasks={tasks} stats={stats} />

        {/* Tarefas Pendentes */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Hoje você tem {pendingTasks.length} {pendingTasks.length === 1 ? 'tarefa' : 'tarefas'} para cumprir
            </h2>
          </div>

          <div className="space-y-3">
            {pendingTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={() => setEditingTask(task)}
              />
            ))}
            
            {pendingTasks.length === 0 && (
              <div className="text-center py-12 px-4 bg-white dark:bg-gray-900 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Parabéns! Todas as tarefas concluídas!
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Você está arrasando hoje!
                </p>
              </div>
            )}
          </div>

          <AddTaskDialog onAdd={addTask} />
        </div>

        {/* Tarefas Concluídas */}
        {completedTasks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-emerald-500" />
              Concluídas ({completedTasks.length})
            </h3>
            <div className="space-y-3">
              {completedTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onEdit={() => setEditingTask(task)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
          <Button
            onClick={() => setShowPomodoro(true)}
            size="lg"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Timer className="w-5 h-5 mr-2" />
            Modo Foco
          </Button>
          <Button
            onClick={() => setShowStats(true)}
            size="lg"
            variant="outline"
            className="border-2 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <BarChart3 className="w-5 h-5 mr-2" />
            Estatísticas
          </Button>
        </div>
      </div>

      {/* Dialogs */}
      <EditTaskDialog
        task={editingTask}
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        onEdit={editTask}
      />

      <PomodoroTimer
        open={showPomodoro}
        onClose={() => setShowPomodoro(false)}
        onComplete={addFocusTime}
      />

      {/* Stats Dialog */}
      <Dialog open={showStats} onOpenChange={setShowStats}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Suas Estatísticas
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-950/30 dark:to-orange-900/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-orange-700 dark:text-orange-400">
                  {stats.currentStreak}
                </div>
                <div className="text-sm text-orange-600 dark:text-orange-500 mt-1">
                  Dias Consecutivos
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/30 dark:to-blue-900/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                  {stats.longestStreak}
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-500 mt-1">
                  Melhor Sequência
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-950/30 dark:to-purple-900/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                  {stats.totalPoints}
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-500 mt-1">
                  Pontos Totais
                </div>
              </div>
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-950/30 dark:to-emerald-900/30 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                  {stats.totalTasksCompleted}
                </div>
                <div className="text-sm text-emerald-600 dark:text-emerald-500 mt-1">
                  Tarefas Completas
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tarefas hoje</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{stats.tasksCompletedToday}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tarefas esta semana</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{stats.tasksCompletedThisWeek}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tempo de foco hoje</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{stats.focusTimeToday} min</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <span className="text-sm text-gray-600 dark:text-gray-400">Tempo de foco esta semana</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{stats.focusTimeThisWeek} min</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Sheet */}
      <SettingsSheet
        open={showSettings}
        onClose={handleSettingsClose}
        userName={userName}
        onSaveName={handleSaveName}
      />
    </div>
  );
}
