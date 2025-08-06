import { DoadorDTO } from "@dtos/DoadorDTO";
import { DoadoresService } from "@services/DoadoresService";
import { Doador } from "@stores/entities/Doador";
import {
  cast,
  flow,
  Instance,
  SnapshotIn,
  toGenerator,
  types,
} from "mobx-state-tree";

export const Doadores = types
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
      return self.doadores.filter((doador) => !doador.excluido);
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

export type IDoadoresStore = Instance<typeof Doadores>;
export type IDoadores = SnapshotIn<typeof Doadores>;

export const DoadoresInitialData: IDoadores = {
  doadores: [],
  modalOpen: false,
};
