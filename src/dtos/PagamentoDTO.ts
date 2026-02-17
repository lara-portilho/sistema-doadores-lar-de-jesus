import { Pagamento } from "@entities/Pagamento";

export type PagamentoDTO = Omit<
  Pagamento,
  "id" | "valorTotal" | "valorMensalidade"
>;
