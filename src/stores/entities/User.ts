import { Instance, SnapshotIn, types } from "mobx-state-tree";
import { UserType } from "./enums/UserType";

export const User = types.model({
  type: types.frozen<UserType>(),
});

export type IUserStore = Instance<typeof User>;
export type IUser = SnapshotIn<typeof User>;

export const UserInitialData: IUser = {
  type: UserType.View,
};
