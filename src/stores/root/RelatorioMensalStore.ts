import { RelatorioMensalFormValues } from "@pages/Dashboard/RelatorioMensalModal";
import { PagamentosService } from "@services/PagamentosService";
import { formatRelatorioMensal } from "@utils/csv/formatters/formatRelatorioMensal";
import { generateCsv } from "@utils/csv/generateCsv";
import { formatDateString } from "@utils/formatDateString";
import { saveAs } from "file-saver";
import {
  flow,
  Instance,
  SnapshotIn,
  toGenerator,
  types,
} from "mobx-state-tree";
import { IDoador } from "../entities/Doador";

export const RelatorioMensal = types
  .model({
    modalOpen: types.boolean,
  })
  .actions((self) => ({
    generateRelatorio: flow(function* (
      data: RelatorioMensalFormValues,
      doadores: IDoador[],
    ) {
      const filteredDoadores = doadores.filter(
        (doador) => doador.tipo === data.tipoDoador,
      );
      const doadoresIds = filteredDoadores.map((doador) => doador.id);

      const mes = `${data.mes}-01`;

      const pagamentos = yield* toGenerator(
        PagamentosService.getRelatorioMensal({
          doadoresIds,
          mes,
        }),
      );

      const csvData = formatRelatorioMensal({
        doadores: filteredDoadores,
        mes,
        pagamentos,
      });

      const blob = generateCsv(csvData);

      const mesString = formatDateString(mes, "MMM-yyyy");

      saveAs(blob, `relatorio-mensal-${data.tipoDoador}-${mesString}.csv`);
    }),
    setModalOpen() {
      self.modalOpen = true;
    },
    setModalClose() {
      self.modalOpen = false;
    },
  }));

export type IRelatorioMensalStore = Instance<typeof RelatorioMensal>;
export type IRelatorioMensal = SnapshotIn<typeof RelatorioMensal>;

export const RelatorioMensalInitialData: IRelatorioMensal = {
  modalOpen: false,
};
