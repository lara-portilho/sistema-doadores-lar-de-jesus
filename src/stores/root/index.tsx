/* eslint-disable react-refresh/only-export-components */
import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { Auth, AuthInitialData } from "./AuthStore";
import { Doadores, DoadoresInitialData } from "./DoadoresStore";

export const Root = types.model({
  authCtrl: Auth,
  doadoresCtrl: Doadores,
});

export type IRootStore = Instance<typeof Root>;
export type IRoot = SnapshotIn<typeof Root>;

export const RootInitialData: IRoot = {
  authCtrl: AuthInitialData,
  doadoresCtrl: DoadoresInitialData,
};
