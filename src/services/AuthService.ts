import { UserType } from "@stores/entities/enums/UserType";

const VIEW_PASS = import.meta.env.VITE_VIEW_PASS;
const EDIT_PASS = import.meta.env.VITE_EDIT_PASS;

export const AuthService = {
  login: (pass: string) => {
    if (pass === VIEW_PASS) {
      sessionStorage.setItem("user", UserType.View);
      return { type: UserType.View };
    } else if (pass === EDIT_PASS) {
      sessionStorage.setItem("user", UserType.Edit);
      return { type: UserType.Edit };
    } else {
      sessionStorage.setItem("user", "");
      throw "Erro! Senha incorreta";
    }
  },
  logout: () => {
    sessionStorage.setItem("user", "");
  },
};
