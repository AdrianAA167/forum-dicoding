import {
  formatDistanceToNow,
  format,
  parseISO,
  differenceInDays,
} from 'date-fns';
import { id } from 'date-fns/locale';

export function postedAt(date) {
  const createdAt = typeof date === 'string' ? parseISO(date) : date;
  const daysDiff = differenceInDays(new Date(), createdAt);

  if (daysDiff < 7) {
    return formatDistanceToNow(createdAt, { addSuffix: true, locale: id });
  }

  return format(createdAt, 'd MMMM yyyy', { locale: id });
}

export function truncateText(text, maxLength = 150) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

export function getInitials(name = '') {
  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}
