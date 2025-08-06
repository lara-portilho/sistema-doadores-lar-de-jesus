import { IDoador } from "@stores/entities/Doador";

export type DoadorDTO = Omit<
  IDoador,
  "id" | "dataUltimoPag" | "ultimoMes" | "excluido"
>;
