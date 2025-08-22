export const TiposDoador = {
  Esporadico: "esporadico",
  Efetivo: "efetivo",
  NaoEfetivo: "naoEfetivo",
  AdoteAprendiz: "adoteAprendiz",
} as const;

const TiposDoadorLabels = {
  [TiposDoador.Esporadico]: "Esporádico",
  [TiposDoador.Efetivo]: "S. Efetivo",
  [TiposDoador.NaoEfetivo]: "S. Não Efetivo",
  [TiposDoador.AdoteAprendiz]: "Adote um Aprendiz",
} as const;

export function getTiposDoadorLabel(type: TiposDoador) {
  return TiposDoadorLabels[type];
}

export type TiposDoador = (typeof TiposDoador)[keyof typeof TiposDoador];
