export function getGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) return "Bom dia";
  if (hour < 18) return "Boa tarde";
  return "Boa noite";
}

export function getUserName(): string {
  if (typeof window === 'undefined') return 'Usuário';
  return localStorage.getItem('userName') || 'Usuário';
}

export function setUserName(name: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userName', name);
}

export function isToday(date: Date): boolean {
  const today = new Date();
  return date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();
}

export function isThisWeek(date: Date): boolean {
  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  weekStart.setHours(0, 0, 0, 0);
  
  return date >= weekStart;
}

export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
