import { treatAuthErrors } from "@app/utils/treatAuthErrors";
import logo from "@assets/logo.png";
import { Button } from "@components/actions/Button";
import { TextInput } from "@components/actions/TextInput";
import { LoginIcon, Spinner } from "@components/icons";
import { useStore } from "@hooks/useStore";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Login = observer(() => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { authCtrl } = useStore();

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await authCtrl.login(email, pass);
      navigate("/");
    } catch (err: unknown) {
      const message = treatAuthErrors(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col gap-5">
      <img src={logo} alt="Lar de Jesus" className="w-36" />
      <h1 className="text-4xl font-bold">Sistema de Mensalidades e Doações</h1>
      <form className="flex flex-col w-64" onSubmit={handleLogin}>
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="exemplo@exemplo.com"
          required
          label="Email"
        />
        <TextInput
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Sua senha aqui"
          type="password"
          label="Senha"
          required
          error={error}
        />
        <Button type="submit" className="mt-1.5" disabled={loading}>
          {loading ? (
            <Spinner className="size-4 text-white animate-spin" />
          ) : (
            <LoginIcon className="size-4 text-white" />
          )}
          Entrar
        </Button>
      </form>
    </div>
  );
});
