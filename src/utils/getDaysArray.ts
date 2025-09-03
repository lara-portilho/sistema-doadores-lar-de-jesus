import { addDays, endOfMonth, format, parseISO } from "date-fns";

export function getDaysArray(diaInicial: string, diaFinal?: string) {
  const diaF =
    diaFinal || format(endOfMonth(parseISO(diaInicial)), "yyyy-MM-dd");
  let diaT = diaInicial;
  const dias: string[] = [diaT];

  while (diaT !== diaF) {
    diaT = format(addDays(parseISO(diaT), 1), "yyyy-MM-dd");
    dias.push(diaT);
  }

  return dias;
}
