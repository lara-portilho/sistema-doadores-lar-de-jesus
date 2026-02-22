import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { AuthCtrl, AuthCtrlInitialData } from "./AuthCtrl";
import { DoadoresCtrl, DoadoresCtrlInitialData } from "./DoadoresCtrl";
import { HistoricoCtrl, HistoricoCtrlInitialData } from "./HistoricoCtrl";
import { PagamentosCtrl, PagamentosCtrlInitialData } from "./PagamentosCtrl";
import {
  RelatorioDescritivoCtrl,
  RelatorioDescritivoCtrlInitialData,
} from "./RelatorioDescritivoCtrl";
import {
  RelatorioMensalCtrl,
  RelatorioMensalCtrlInitialData,
} from "./RelatorioMensalCtrl";
import {
  RelatorioPeriodoCtrl,
  RelatorioPeriodoCtrlInitialData,
} from "./RelatorioPeriodoCtrl";

export const Root = types.model({
  authCtrl: AuthCtrl,
  doadoresCtrl: DoadoresCtrl,
  pagamentosCtrl: PagamentosCtrl,
  historicoCtrl: HistoricoCtrl,
  relatorioPeriodoCtrl: RelatorioPeriodoCtrl,
  relatorioMensalCtrl: RelatorioMensalCtrl,
  relatorioDescritivoCtrl: RelatorioDescritivoCtrl,
});

export type IRootStore = Instance<typeof Root>;
export type IRoot = SnapshotIn<typeof Root>;

export const RootInitialData: IRoot = {
  authCtrl: AuthCtrlInitialData,
  doadoresCtrl: DoadoresCtrlInitialData,
  pagamentosCtrl: PagamentosCtrlInitialData,
  historicoCtrl: HistoricoCtrlInitialData,
  relatorioPeriodoCtrl: RelatorioPeriodoCtrlInitialData,
  relatorioMensalCtrl: RelatorioMensalCtrlInitialData,
  relatorioDescritivoCtrl: RelatorioDescritivoCtrlInitialData,
};
