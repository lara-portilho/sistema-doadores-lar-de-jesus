import logo from "@assets/logo.png";
import { Button } from "@components/actions/Button";
import { TextInput } from "@components/actions/TextInput";
import { LoginIcon, Spinner } from "@components/icons";
import { loginForm, LoginFormValues } from "@forms/LoginForm";
import { useStore } from "@hooks/useStore";
import { treatAuthErrors } from "@utils/treatAuthErrors";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

export const Login = observer(() => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: loginForm.defaultValues,
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { authCtrl } = useStore();

  const validationRules = useMemo(() => loginForm.getValidationRules(), []);

  async function onSubmit(data: LoginFormValues) {
    try {
      await authCtrl.login(data.email, data.pass);
      navigate("/");
    } catch (err: unknown) {
      const message = treatAuthErrors(err);
      setError(message);
      console.log(err);
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-5">
      <img src={logo} alt="Lar de Jesus" className="w-36" />
      <h1 className="text-4xl font-bold">Sistema de Mensalidades e Doações</h1>
      <form className="flex w-64 flex-col" onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          {...register("email", validationRules.email)}
          label="Email"
          error={errors.email?.message}
          placeholder="exemplo@exemplo.com"
        />
        <TextInput
          {...register("pass", validationRules.pass)}
          label="Senha"
          placeholder="Sua senha aqui"
          type="password"
          required
          error={error || errors.pass?.message}
        />
        <Button type="submit" className="mt-1.5" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner className="size-4 animate-spin text-white" />
          ) : (
            <LoginIcon className="size-4 text-white" />
          )}
          Entrar
        </Button>
      </form>
    </div>
  );
});
