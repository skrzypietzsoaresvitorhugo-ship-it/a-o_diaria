"use client";

import { useState, useEffect } from 'react';
import { Task, Stats } from '@/lib/types';
import { TASK_POINTS } from '@/lib/constants';
import { isToday, isThisWeek, formatDate } from '@/lib/utils-app';

const STORAGE_KEY = 'acao-diaria-tasks';
const STATS_KEY = 'acao-diaria-stats';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats>({
    currentStreak: 0,
    longestStreak: 0,
    totalPoints: 0,
    totalTasksCompleted: 0,
    tasksCompletedToday: 0,
    tasksCompletedThisWeek: 0,
    focusTimeToday: 0,
    focusTimeThisWeek: 0,
  });

  // Carregar dados do localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    const savedStats = localStorage.getItem(STATS_KEY);

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks).map((task: Task) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        completedAt: task.completedAt ? new Date(task.completedAt) : undefined,
      }));
      setTasks(parsedTasks);
    }

    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Salvar tasks no localStorage
  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  // Salvar stats no localStorage
  useEffect(() => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  }, [stats]);

  // Atualizar estatísticas
  useEffect(() => {
    const completedTasks = tasks.filter(t => t.completed);
    const tasksToday = completedTasks.filter(t => t.completedAt && isToday(t.completedAt));
    const tasksThisWeek = completedTasks.filter(t => t.completedAt && isThisWeek(t.completedAt));

    setStats(prev => ({
      ...prev,
      totalTasksCompleted: completedTasks.length,
      tasksCompletedToday: tasksToday.length,
      tasksCompletedThisWeek: tasksThisWeek.length,
      totalPoints: completedTasks.reduce((sum, task) => sum + task.points, 0),
    }));
  }, [tasks]);

  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      completed: false,
      createdAt: new Date(),
      points: TASK_POINTS,
    };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === id) {
        const isCompleting = !task.completed;
        const now = new Date();
        
        if (isCompleting) {
          // Atualizar streak
          const today = formatDate(now);
          const lastDate = stats.lastCompletionDate;
          
          let newStreak = 1;
          if (lastDate) {
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayStr = formatDate(yesterday);
            
            if (lastDate === yesterdayStr || lastDate === today) {
              newStreak = stats.currentStreak + (lastDate === today ? 0 : 1);
            }
          }
          
          setStats(prev => ({
            ...prev,
            currentStreak: newStreak,
            longestStreak: Math.max(prev.longestStreak, newStreak),
            lastCompletionDate: today,
          }));
        }
        
        return {
          ...task,
          completed: isCompleting,
          completedAt: isCompleting ? now : undefined,
        };
      }
      return task;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const editTask = (id: string, title: string) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, title } : task
    ));
  };

  const addFocusTime = (minutes: number) => {
    setStats(prev => ({
      ...prev,
      focusTimeToday: prev.focusTimeToday + minutes,
      focusTimeThisWeek: prev.focusTimeThisWeek + minutes,
    }));
  };

  return {
    tasks,
    stats,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    addFocusTime,
  };
}
