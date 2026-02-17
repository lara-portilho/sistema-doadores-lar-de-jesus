import { TiposPagamento } from "@enums/TiposPagamento";
import { SnapshotIn, types } from "mobx-state-tree";

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

export type Pagamento = SnapshotIn<typeof Pagamento>;
