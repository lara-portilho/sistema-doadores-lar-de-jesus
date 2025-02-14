export const Departamentos = {
  Mediunico: "mediunico",
  Estudos: "estudos",
  Atendimento: "atendimento",
  Trabalhador: "trabalhador",
  SemDepartamento: "semDepartamento",
} as const;

const DepartamentosLabels = {
  [Departamentos.Mediunico]: "Dep. Mediúnico",
  [Departamentos.Estudos]: "Estudos",
  [Departamentos.Atendimento]: "Atendimento",
  [Departamentos.Trabalhador]: "Trabalhador",
  [Departamentos.SemDepartamento]: "Sem Departamento",
} as const;

export function getDepartamentosLabel(type: Departamentos) {
  return DepartamentosLabels[type];
}

export type Departamentos = (typeof Departamentos)[keyof typeof Departamentos];
