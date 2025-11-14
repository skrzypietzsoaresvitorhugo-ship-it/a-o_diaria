"use client";

import { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Pencil, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: () => void;
}

export function TaskItem({ task, onToggle, onDelete, onEdit }: TaskItemProps) {
  return (
    <div className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-300 ${
      task.completed
        ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'
        : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-800'
    }`}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="h-5 w-5"
      />
      
      <span className={`flex-1 text-base ${
        task.completed
          ? 'line-through text-gray-500 dark:text-gray-500'
          : 'text-gray-900 dark:text-gray-100'
      }`}>
        {task.title}
      </span>

      <div className="flex items-center gap-2">
        {task.completed && (
          <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">
            +{task.points} pts
          </span>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-950"
        >
          <Pencil className="w-4 h-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 hover:bg-red-100 dark:hover:bg-red-950 hover:text-red-600"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
