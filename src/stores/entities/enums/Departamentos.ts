export const Departamentos = {
  AssitenciaSocial: "assitenciaSocial",
  Atendimento: "atendimento",
  Coral: "coral",
  Mediunico: "mediunico",
  Diretoria: "diretoria",
  Escola: "escola",
  Estudos: "estudos",
  Eventos: "eventos",
  Infancia: "infancia",
  Juventude: "juventude",
  ObraBerco: "obraBerco",
  Trabalhador: "trabalhador",
  SemDepartamento: "semDepartamento",
} as const;

const DepartamentosLabels = {
  [Departamentos.AssitenciaSocial]: "Assit. e Prom. Social",
  [Departamentos.Atendimento]: "Atendimento",
  [Departamentos.Coral]: "Coral",
  [Departamentos.Mediunico]: "Dep. Mediúnico",
  [Departamentos.Diretoria]: "Diretoria",
  [Departamentos.Escola]: "Escola",
  [Departamentos.Estudos]: "Estudos",
  [Departamentos.Eventos]: "Eventos",
  [Departamentos.Infancia]: "Infância",
  [Departamentos.Juventude]: "Juventude",
  [Departamentos.ObraBerco]: "Obra do Berço",
  [Departamentos.Trabalhador]: "Trabalhador",
  [Departamentos.SemDepartamento]: "Sem Departamento",
} as const;

export function getDepartamentosLabel(type: Departamentos) {
  return DepartamentosLabels[type];
}

export type Departamentos = (typeof Departamentos)[keyof typeof Departamentos];
