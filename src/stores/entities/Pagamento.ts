import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { TiposPagamento } from "./enums/TiposPagamento";

export const Pagamento = types.model({
  id: types.string,
  doadorId: types.string,
  data: types.string,
  valorTotal: types.number,
  valorExtra: types.maybeNull(types.number),
  metodo: types.frozen<TiposPagamento>(),
  primeiroMesQuitado: types.string,
  ultimoMesQuitado: types.string,
});

export type IPagamentoStore = Instance<typeof Pagamento>;
export type IPagamento = SnapshotIn<typeof Pagamento>;

export const PagamentoInitialData: IPagamento = {
  id: "",
  doadorId: "",
  data: "",
  valorTotal: 0,
  valorExtra: null,
  metodo: TiposPagamento.Dinheiro,
  primeiroMesQuitado: "",
  ultimoMesQuitado: "",
};
