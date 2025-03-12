import { PagamentosService } from "@services/PagamentosService";
import { Pagamento } from "@stores/entities/Pagamento";
import { cast, flow, Instance, SnapshotIn, types } from "mobx-state-tree";

export const Historico = types
  .model({
    pagamentos: types.array(Pagamento),
    modalOpen: types.boolean,
    selectedDoadorId: types.maybeNull(types.string),
  })
  .actions((self) => ({
    getHistorico: flow(function* () {
      if (!self.selectedDoadorId) return;
      const pagamentos = yield PagamentosService.getHistorico(
        self.selectedDoadorId,
      );
      self.pagamentos = cast(pagamentos);
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

export type IHistoricoStore = Instance<typeof Historico>;
export type IHistorico = SnapshotIn<typeof Historico>;

export const HistoricoInitialData: IHistorico = {
  pagamentos: [],
  modalOpen: false,
};
