import { PagamentoDTO } from "@dtos/PagamentoDTO";
import { PagamentosService } from "@services/PagamentosService";
import { Pagamento } from "@stores/entities/Pagamento";
import { flow, Instance, SnapshotIn, types } from "mobx-state-tree";

export const Pagamentos = types
  .model({
    pagamentos: types.array(Pagamento),
    modalOpen: types.boolean,
    selectedDoadorId: types.maybeNull(types.string),
  })
  .actions((self) => ({
    addPagamento: flow(function* (pagamento: PagamentoDTO) {
      if (!self.selectedDoadorId) return;
      yield PagamentosService.addPagamento(pagamento);
    }),
    setModalOpen(id?: string) {
      self.modalOpen = true;
      self.selectedDoadorId = id ?? null;
    },
    setModalClose() {
      self.modalOpen = false;
      self.selectedDoadorId = null;
    },
  }));

export type IPagamentosStore = Instance<typeof Pagamentos>;
export type IPagamentos = SnapshotIn<typeof Pagamentos>;

export const PagamentosInitialData: IPagamentos = {
  pagamentos: [],
  modalOpen: false,
};
