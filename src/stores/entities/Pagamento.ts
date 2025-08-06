import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { TiposPagamento } from "./enums/TiposPagamento";

export const Pagamento = types.model({
  id: types.string,
  doadorId: types.string,
  data: types.string,
  valorMensalidade: types.number,
  valorExtra: types.maybeNull(types.number),
  valorTotal: types.number,
  metodo: types.frozen<TiposPagamento>(),
  mesesQuitados: types.array(types.string),
});

export type IPagamentoStore = Instance<typeof Pagamento>;
export type IPagamento = SnapshotIn<typeof Pagamento>;

export const PagamentoInitialData: IPagamento = {
  id: "",
  doadorId: "",
  data: "",
  valorMensalidade: 0,
  valorExtra: null,
  valorTotal: 0,
  metodo: TiposPagamento.Dinheiro,
  mesesQuitados: [],
};
