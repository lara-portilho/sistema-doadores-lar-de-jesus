import { RelatorioDescritivoFormValues } from "@pages/Dashboard/RelatorioDescritivoModal";
import { PagamentosService } from "@services/PagamentosService";
import { formatRelatorioDescritivo } from "@utils/csv/formatters/formatRelatorioDescritivo";
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
import { getDaysArray } from "@utils/getDaysArray";

export const RelatorioDescritivo = types
  .model({
    modalOpen: types.boolean,
  })
  .actions((self) => ({
    generateRelatorio: flow(function* (
      data: RelatorioDescritivoFormValues,
      doadores: IDoador[],
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

export type IRelatorioDescritivoStore = Instance<typeof RelatorioDescritivo>;
export type IRelatorioDescritivo = SnapshotIn<typeof RelatorioDescritivo>;

export const RelatorioDescritivoInitialData: IRelatorioDescritivo = {
  modalOpen: false,
};
