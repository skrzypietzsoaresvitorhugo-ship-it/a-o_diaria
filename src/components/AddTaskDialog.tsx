"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';

interface AddTaskDialogProps {
  onAdd: (title: string) => void;
}

export function AddTaskDialog({ onAdd }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = () => {
    if (title.trim()) {
      onAdd(title.trim());
      setTitle('');
      setOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        size="lg"
        className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Plus className="w-5 h-5 mr-2" />
        Nova Tarefa
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Nova Tarefa
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Meditar 5 minutos"
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
              Adicionar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
