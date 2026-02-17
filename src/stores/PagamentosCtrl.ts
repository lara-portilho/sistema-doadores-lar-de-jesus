import { PagamentoDTO } from "@dtos/PagamentoDTO";
import { Pagamento } from "@entities/Pagamento";
import { PagamentosService } from "@services/PagamentosService";
import { flow, SnapshotIn, toGenerator, types } from "mobx-state-tree";

export const PagamentosCtrl = types
  .model({
    pagamentos: types.array(Pagamento),
    modalOpen: types.boolean,
    selectedDoadorId: types.maybeNull(types.string),
  })
  .actions((self) => ({
    addPagamento: flow(function* (dto: PagamentoDTO) {
      if (!self.selectedDoadorId) return;
      yield* toGenerator(PagamentosService.addPagamento(dto));
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

export type PagamentosCtrl = SnapshotIn<typeof PagamentosCtrl>;

export const PagamentosCtrlInitialData: PagamentosCtrl = {
  pagamentos: [],
  modalOpen: false,
};
