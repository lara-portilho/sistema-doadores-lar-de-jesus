import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { Departamentos } from "./enums/Departamentos";
import { TiposDoador } from "./enums/TiposDoador";

export const Doador = types.model({
  nome: types.string,
  tipo: types.frozen<TiposDoador>(),
  cpf: types.string,
  telefone: types.string,
  email: types.string,
  aniversario: types.string,
  departamento: types.frozen<Departamentos>(),
  valor: types.number,
  ultimoMes: types.maybeNull(types.string),
});

export type IDoadorStore = Instance<typeof Doador>;
export type IDoador = SnapshotIn<typeof Doador>;

export const DoadorInitialData: IDoador = {
  nome: "",
  tipo: TiposDoador.Esporadico,
  cpf: "",
  telefone: "",
  email: "",
  aniversario: "",
  departamento: Departamentos.SemDepartamento,
  valor: 0,
  ultimoMes: null,
};
