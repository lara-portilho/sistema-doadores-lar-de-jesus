import { IDoador } from "@stores/entities/Doador";

export type DoadorDTO = Omit<IDoador, "id" | "ultimoMes">;
