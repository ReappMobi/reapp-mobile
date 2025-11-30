import { formatDistanceToNowStrict } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  if (date > now) {
    return 'Agora mesmo';
  }

  const distance = formatDistanceToNowStrict(date, {
    locale: ptBR,
    addSuffix: false,
  });

  if (distance === '0 segundos') {
    return 'Agora mesmo';
  }

  return `${distance} atrás`;
};
