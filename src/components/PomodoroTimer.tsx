"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { POMODORO_DURATION, POMODORO_BREAK } from '@/lib/constants';

interface PomodoroTimerProps {
  open: boolean;
  onClose: () => void;
  onComplete: (minutes: number) => void;
}

export function PomodoroTimer({ open, onClose, onComplete }: PomodoroTimerProps) {
  const [seconds, setSeconds] = useState(POMODORO_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(s => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      
      if (!isBreak) {
        onComplete(25);
        setIsBreak(true);
        setSeconds(POMODORO_BREAK);
      } else {
        setIsBreak(false);
        setSeconds(POMODORO_DURATION);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds, isBreak, onComplete]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSeconds(POMODORO_DURATION);
  };

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent text-center">
            {isBreak ? 'Pausa' : 'Modo Foco'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-8 space-y-6">
          <div className="text-center">
            <div className="text-7xl font-bold text-gray-900 dark:text-gray-100 font-mono">
              {String(minutes).padStart(2, '0')}:{String(remainingSeconds).padStart(2, '0')}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {isBreak ? 'Hora de descansar!' : 'Mantenha o foco!'}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              {isActive ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pausar
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Iniciar
                </>
              )}
            </Button>
            
            <Button
              onClick={resetTimer}
              size="lg"
              variant="outline"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reiniciar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
