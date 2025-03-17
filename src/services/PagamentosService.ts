import { PagamentoDTO } from "@dtos/PagamentoDTO";
import { IPagamento } from "@stores/entities/Pagamento";
import { api } from "./api";

export const PagamentosService = {
  addPagamento: async (pagamento: PagamentoDTO) => {
    await api.request({
      method: "POST",
      url: "/pagamento",
      data: pagamento,
    });
  },
  getHistorico: async (doadorId: string): Promise<IPagamento[]> => {
    const response = await api.request<IPagamento[]>({
      method: "GET",
      url: "/pagamento",
      params: { doadorId },
    });
    return response.data;
  },
};
