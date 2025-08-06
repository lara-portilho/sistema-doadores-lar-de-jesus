import { PagamentoFormValues } from "@pages/Dashboard/PagamentoModal";
import { PagamentosService } from "@services/PagamentosService";
import { Pagamento } from "@stores/entities/Pagamento";
import { getMonthsArray } from "@utils/getMonthsArray";
import {
  flow,
  Instance,
  SnapshotIn,
  toGenerator,
  types,
} from "mobx-state-tree";

export const Pagamentos = types
  .model({
    pagamentos: types.array(Pagamento),
    modalOpen: types.boolean,
    selectedDoadorId: types.maybeNull(types.string),
  })
  .actions((self) => ({
    addPagamento: flow(function* (data: PagamentoFormValues, doadorId: string) {
      if (!self.selectedDoadorId) return;

      const meses = getMonthsArray(
        data.primeiroMesQuitado,
        data.ultimoMesQuitado,
      );

      yield* toGenerator(
        PagamentosService.addPagamento({
          doadorId: doadorId,
          data: data.data,
          metodo: data.metodo,
          valorExtra: data.valorExtra || 0,
          mesesQuitados: meses,
        }),
      );
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
