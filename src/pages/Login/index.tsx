import logo from "@assets/logo.png";
import { Button } from "@components/actions/Button";
import { TextInput } from "@components/actions/TextInput";
import { LoginIcon } from "@components/icons";
import { useStore } from "@hooks/useStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Login = observer(() => {
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { authCtrl } = useStore();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await authCtrl.login(pass);
      navigate("/");
    } catch (err: unknown) {
      if (typeof err === "string") setError(err);
      else if (err instanceof Error) setError(err.message);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
      <img src={logo} alt="Lar de Jesus" className="w-36" />
      <h1 className="text-4xl font-bold">Sistema de Mensalidades e Doações</h1>
      <form className="flex items-center gap-5" onSubmit={handleLogin}>
        <TextInput
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Sua senha aqui"
          type="password"
          label="Senha"
          error={error}
        />
        <Button type="submit">
          <LoginIcon className="size-4 text-white" />
          Entrar
        </Button>
      </form>
    </div>
  );
});
