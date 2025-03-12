import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { TiposPagamento } from "./enums/TiposPagamento";

export const Pagamento = types.model({
  id: types.string,
  cpf: types.string,
  data: types.string,
  valorTotal: types.number,
  valorExtra: types.maybeNull(types.number),
  metodo: types.frozen<TiposPagamento>(),
  mesesQuitados: types.array(types.string),
});

export type IPagamentoStore = Instance<typeof Pagamento>;
export type IPagamento = SnapshotIn<typeof Pagamento>;

export const PagamentoInitialData: IPagamento = {
  id: "",
  cpf: "",
  data: "",
  valorTotal: 0,
  valorExtra: null,
  metodo: TiposPagamento.Dinheiro,
  mesesQuitados: [],
};
