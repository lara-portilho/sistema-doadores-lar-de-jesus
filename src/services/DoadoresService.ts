import { IDoador } from "@stores/entities/Doador";

const doadores: IDoador[] = [
  {
    nome: "Constantina Trineman",
    tipo: "esporadico",
    cpf: "100.123.456-89",
    telefone: "(62) 98982-5842",
    email: "ctrineman0@geocities.com",
    aniversario: "2023-01-19",
    departamento: "semDepartamento",
    valor: 86,
    ultimoMes: "2022-05-21",
  },
  {
    nome: "Alexi Duesberry",
    tipo: "esporadico",
    cpf: "200.123.456-89",
    telefone: "(62) 3650-5428",
    email: "aduesberry1@ucoz.com",
    aniversario: "2023-02-12",
    departamento: "mediunico",
    valor: 57,
    ultimoMes: "2023-06-27",
  },
  {
    nome: "Norbie Schooley",
    tipo: "naoEfetivo",
    cpf: "300.123.456-89",
    telefone: "(62) 98982-5842",
    email: "nschooley2@sun.com",
    aniversario: "2023-04-22",
    departamento: "atendimento",
    valor: 51,
    ultimoMes: "2023-12-01",
  },
  {
    nome: "Ardisj Guilliatt",
    tipo: "naoEfetivo",
    cpf: "400.123.456-89",
    telefone: "(62) 98982-5842",
    email: "aguilliatt3@discuz.net",
    aniversario: "2023-06-29",
    departamento: "estudos",
    valor: 17,
    ultimoMes: "2024-10-28",
  },
  {
    nome: "Alexandra Babonau",
    tipo: "esporadico",
    cpf: "500.123.456-89",
    telefone: "(62) 98982-5842",
    email: "ababonau4@ibm.com",
    aniversario: "2024-09-20",
    departamento: "trabalhador",
    valor: 42,
    ultimoMes: "2023-07-15",
  },
  {
    nome: "Sissy Baxter",
    tipo: "naoEfetivo",
    cpf: "600.123.456-89",
    telefone: "(62) 98982-5842",
    email: "sbaxter5@theglobeandmail.com",
    aniversario: "2023-01-04",
    departamento: "mediunico",
    valor: 63,
    ultimoMes: "2023-10-11",
  },
  {
    nome: "Jobey Izkovitch",
    tipo: "efetivo",
    cpf: "700.123.456-89",
    telefone: "(62) 98982-5842",
    email: "jizkovitch6@umn.edu",
    aniversario: "2024-12-17",
    departamento: "mediunico",
    valor: 29,
    ultimoMes: "2024-05-23",
  },
  {
    nome: "Dita Dilliston",
    tipo: "naoEfetivo",
    cpf: "800.123.456-89",
    telefone: "(62) 98982-5842",
    email: "ddilliston7@tamu.edu",
    aniversario: "2022-12-22",
    departamento: "atendimento",
    valor: 14,
    ultimoMes: "2024-10-14",
  },
  {
    nome: "Donaugh Finnimore",
    tipo: "naoEfetivo",
    cpf: "900.123.456-89",
    telefone: "(62) 98982-5842",
    email: "dfinnimore8@shop-pro.jp",
    aniversario: "2024-02-26",
    departamento: "atendimento",
    valor: 91,
    ultimoMes: "2024-10-02",
  },
  {
    nome: "Pollyanna McReynolds",
    tipo: "naoEfetivo",
    cpf: "040.123.456-89",
    telefone: "(62) 98982-5842",
    email: "pmcreynolds9@hostgator.com",
    aniversario: "2024-07-03",
    departamento: "atendimento",
    valor: 70,
    ultimoMes: "2023-04-21",
  },
];

export const DoadoresService = {
  getDoadores: (): IDoador[] => {
    return doadores;
  },
  addDoador: (doador: IDoador) => {
    doadores.push(doador);
  },
  updateDoador: (doador: IDoador) => {
    const index = doadores.findIndex((d) => d.cpf === doador.cpf);
    if (index !== -1) doadores[index] = doador;
  },
  deleteDoador: (cpf: string) => {
    const index = doadores.findIndex((d) => d.cpf === cpf);
    if (index !== -1) doadores.splice(index, 1);
  },
};
