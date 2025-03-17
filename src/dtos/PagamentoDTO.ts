import { IPagamento } from "@stores/entities/Pagamento";

export type PagamentoDTO = Omit<IPagamento, "id" | "valorTotal">;
