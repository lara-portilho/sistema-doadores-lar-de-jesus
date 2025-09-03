/* eslint-disable react-refresh/only-export-components */
import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { Auth, AuthInitialData } from "./AuthStore";
import { Doadores, DoadoresInitialData } from "./DoadoresStore";
import { Historico, HistoricoInitialData } from "./HistoricoStore";
import { Pagamentos, PagamentosInitialData } from "./PagamentosStore";
import {
  RelatorioMensal,
  RelatorioMensalInitialData,
} from "./RelatorioMensalStore";
import {
  RelatorioPeriodo,
  RelatorioPeriodoInitialData,
} from "./RelatorioPeriodoStore";
import {
  RelatorioDescritivo,
  RelatorioDescritivoInitialData,
} from "./RelatorioDescritivoStore";

export const Root = types.model({
  authCtrl: Auth,
  doadoresCtrl: Doadores,
  pagamentosCtrl: Pagamentos,
  historicoCtrl: Historico,
  relatorioPeriodoCtrl: RelatorioPeriodo,
  relatorioMensalCtrl: RelatorioMensal,
  relatorioDescritivoCtrl: RelatorioDescritivo,
});

export type IRootStore = Instance<typeof Root>;
export type IRoot = SnapshotIn<typeof Root>;

export const RootInitialData: IRoot = {
  authCtrl: AuthInitialData,
  doadoresCtrl: DoadoresInitialData,
  pagamentosCtrl: PagamentosInitialData,
  historicoCtrl: HistoricoInitialData,
  relatorioPeriodoCtrl: RelatorioPeriodoInitialData,
  relatorioMensalCtrl: RelatorioMensalInitialData,
  relatorioDescritivoCtrl: RelatorioDescritivoInitialData,
};
