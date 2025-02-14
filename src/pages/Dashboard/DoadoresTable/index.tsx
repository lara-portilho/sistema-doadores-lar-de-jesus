/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@components/actions/Button";
import { IconButton } from "@components/actions/IconButton";
import { TextInput } from "@components/actions/TextInput";
import { useStore } from "@hooks/useStore";
import { getDepartamentosLabel } from "@stores/entities/enums/Departamentos";
import { getTiposDoadorLabel } from "@stores/entities/enums/TiposDoador";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import {
  MdAdd,
  MdAttachMoney,
  MdDelete,
  MdEdit,
  MdSearch,
} from "react-icons/md";

export const DoadoresTable = observer(() => {
  const { authCtrl, doadoresCtrl } = useStore();
  const [search, setSearch] = useState("");

  useEffect(() => {
    doadoresCtrl.getDoadores();
  }, []);

  function handleDelete(cpf: string) {
    doadoresCtrl.deleteDoador(cpf);
    doadoresCtrl.getDoadores();
  }

  return (
    <>
      <div className="flex justify-between items-start">
        <TextInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/3"
          placeholder="Pesquisar"
          onClear={() => setSearch("")}
          icon={<MdSearch className="size-4" />}
        />
        {authCtrl.isEdit && (
          <Button onClick={() => doadoresCtrl.setModalOpen()}>
            <MdAdd />
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
            <th>Última doação</th>
            {authCtrl.isEdit && <th className="w-24" />}
          </tr>
        </thead>
        <tbody>
          {doadoresCtrl.doadores
            ?.filter((doador) =>
              doador.nome.toLowerCase().includes(search.toLowerCase()),
            )
            .map((doador, i) => (
              <tr
                key={i}
                className="border-t border-gray-300 [&>td]:py-0.5 [&>td]:px-1.5 [&>td]:border-r [&>td]:border-gray-300 [&>td]:last:border-0"
              >
                <td>{doador.nome}</td>
                <td>{getTiposDoadorLabel(doador.tipo)}</td>
                <td>{getDepartamentosLabel(doador.departamento)}</td>
                <td>R$ {doador.valor.toFixed(2).replace(".", ",")}</td>
                <td>
                  {doador.ultimoMes
                    ? format(parseISO(doador.ultimoMes), "MMM/yyyy", {
                        locale: ptBR,
                      })
                    : "Sem doações"}
                </td>
                {authCtrl.isEdit && (
                  <td className="text-center">
                    <IconButton>
                      <MdAttachMoney className="size-4 text-green-500" />
                    </IconButton>
                    <IconButton
                      onClick={() => doadoresCtrl.setModalOpen(doador.cpf)}
                    >
                      <MdEdit className="size-4" />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(doador.cpf)}>
                      <MdDelete className="size-4 text-red-500" />
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
