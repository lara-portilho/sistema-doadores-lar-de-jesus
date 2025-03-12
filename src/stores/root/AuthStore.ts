import { AuthService } from "@services/AuthService";
import { User } from "@stores/entities/User";
import { UserType } from "@stores/entities/enums/UserType";
import { cast, flow, Instance, SnapshotIn, types } from "mobx-state-tree";

export const Auth = types
  .model({
    user: types.maybeNull(User),
  })
  .views((self) => ({
    get isEdit() {
      return self.user?.type === UserType.Edit;
    },
  }))
  .actions((self) => ({
    login: flow(function* (pass: string) {
      const user = yield AuthService.login(pass);
      self.user = cast(user);
    }),
    logout: flow(function* () {
      yield AuthService.logout();
      self.user = cast(null);
    }),
    setUserFromSession() {
      const userType = sessionStorage.getItem("user");
      if (userType === UserType.Edit) self.user = cast({ type: UserType.Edit });
      else if (userType === UserType.View)
        self.user = cast({ type: UserType.View });
      else self.user = cast(null);
    },
  }));

export type IAuthStore = Instance<typeof Auth>;
export type IAuth = SnapshotIn<typeof Auth>;

export const AuthInitialData: IAuth = {
  user: null,
};
