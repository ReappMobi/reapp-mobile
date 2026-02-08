import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');

export const timeAgo = (dateString: string): string => {
  const date = dayjs(dateString);
  const now = dayjs();

  if (date.isAfter(now)) {
    return 'Agora mesmo';
  }

  const distance = date.fromNow(true);

  if (distance === 'alguns segundos' || distance === '0 segundos') {
    return 'Agora mesmo';
  }

  return `${distance} atrás`;
};
