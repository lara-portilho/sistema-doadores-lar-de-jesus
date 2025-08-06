import { AuthService } from "@services/AuthService";
import { User } from "@stores/entities/User";
import { UserType } from "@stores/entities/enums/UserType";
import {
  cast,
  flow,
  Instance,
  SnapshotIn,
  toGenerator,
  types,
} from "mobx-state-tree";

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
    login: flow(function* (email: string, pass: string) {
      const user = yield* toGenerator(AuthService.login(email, pass));
      self.user = cast(user);
    }),
    logout: flow(function* () {
      yield* toGenerator(AuthService.logout());
      self.user = cast(null);
    }),
  }))
  .actions((self) => ({
    getUserFromSession: flow(function* () {
      const userId = sessionStorage.getItem("user");
      if (!userId) {
        self.user = cast(null);
        return;
      }
      const user = yield* toGenerator(AuthService.getUser(userId));
      if (!user) {
        self.logout();
        return;
      }
      self.user = cast(user);
    }),
  }));

export type IAuthStore = Instance<typeof Auth>;
export type IAuth = SnapshotIn<typeof Auth>;

export const AuthInitialData: IAuth = {
  user: null,
};
