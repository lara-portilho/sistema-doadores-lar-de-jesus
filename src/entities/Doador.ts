import { Departamentos } from "@enums/Departamentos";
import { TiposDoador } from "@enums/TiposDoador";
import { SnapshotIn, types } from "mobx-state-tree";

export const Doador = types.model({
  id: types.string,
  nome: types.string,
  tipo: types.frozen<TiposDoador>(),
  cpf: types.maybeNull(types.string),
  telefone: types.maybeNull(types.string),
  endereco: types.maybeNull(types.string),
  email: types.maybeNull(types.string),
  aniversario: types.maybeNull(types.string),
  departamento: types.frozen<Departamentos>(),
  valor: types.number,
  dataUltimoPag: types.maybeNull(types.string),
  ultimoMes: types.maybeNull(types.string),
  excluido: types.boolean,
});

export type Doador = SnapshotIn<typeof Doador>;
