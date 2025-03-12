import { IPagamento } from "@stores/entities/Pagamento";

const pagamentos = [] as IPagamento[];

export const PagamentosService = {
  addPagamento: async (pagamento: IPagamento) => {
    pagamentos.push(pagamento);
  },
  getHistorico: async (doadorId: string): Promise<IPagamento[]> => {
    return pagamentos.filter((pagamento) => pagamento.id === doadorId);
  },
};
