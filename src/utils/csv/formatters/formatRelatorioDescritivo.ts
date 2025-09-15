import { TiposPagamento } from "@app/stores/entities/enums/TiposPagamento";
import { IDoador } from "@stores/entities/Doador";
import { IPagamento } from "@stores/entities/Pagamento";
import { formatDateString } from "@utils/formatDateString";

type FormatRelatorioDescritivoData = {
  doadores: IDoador[];
  pagamentos: IPagamento[];
  dias: string[];
};

type RelatorioDescritivoCsvFormat = {
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
};

const emptyLine = {
  column1: "",
  column2: "",
  column3: "",
  column4: "",
  column5: "",
};

export function formatRelatorioDescritivo({
  doadores,
  pagamentos,
  dias,
}: FormatRelatorioDescritivoData) {
  let sumPix = 0;
  let sumCartao = 0;
  let sumDinheiro = 0;
  let sumTev = 0;
  const mes = dias[0];

  const firstLine: RelatorioDescritivoCsvFormat = {
    column1: "MÊS/ANO",
    column2: formatDateString(mes, "MMM/yyyy").toUpperCase(),
    column3: "",
    column4: "",
    column5: "",
  };

  const csvData = [firstLine];

  for (const dia of dias) {
    const filteredPagamentos = pagamentos.filter((pag) => pag.data === dia);
    if (filteredPagamentos.length === 0) continue;
    const lines = [
      {
        column1: "DIA/MÊS/ANO",
        column2: formatDateString(dia, "dd/MM/yyyy"),
        column3: "",
        column4: "",
        column5: "",
      },
      {
        column1: "DOADOR",
        column2: "FORMA DE PAGAMENTO",
        column3: "MESES DE REFERÊNCIA",
        column4: "VALOR EXTRA",
        column5: "VALOR TOTAL",
      },
    ];

    for (const pagamento of filteredPagamentos) {
      const doador = doadores.find(
        (doador) => doador.id === pagamento.doadorId,
      );

      if (
        pagamento.mesesQuitados === undefined ||
        pagamento.mesesQuitados.length === 0
      )
        continue;

      let mesesQuitadosString = formatDateString(
        pagamento.mesesQuitados[0],
        "MMM/yyyy",
      ).toUpperCase();

      if (pagamento.mesesQuitados.length > 1)
        mesesQuitadosString += ` à ${formatDateString(pagamento.mesesQuitados[pagamento.mesesQuitados.length - 1], "MMM/yyyy").toUpperCase()}`;

      lines.push({
        column1: doador?.nome || "",
        column2: pagamento.metodo,
        column3: mesesQuitadosString,
        column4: `R$${(pagamento.valorExtra || 0).toFixed(2)}`,
        column5: `R$${pagamento.valorTotal.toFixed(2)}`,
      });

      if (pagamento.metodo === TiposPagamento.Pix) {
        sumPix += pagamento.valorTotal;
      } else if (pagamento.metodo === TiposPagamento.Cartao) {
        sumCartao += pagamento.valorTotal;
      } else if (pagamento.metodo === TiposPagamento.Dinheiro) {
        sumDinheiro += pagamento.valorTotal;
      } else if (pagamento.metodo === TiposPagamento.TEV) {
        sumTev += pagamento.valorTotal;
      }
    }

    csvData.push(...lines, emptyLine);
  }

  const lastLine: RelatorioDescritivoCsvFormat = {
    column1: `PIX: R$${sumPix.toFixed(2)}`,
    column2: `CARTAO: R$${sumCartao.toFixed(2)}`,
    column3: `DINHEIRO: R$${sumDinheiro.toFixed(2)}`,
    column4: `TEV: R$${sumTev.toFixed(2)}`,
    column5: "",
  };

  csvData.push(emptyLine, lastLine);

  return csvData;
}
