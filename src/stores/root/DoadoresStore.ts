import { DoadoresService } from "@services/DoadoresService";
import { Doador, IDoador } from "@stores/entities/Doador";
import { cast, flow, Instance, SnapshotIn, types } from "mobx-state-tree";

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
  }))
  .actions((self) => ({
    getDoadores: flow(function* () {
      const doadores = yield DoadoresService.getDoadores();
      self.doadores = cast(doadores);
    }),
    addDoador: flow(function* (doador: IDoador) {
      yield DoadoresService.addDoador(doador);
    }),
    updateDoador: flow(function* (doador: IDoador) {
      yield DoadoresService.updateDoador(doador);
    }),
    deleteDoador: flow(function* (id: string) {
      yield DoadoresService.deleteDoador(id);
    }),
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
