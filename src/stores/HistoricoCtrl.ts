import { Pagamento } from "@entities/Pagamento";
import { PagamentosService } from "@services/PagamentosService";
import { cast, flow, SnapshotIn, toGenerator, types } from "mobx-state-tree";

export const HistoricoCtrl = types
  .model({
    pagamentos: types.array(Pagamento),
    modalOpen: types.boolean,
    selectedDoadorId: types.maybeNull(types.string),
  })
  .views((self) => ({
    get filteredPagamentos() {
      return self.pagamentos.slice().sort((a, b) => {
        const dateA = new Date(
          a.mesesQuitados?.[a.mesesQuitados?.length - 1],
        ).getTime();
        const dateB = new Date(
          b.mesesQuitados?.[b.mesesQuitados?.length - 1],
        ).getTime();
        return dateB - dateA;
      });
    },
  }))
  .actions((self) => ({
    getHistorico: flow(function* () {
      if (!self.selectedDoadorId) return;
      const pagamentos = yield* toGenerator(
        PagamentosService.getHistorico(self.selectedDoadorId),
      );
      self.pagamentos = cast(pagamentos);
    }),
    deletePagamento: flow(function* (id: string, sobrescrever: boolean) {
      if (!self.selectedDoadorId) return;

      if (!sobrescrever) {
        yield* toGenerator(PagamentosService.deletePagamento(id));
        return;
      }

      let pagamentoAnterior = undefined;

      if (self.filteredPagamentos.length > 1)
        pagamentoAnterior = self.filteredPagamentos[1];

      yield* toGenerator(
        PagamentosService.deletePagamento(id, {
          doadorId: self.selectedDoadorId,
          pagamentoAnterior,
        }),
      );
    }),
    setModalOpen(id: string) {
      self.modalOpen = true;
      self.selectedDoadorId = id;
    },
    setModalClose() {
      self.modalOpen = false;
      self.selectedDoadorId = null;
    },
    reset() {
      self.pagamentos = cast([]);
    },
  }));

export type HistoricoCtrl = SnapshotIn<typeof HistoricoCtrl>;

export const HistoricoCtrlInitialData: HistoricoCtrl = {
  pagamentos: [],
  modalOpen: false,
};
