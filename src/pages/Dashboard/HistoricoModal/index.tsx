/* eslint-disable react-hooks/exhaustive-deps */
import { Modal } from "@components/layout/Modal";
import { useStore } from "@hooks/useStore";
import { getTiposPagamentoLabel } from "@stores/entities/enums/TiposPagamento";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";

export const HistoricoModal = observer(() => {
  const { historicoCtrl, doadoresCtrl } = useStore();
  const doador = useMemo(
    () =>
      doadoresCtrl.doadores.find(
        (doador) => doador.id === historicoCtrl.selectedDoadorId,
      ),
    [doadoresCtrl.doadores.length, historicoCtrl.selectedDoadorId],
  );

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
      <h1 className="font-bold text-2xl mb-2">
        Histórico de pagamentos de {doador?.nome}
      </h1>
      {historicoCtrl.pagamentos.length ? (
        <table className="bg-white w-full rounded-lg table-fixed">
          <thead>
            <tr className="[&>th]:py-1 [&>th]:border-r [&>th]:border-gray-300 [&>th]:last:border-0">
              <th>Data</th>
              <th>Valor mensal</th>
              <th>Valor extra</th>
              <th>Valor total</th>
              <th>Método</th>
              <th className="w-56">Meses pagos</th>
            </tr>
          </thead>
          <tbody>
            {historicoCtrl.pagamentos.map((pagamento) => {
              const mesesPagos =
                (pagamento.valorTotal - (pagamento.valorExtra ?? 0)) /
                pagamento.valorMensalidade;
              return (
                <tr
                  key={pagamento.id}
                  className="border-t border-gray-300 [&>td]:py-0.5 [&>td]:px-1.5 [&>td]:border-r [&>td]:border-gray-300 [&>td]:last:border-0"
                >
                  <td>{format(parseISO(pagamento.data), "dd/MM/yyyy")}</td>
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
                    {format(
                      parseISO(pagamento.primeiroMesQuitado),
                      "MMM/yyyy",
                      {
                        locale: ptBR,
                      },
                    )}
                    {pagamento.primeiroMesQuitado !==
                      pagamento.ultimoMesQuitado && (
                      <>
                        {" "}
                        à{" "}
                        {format(
                          parseISO(pagamento.ultimoMesQuitado),
                          "MMM/yyyy",
                          {
                            locale: ptBR,
                          },
                        )}
                      </>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p className="text-center w-full font-medium text-lg py-5">
          Esse doador ainda não fez doações!
        </p>
      )}
    </Modal>
  );
});
