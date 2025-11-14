"use client";

import { useState, useEffect } from 'react';
import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

interface EditTaskDialogProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onEdit: (id: string, title: string) => void;
}

export function EditTaskDialog({ task, open, onClose, onEdit }: EditTaskDialogProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
    }
  }, [task]);

  const handleSubmit = () => {
    if (task && title.trim()) {
      onEdit(task.id, title.trim());
      onClose();
    }
  };

  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Editar Tarefa
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da tarefa"
            className="text-base"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            autoFocus
          />
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            Salvar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
