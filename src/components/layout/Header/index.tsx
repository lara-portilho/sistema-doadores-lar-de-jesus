import logo from "@assets/logo.png";
import { Button } from "@components/actions/Button";
import { LogoutIcon } from "@components/icons";
import { useStore } from "@hooks/useStore";
import { observer } from "mobx-react-lite";

export const Header = observer(() => {
  const { authCtrl } = useStore();

  return (
    <div className="flex justify-between items-center bg-blue-900/20 px-20 py-5">
      <div className="flex items-center gap-5">
        <img src={logo} alt="Lar de Jesus" className="w-15" />
        <h1 className="text-3xl font-bold">
          Sistema de Mensalidades e Doações
        </h1>
      </div>
      <Button onClick={async () => await authCtrl.logout()}>
        <LogoutIcon className="size-4 text-white" />
        Sair
      </Button>
    </div>
  );
});
