import { UserType } from "@enums/UserType";
import { SnapshotIn, types } from "mobx-state-tree";

export const User = types.model({
  type: types.frozen<UserType>(),
});

export type User = SnapshotIn<typeof User>;
