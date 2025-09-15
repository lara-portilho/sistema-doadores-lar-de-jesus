import { TiposPagamento } from "@app/stores/entities/enums/TiposPagamento";
import { IDoador } from "@stores/entities/Doador";
import { IPagamento } from "@stores/entities/Pagamento";
import { formatDateString } from "@utils/formatDateString";

type FormatRelatorioMensalData = {
  doadores: IDoador[];
  pagamentos: IPagamento[];
  mes: string;
};

type RelatorioMensalCsvFormat = {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
};

export function formatRelatorioMensal({
  doadores,
  pagamentos,
  mes,
}: FormatRelatorioMensalData) {
  let sumPix = 0;
  let sumCartao = 0;
  let sumDinheiro = 0;
  let sumTev = 0;

  const firstLine: RelatorioMensalCsvFormat = {
    column1: "DOADOR",
    column2: "TIPO PAGAMENTO",
    column3: `DATA PAGAMENTO ${formatDateString(mes, "MMM/yyyy").toUpperCase()}`,
    column4: "TOTAL PAGO NA DATA",
  };

  const csvData = [firstLine];

  for (const doador of doadores) {
    const filteredPagamentos = pagamentos.filter(
      (pag) => pag.doadorId === doador.id,
    );

    const pagamentoRelacionado = filteredPagamentos.find((pag) =>
      pag.mesesQuitados?.includes(mes),
    );

    const line: RelatorioMensalCsvFormat = {
      column1: doador.nome,
      column2: pagamentoRelacionado?.metodo || "",
      column3: pagamentoRelacionado
        ? formatDateString(pagamentoRelacionado.data, "dd/MM/yyyy")
        : "",
      column4: pagamentoRelacionado
        ? `R$${pagamentoRelacionado.valorTotal.toFixed(2)}`
        : "",
    };

    if (pagamentoRelacionado?.metodo === TiposPagamento.Pix) {
      sumPix += pagamentoRelacionado.valorTotal;
    } else if (pagamentoRelacionado?.metodo === TiposPagamento.Cartao) {
      sumCartao += pagamentoRelacionado.valorTotal;
    } else if (pagamentoRelacionado?.metodo === TiposPagamento.Dinheiro) {
      sumDinheiro += pagamentoRelacionado.valorTotal;
    } else if (pagamentoRelacionado?.metodo === TiposPagamento.TEV) {
      sumTev += pagamentoRelacionado.valorTotal;
    }

    csvData.push(line);
  }

  const lastLine: RelatorioMensalCsvFormat = {
    column1: `PIX: R$${sumPix.toFixed(2)}`,
    column2: `CARTAO: R$${sumCartao.toFixed(2)}`,
    column3: `DINHEIRO: R$${sumDinheiro.toFixed(2)}`,
    column4: `TEV: R$${sumTev.toFixed(2)}`,
  };

  csvData.push(lastLine);

  return csvData;
}
