import { DoadoresService } from "@services/DoadoresService";
import { Doador, IDoador } from "@stores/entities/Doador";
import { cast, Instance, SnapshotIn, types } from "mobx-state-tree";

export const Doadores = types
  .model({
    doadores: types.array(Doador),
    modalOpen: types.boolean,
    selectedDoadorCpf: types.maybeNull(types.string),
  })
  .views((self) => ({
    get selectedDoador() {
      return self.doadores.find(
        (doador) => doador.cpf === self.selectedDoadorCpf,
      );
    },
  }))
  .actions((self) => ({
    getDoadores() {
      const doadores = DoadoresService.getDoadores();
      self.doadores = cast(doadores);
    },
    addDoador(doador: IDoador) {
      DoadoresService.addDoador(doador);
    },
    updateDoador(doador: IDoador) {
      DoadoresService.updateDoador(doador);
    },
    deleteDoador(cpf: string) {
      DoadoresService.deleteDoador(cpf);
    },
    setModalOpen(cpf?: string) {
      self.modalOpen = true;
      self.selectedDoadorCpf = cpf ?? null;
    },
    setModalClose() {
      self.modalOpen = false;
      self.selectedDoadorCpf = null;
    },
  }));

export type IDoadoresStore = Instance<typeof Doadores>;
export type IDoadores = SnapshotIn<typeof Doadores>;

export const DoadoresInitialData: IDoadores = {
  doadores: [],
  modalOpen: false,
};
