/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@components/actions/Button";
import { IconButton } from "@components/actions/IconButton";
import { Select } from "@components/actions/Select";
import { TextInput } from "@components/actions/TextInput";
import {
  AddIcon,
  CalendarIcon,
  DeleteIcon,
  EditIcon,
  HistoryIcon,
  ListIcon,
  MoneyIcon,
  SearchIcon,
  TableIcon,
} from "@components/icons";
import { getDepartamentosLabel } from "@enums/Departamentos";
import { getTiposDoadorLabel, TiposDoador } from "@enums/TiposDoador";
import { useStore } from "@hooks/useStore";
import { formatDateString } from "@utils/formatDateString";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const DoadoresTable = observer(() => {
  const {
    authCtrl,
    doadoresCtrl,
    pagamentosCtrl,
    historicoCtrl,
    relatorioPeriodoCtrl,
    relatorioMensalCtrl,
    relatorioDescritivoCtrl,
  } = useStore();
  const [search, setSearch] = useState("");
  const [tipoFilter, setTipoFilter] = useState<TiposDoador | "">("");

  const filteredDoadores = doadoresCtrl.filteredDoadores?.filter((doador) => {
    if (tipoFilter === "")
      return doador.nome.toLowerCase().includes(search.toLowerCase());
    return (
      doador.nome.toLowerCase().includes(search.toLowerCase()) &&
      doador.tipo === tipoFilter
    );
  });

  async function onDelete(id: string) {
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
      <div className="flex items-start justify-between gap-10">
        <div className="flex w-1/4 flex-1 items-end gap-2">
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1"
            placeholder="Pesquisar"
            onClear={() => setSearch("")}
            icon={<SearchIcon className="size-4" />}
          />
          <Select
            value={tipoFilter}
            onChange={(e) => setTipoFilter(e.target.value as TiposDoador)}
            options={Object.values(TiposDoador).map((tipo) => ({
              label: getTiposDoadorLabel(tipo),
              value: tipo,
            }))}
            className="min-w-48"
            onClear={() => setTipoFilter("")}
            clearMessage="Filtre por tipo"
          />
        </div>
        {authCtrl.isEdit && (
          <div className="flex gap-2">
            <Button onClick={() => relatorioDescritivoCtrl.setModalOpen()}>
              <ListIcon />
              Relatório descritivo
            </Button>
            <Button onClick={() => relatorioMensalCtrl.setModalOpen()}>
              <TableIcon />
              Relatório mensal
            </Button>
            <Button onClick={() => relatorioPeriodoCtrl.setModalOpen()}>
              <CalendarIcon />
              Relatório por período
            </Button>
            <Button onClick={() => doadoresCtrl.setModalOpen()}>
              <AddIcon />
              Cadastrar doador
            </Button>
          </div>
        )}
      </div>
      <table className="w-full table-fixed rounded-lg bg-white">
        <thead>
          <tr className="[&>th]:border-r [&>th]:border-gray-300 [&>th]:py-1 [&>th]:last:border-0">
            <th>Nome</th>
            <th>Tipo</th>
            <th>Departamento</th>
            <th>Valor</th>
            <th>Data último pagamento</th>
            <th>Último mês quitado</th>
            <th className={authCtrl.isEdit ? "w-28" : "w-5"} />
          </tr>
        </thead>
        <tbody>
          {filteredDoadores.map((doador) => (
            <tr
              key={doador.id}
              className="border-t border-gray-300 [&>td]:border-r [&>td]:border-gray-300 [&>td]:px-1.5 [&>td]:py-0.5 [&>td]:last:border-0"
            >
              <td>{doador.nome}</td>
              <td>{getTiposDoadorLabel(doador.tipo)}</td>
              <td>{getDepartamentosLabel(doador.departamento)}</td>
              <td>R$ {doador.valor.toFixed(2).replace(".", ",")}</td>
              <td>
                {doador.dataUltimoPag
                  ? formatDateString(doador.dataUltimoPag, "dd/MM/yyyy")
                  : "Sem doações"}
              </td>
              <td>
                {doador.ultimoMes
                  ? formatDateString(doador.ultimoMes, "MMM/yyyy")
                  : "Sem doações"}
              </td>
              <td className="text-center">
                <IconButton
                  onClick={() => historicoCtrl.setModalOpen(doador.id)}
                >
                  <HistoryIcon className="size-4 text-blue-500" />
                </IconButton>
                {authCtrl.isEdit && (
                  <>
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
                    <IconButton onClick={() => onDelete(doador.id)}>
                      <DeleteIcon className="size-4 text-red-500" />
                    </IconButton>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
});
