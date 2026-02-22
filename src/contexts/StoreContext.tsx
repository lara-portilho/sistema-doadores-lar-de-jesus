/* eslint-disable react-refresh/only-export-components */
import { IRootStore, Root, RootInitialData } from "@stores/index";
import { createContext } from "react";

export const rootStore = Root.create(RootInitialData);
export const RootStoreContext = createContext<null | IRootStore>(null);
export const StoreProvider = RootStoreContext.Provider;
