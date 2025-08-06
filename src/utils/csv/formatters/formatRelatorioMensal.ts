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
  doador: string;
  tipoPagamento: string;
  dataPagamento: string;
  pagoData: string;
};

export function formatRelatorioMensal({
  doadores,
  pagamentos,
  mes,
}: FormatRelatorioMensalData) {
  let sumPix = 0;
  let sumCartao = 0;
  let sumDinheiro = 0;

  const firstLine: RelatorioMensalCsvFormat = {
    doador: "DOADOR",
    tipoPagamento: "TIPO PAGAMENTO",
    dataPagamento: `DATA PAGAMENTO ${formatDateString(mes, "MMM/yyyy").toUpperCase()}`,
    pagoData: "TOTAL PAGO NA DATA",
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
      doador: doador.nome,
      tipoPagamento: pagamentoRelacionado?.metodo || "",
      dataPagamento: pagamentoRelacionado
        ? formatDateString(pagamentoRelacionado.data, "dd/MM/yyyy")
        : "",
      pagoData: `R$${pagamentoRelacionado?.valorTotal.toFixed(2)}`,
    };

    if (pagamentoRelacionado?.metodo === TiposPagamento.Pix) {
      sumPix += pagamentoRelacionado.valorTotal;
    } else if (pagamentoRelacionado?.metodo === TiposPagamento.Cartao) {
      sumCartao += pagamentoRelacionado.valorTotal;
    } else if (pagamentoRelacionado?.metodo === TiposPagamento.Dinheiro) {
      sumDinheiro += pagamentoRelacionado.valorTotal;
    }

    csvData.push(line);
  }

  const lastLine: RelatorioMensalCsvFormat = {
    doador: `PIX: R$${sumPix.toFixed(2)}`,
    tipoPagamento: `CARTAO: R$${sumCartao.toFixed(2)}`,
    dataPagamento: `DINHEIRO: R$${sumDinheiro.toFixed(2)}`,
    pagoData: "",
  };

  csvData.push(lastLine);

  return csvData;
}
