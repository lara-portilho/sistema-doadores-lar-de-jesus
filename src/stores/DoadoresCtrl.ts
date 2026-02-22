import { DoadorDTO } from "@dtos/DoadorDTO";
import { Doador } from "@entities/Doador";
import { DoadoresService } from "@services/DoadoresService";
import { cast, flow, SnapshotIn, toGenerator, types } from "mobx-state-tree";

export const DoadoresCtrl = types
  .model({
    doadores: types.array(Doador),
    modalOpen: types.boolean,
    selectedDoadorId: types.maybeNull(types.string),
  })
  .views((self) => ({
    get selectedDoador() {
      return self.doadores.find(
        (doador) => doador.id === self.selectedDoadorId,
      );
    },
    get filteredDoadores() {
      return self.doadores
        .filter((doador) => !doador.excluido)
        .sort((a, b) => {
          const nameA = a.nome.toLowerCase();
          const nameB = b.nome.toLowerCase();
          return nameA.localeCompare(nameB);
        });
    },
  }))
  .actions((self) => ({
    getDoadores: flow(function* () {
      const doadores = yield* toGenerator(DoadoresService.getDoadores());
      self.doadores = cast(doadores);
    }),
    addDoador: flow(function* (doador: DoadorDTO) {
      yield* toGenerator(DoadoresService.addDoador(doador));
    }),
    updateDoador: flow(function* (id: string, doador: DoadorDTO) {
      yield* toGenerator(DoadoresService.updateDoador(id, doador));
    }),
    deleteDoador: flow(function* (id: string) {
      yield* toGenerator(DoadoresService.deleteDoador(id));
    }),
    reset() {
      self.doadores = cast([]);
    },
    setModalOpen(id?: string) {
      self.modalOpen = true;
      self.selectedDoadorId = id ?? null;
    },
    setModalClose() {
      self.modalOpen = false;
      self.selectedDoadorId = null;
    },
  }));

export type DoadoresCtrl = SnapshotIn<typeof DoadoresCtrl>;

export const DoadoresCtrlInitialData: DoadoresCtrl = {
  doadores: [],
  modalOpen: false,
};
