/* eslint-disable react-hooks/exhaustive-deps */
import { IconButton } from "@components/actions/IconButton";
import { DeleteIcon } from "@components/icons";
import { Modal } from "@components/layout/Modal";
import { getTiposPagamentoLabel } from "@enums/TiposPagamento";
import { useStore } from "@hooks/useStore";
import { formatDateString } from "@utils/formatDateString";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const HistoricoModal = observer(() => {
  const { historicoCtrl, doadoresCtrl, authCtrl } = useStore();
  const doador = doadoresCtrl.doadores.find(
    (doador) => doador.id === historicoCtrl.selectedDoadorId,
  );

  async function onDelete(id: string, sobrescrever: boolean) {
    try {
      const { isConfirmed } = await Swal.fire({
        title: "Atenção!",
        text: "Tem certeza que deseja excluir esse pagamento?",
        icon: "warning",
        confirmButtonText: "Excluir",
        confirmButtonColor: "#fb2c36",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#919090",
        reverseButtons: true,
      });
      if (!isConfirmed) return;
      await historicoCtrl.deletePagamento(id, sobrescrever);
      await historicoCtrl.getHistorico();
      await doadoresCtrl.getDoadores();
      toast.success("Doador excluído com sucesso!");
    } catch (err) {
      toast.error("Houve algum erro ao excluir o doador!");
      console.log(err);
    }
  }

  useEffect(() => {
    historicoCtrl.getHistorico();
    return () => historicoCtrl.reset();
  }, [historicoCtrl.selectedDoadorId]);

  return (
    <Modal
      isOpen={historicoCtrl.modalOpen}
      onRequestClose={() => historicoCtrl.setModalClose()}
      size="60rem"
    >
      <h1 className="mb-2 text-2xl font-bold">
        Histórico de pagamentos de {doador?.nome}
      </h1>
      {historicoCtrl.filteredPagamentos.length ? (
        <table className="w-full table-fixed rounded-lg bg-white">
          <thead>
            <tr className="[&>th]:border-r [&>th]:border-gray-300 [&>th]:py-1 [&>th]:last:border-0">
              <th>Data</th>
              <th>Valor mensal</th>
              <th>Valor extra</th>
              <th>Valor total</th>
              <th>Método</th>
              <th className="w-56">Meses pagos</th>
              {authCtrl.isEdit && <th className="w-5" />}
            </tr>
          </thead>
          <tbody>
            {historicoCtrl.filteredPagamentos.map((pagamento, index) => {
              const mesesPagos =
                (pagamento.valorTotal - (pagamento.valorExtra ?? 0)) /
                pagamento.valorMensalidade;
              return (
                <tr
                  key={pagamento.id}
                  className="border-t border-gray-300 [&>td]:border-r [&>td]:border-gray-300 [&>td]:px-1.5 [&>td]:py-0.5 [&>td]:last:border-0"
                >
                  <td>{formatDateString(pagamento.data, "dd/MM/yyyy")}</td>
                  <td>
                    {mesesPagos} x R${" "}
                    {pagamento.valorMensalidade.toFixed(2).replace(".", ",")}
                  </td>
                  <td>
                    R$ {pagamento.valorExtra?.toFixed(2).replace(".", ",")}
                  </td>
                  <td>
                    R$ {pagamento.valorTotal.toFixed(2).replace(".", ",")}
                  </td>
                  <td>{getTiposPagamentoLabel(pagamento.metodo)}</td>
                  <td>
                    {formatDateString(pagamento.mesesQuitados[0], "MMM/yyyy")}
                    {pagamento.mesesQuitados.length > 1 && (
                      <>
                        {" "}
                        à{" "}
                        {formatDateString(
                          pagamento.mesesQuitados[
                            pagamento.mesesQuitados.length - 1
                          ],
                          "MMM/yyyy",
                        )}
                      </>
                    )}
                  </td>
                  {authCtrl.isEdit && (
                    <td>
                      <IconButton
                        onClick={() => onDelete(pagamento.id, index === 0)}
                      >
                        <DeleteIcon className="size-4 text-red-500" />
                      </IconButton>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="w-full py-5 text-center text-lg font-medium">
          Esse doador ainda não fez doações!
        </p>
      )}
    </Modal>
  );
});
