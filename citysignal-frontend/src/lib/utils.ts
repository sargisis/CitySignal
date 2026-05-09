export function generateTrackingId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'CS-2026-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function formatDate(dateString: string, locale: string = 'en'): string {
  const date = new Date(dateString);
  const localeMap: Record<string, string> = {
    en: 'en-US',
    hy: 'hy-AM',
    ru: 'ru-RU',
  };
  return date.toLocaleDateString(localeMap[locale] || 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatRelativeTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'submitted': return 'var(--accent-secondary)';
    case 'under_review': return 'var(--accent-warning)';
    case 'in_progress': return 'var(--accent-primary)';
    case 'resolved': return 'var(--accent-success)';
    case 'closed': return 'var(--text-secondary)';
    default: return 'var(--text-secondary)';
  }
}
