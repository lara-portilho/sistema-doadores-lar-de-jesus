import { Doador } from "@entities/Doador";
import { RelatorioMensalFormValues } from "@forms/RelatorioMensalForm";
import { PagamentosService } from "@services/PagamentosService";
import { formatRelatorioDescritivo } from "@utils/csv/formatters/formatRelatorioDescritivo";
import { generateCsv } from "@utils/csv/generateCsv";
import { formatDateString } from "@utils/formatDateString";
import { getDaysArray } from "@utils/getDaysArray";
import { saveAs } from "file-saver";
import { flow, SnapshotIn, toGenerator, types } from "mobx-state-tree";

export const RelatorioDescritivoCtrl = types
  .model({
    modalOpen: types.boolean,
  })
  .actions((self) => ({
    generateRelatorio: flow(function* (
      data: RelatorioMensalFormValues,
      doadores: Doador[],
    ) {
      const filteredDoadores = doadores.filter(
        (doador) => doador.tipo === data.tipoDoador,
      );
      const doadoresIds = filteredDoadores.map((doador) => doador.id);

      const dias = getDaysArray(`${data.mes}-01`);

      const pagamentos = yield* toGenerator(
        PagamentosService.getRelatorioDescritivo({
          doadoresIds,
          dias,
        }),
      );

      const csvData = formatRelatorioDescritivo({
        doadores: filteredDoadores,
        dias,
        pagamentos,
      });

      const blob = generateCsv(csvData);

      const mesString = formatDateString(data.mes, "MMM-yyyy");

      saveAs(blob, `relatorio-descritivo-${data.tipoDoador}-${mesString}.csv`);
    }),
    setModalOpen() {
      self.modalOpen = true;
    },
    setModalClose() {
      self.modalOpen = false;
    },
  }));

export type RelatorioDescritivoCtrl = SnapshotIn<
  typeof RelatorioDescritivoCtrl
>;

export const RelatorioDescritivoCtrlInitialData: RelatorioDescritivoCtrl = {
  modalOpen: false,
};
