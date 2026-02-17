export const TiposPagamento = {
  Pix: "pix",
  Dinheiro: "dinheiro",
  Cartao: "cartao",
  TEV: "tev",
} as const;

const TiposPagamentoLabels = {
  [TiposPagamento.Pix]: "Pix",
  [TiposPagamento.Dinheiro]: "Dinheiro",
  [TiposPagamento.Cartao]: "Cartão",
  [TiposPagamento.TEV]: "TEV",
} as const;

export function getTiposPagamentoLabel(type: TiposPagamento) {
  return TiposPagamentoLabels[type];
}

export type TiposPagamento =
  (typeof TiposPagamento)[keyof typeof TiposPagamento];
