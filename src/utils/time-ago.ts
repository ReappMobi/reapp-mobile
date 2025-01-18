export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);

  const now = new Date();
  const differenceInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / 60000
  );

  if (differenceInMinutes <= 1) {
    return `${differenceInMinutes} minuto atrás`;
  }

  if (differenceInMinutes < 60) {
    return `${differenceInMinutes} minutos atrás`;
  }

  const differenceInHours = Math.floor(differenceInMinutes / 60);
  if (differenceInHours < 24) {
    return `${differenceInHours} horas atrás`;
  }

  const differenceInDays = Math.floor(differenceInHours / 24);
  if (differenceInDays < 30) {
    if (differenceInDays === 1) {
      return `${differenceInDays} dia atrás`;
    }
    return `${differenceInDays} dias atrás`;
  }

  const differenceInMonths = Math.floor(differenceInDays / 30);
  if (differenceInMonths < 12) {
    return `${differenceInMonths} meses atrás`;
  }

  const differenceInYears = Math.floor(differenceInMonths / 12);
  return `${differenceInYears} anos atrás`;
};
