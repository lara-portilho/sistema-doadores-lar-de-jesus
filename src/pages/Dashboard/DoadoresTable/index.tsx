/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@components/actions/Button";
import { IconButton } from "@components/actions/IconButton";
import { TextInput } from "@components/actions/TextInput";
import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  HistoryIcon,
  MoneyIcon,
  SearchIcon,
} from "@components/icons";
import { useStore } from "@hooks/useStore";
import { getDepartamentosLabel } from "@stores/entities/enums/Departamentos";
import { getTiposDoadorLabel } from "@stores/entities/enums/TiposDoador";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const DoadoresTable = observer(() => {
  const { authCtrl, doadoresCtrl, pagamentosCtrl, historicoCtrl } = useStore();
  const [search, setSearch] = useState("");

  async function handleDelete(id: string) {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Atenção!",
        text: "Tem certeza que deseja excluir esse doador?",
        icon: "warning",
        confirmButtonText: "Excluir",
        confirmButtonColor: "#fb2c36",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#919090",
        reverseButtons: true,
      });
      if (!isConfirmed) return;
      await doadoresCtrl.deleteDoador(id);
      await doadoresCtrl.getDoadores();
      toast.success("Doador excluído com sucesso!");
    } catch (err) {
      toast.error("Houve algum erro ao excluir o doador!");
      console.log(err);
    }
  }

  useEffect(() => {
    doadoresCtrl.getDoadores();
    return () => doadoresCtrl.reset();
  }, []);

  return (
    <>
      <div className="flex justify-between items-start">
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
          placeholder="Pesquisar"
          onClear={() => setSearch("")}
          icon={<SearchIcon className="size-4" />}
        />
        {authCtrl.isEdit && (
          <Button onClick={() => doadoresCtrl.setModalOpen()}>
            <AddIcon />
            Cadastrar doador
          </Button>
        )}
      </div>
      <table className="bg-white w-full rounded-lg table-fixed">
        <thead>
          <tr className="[&>th]:py-1 [&>th]:border-r [&>th]:border-gray-300 [&>th]:last:border-0">
            <th>Nome</th>
            <th>Tipo</th>
            <th>Departamento</th>
            <th>Valor</th>
            <th>Data último pagamento</th>
            <th>Último mês quitado</th>
            {authCtrl.isEdit && <th className="w-28" />}
          </tr>
        </thead>
        <tbody>
          {doadoresCtrl.doadores
            ?.filter((doador) =>
              doador.nome.toLowerCase().includes(search.toLowerCase()),
            )
            .map((doador) => (
              <tr
                key={doador.id}
                className="border-t border-gray-300 [&>td]:py-0.5 [&>td]:px-1.5 [&>td]:border-r [&>td]:border-gray-300 [&>td]:last:border-0"
              >
                <td>{doador.nome}</td>
                <td>{getTiposDoadorLabel(doador.tipo)}</td>
                <td>{getDepartamentosLabel(doador.departamento)}</td>
                <td>R$ {doador.valor.toFixed(2).replace(".", ",")}</td>
                <td>
                  {doador.dataUltimoPag
                    ? format(parseISO(doador.dataUltimoPag), "dd/MM/yyyy", {
                        locale: ptBR,
                      })
                    : "Sem doações"}
                </td>
                <td>
                  {doador.ultimoMes
                    ? format(parseISO(doador.ultimoMes), "MMM/yyyy", {
                        locale: ptBR,
                      })
                    : "Sem doações"}
                </td>
                {authCtrl.isEdit && (
                  <td className="text-center">
                    <IconButton
                      onClick={() => historicoCtrl.setModalOpen(doador.id)}
                    >
                      <HistoryIcon className="size-4 text-blue-500" />
                    </IconButton>
                    <IconButton
                      onClick={() => pagamentosCtrl.setModalOpen(doador.id)}
                    >
                      <MoneyIcon className="size-4 text-green-500" />
                    </IconButton>
                    <IconButton
                      onClick={() => doadoresCtrl.setModalOpen(doador.id)}
                    >
                      <EditIcon className="size-4" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(doador.id)}>
                      <DeleteIcon className="size-4 text-red-500" />
                    </IconButton>
                  </td>
                )}
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
});
