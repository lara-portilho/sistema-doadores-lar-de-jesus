import { Doador } from "@entities/Doador";
import { RelatorioPeriodoFormValues } from "@forms/RelatorioPeriodoForm";
import { PagamentosService } from "@services/PagamentosService";
import { formatRelatorioPeriodo } from "@utils/csv/formatters/formatRelatorioPeriodo";
import { generateCsv } from "@utils/csv/generateCsv";
import { formatDateString } from "@utils/formatDateString";
import { getMonthsArray } from "@utils/getMonthsArray";
import { saveAs } from "file-saver";
import { flow, SnapshotIn, toGenerator, types } from "mobx-state-tree";

export const RelatorioPeriodoCtrl = types
  .model({
    modalOpen: types.boolean,
  })
  .actions((self) => ({
    generateRelatorio: flow(function* (
      data: RelatorioPeriodoFormValues,
      doadores: Doador[],
    ) {
      const filteredDoadores = doadores.filter(
        (doador) => doador.tipo === data.tipoDoador,
      );
      const doadoresIds = filteredDoadores.map((doador) => doador.id);

      const meses = getMonthsArray(data.mesInicial, data.mesFinal);

      const pagamentos = yield* toGenerator(
        PagamentosService.getRelatorioPeriodo({
          doadoresIds,
          meses,
        }),
      );

      const csvData = formatRelatorioPeriodo({
        doadores: filteredDoadores,
        meses,
        pagamentos,
      });

      const blob = generateCsv(csvData);

      const mesIni = formatDateString(meses[0], "MMM-yyyy");
      const mesFin = formatDateString(meses[meses.length - 1], "MMM-yyyy");

      saveAs(
        blob,
        `relatorio-periodo-${data.tipoDoador}-${mesIni}-${mesFin}.csv`,
      );
    }),
    setModalOpen() {
      self.modalOpen = true;
    },
    setModalClose() {
      self.modalOpen = false;
    },
  }));

export type RelatorioPeriodoCtrl = SnapshotIn<typeof RelatorioPeriodoCtrl>;

export const RelatorioPeriodoCtrlInitialData: RelatorioPeriodoCtrl = {
  modalOpen: false,
};
