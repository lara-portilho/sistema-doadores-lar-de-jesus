import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";

export function treatAuthErrors(err: unknown) {
  if (typeof err === "string") return err;
  if (err instanceof FirebaseError) {
    if (
      err.code === AuthErrorCodes.INVALID_EMAIL ||
      err.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS
    )
      return "Credenciais inválidas!";
    return err.message;
  }
  if (err instanceof Error) return err.message;
  return "Houve algum problema!";
}
