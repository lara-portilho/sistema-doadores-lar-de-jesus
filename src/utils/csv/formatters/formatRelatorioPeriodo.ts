import { Doador } from "@entities/Doador";
import { Pagamento } from "@entities/Pagamento";
import { formatDateString } from "@utils/formatDateString";

type FormatRelatorioPeriodoData = {
  doadores: Doador[];
  pagamentos: Pagamento[];
  meses: string[];
};

type RelatorioPeriodoCsvFormat = {
  doador: string;
  [mes: string]: string;
};

export function formatRelatorioPeriodo({
  doadores,
  pagamentos,
  meses,
}: FormatRelatorioPeriodoData) {
  const firstLine: RelatorioPeriodoCsvFormat = { doador: "DOADOR" };

  const mesesKeys = meses.map((mes) => {
    return {
      value: mes,
      label: formatDateString(mes, "MMM/yyyy").toUpperCase(),
    };
  });

  mesesKeys.forEach((mes) => {
    firstLine[mes.label] = mes.label;
  });

  const csvData = [firstLine];

  for (const doador of doadores) {
    const filteredPagamentos = pagamentos.filter(
      (pag) => pag.doadorId === doador.id,
    );
    const line: RelatorioPeriodoCsvFormat = { doador: doador.nome };

    for (const mes of mesesKeys) {
      const pagamentoRelacionado = filteredPagamentos.find((pag) =>
        pag.mesesQuitados?.includes(mes.value),
      );

      line[mes.label] = pagamentoRelacionado
        ? formatDateString(pagamentoRelacionado.data, "dd/MM/yyyy")
        : "";
    }
    csvData.push(line);
  }

  return csvData;
}
