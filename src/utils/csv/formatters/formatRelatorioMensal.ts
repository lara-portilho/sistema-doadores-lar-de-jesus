import { IDoador } from "@stores/entities/Doador";
import { IPagamento } from "@stores/entities/Pagamento";
import { formatDateString } from "@utils/formatDateString";

type FormatRelatorioMensalData = {
  doadores: IDoador[];
  pagamentos: IPagamento[];
  mes: string;
};

type RelatorioMensalCsvFormat = {
  doador: string;
  tipoPagamento: string;
  dataPagamento: string;
};

export function formatRelatorioMensal({
  doadores,
  pagamentos,
  mes,
}: FormatRelatorioMensalData) {
  const firstLine: RelatorioMensalCsvFormat = {
    doador: "DOADOR",
    tipoPagamento: "TIPO PAGAMENTO",
    dataPagamento: `DATA PAGAMENTO ${formatDateString(mes, "MMM/yyyy").toUpperCase()}`,
  };

  const csvData = [firstLine];

  for (const doador of doadores) {
    const filteredPagamentos = pagamentos.filter(
      (pag) => pag.doadorId === doador.id,
    );

    const pagamentoRelacionado = filteredPagamentos.find((pag) =>
      pag.mesesQuitados?.includes(mes),
    );

    console.log(doadores, filteredPagamentos, pagamentoRelacionado);

    const line: RelatorioMensalCsvFormat = {
      doador: doador.nome,
      tipoPagamento: pagamentoRelacionado?.metodo || "",
      dataPagamento: pagamentoRelacionado
        ? formatDateString(pagamentoRelacionado.data, "dd/MM/yyyy")
        : "",
    };

    csvData.push(line);
  }

  return csvData;
}
