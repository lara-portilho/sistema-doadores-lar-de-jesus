import { Doador } from "@entities/Doador";

export type DoadorDTO = Omit<
  Doador,
  "id" | "dataUltimoPag" | "ultimoMes" | "excluido"
>;
