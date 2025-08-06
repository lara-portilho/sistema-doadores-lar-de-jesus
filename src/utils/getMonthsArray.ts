import { addMonths, format, parseISO } from "date-fns";

export function getMonthsArray(mesInicial: string, mesFinal: string) {
  const mesF = `${mesFinal}-01`;
  let mesT = `${mesInicial}-01`;
  const meses: string[] = [mesT];

  while (mesT !== mesF) {
    mesT = format(addMonths(parseISO(mesT), 1), "yyyy-MM-dd");
    meses.push(mesT);
  }

  return meses;
}
