import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDateString(date: string, mask: string) {
  return format(parseISO(date), mask, { locale: ptBR });
}
