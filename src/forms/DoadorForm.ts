import { DoadorDTO } from "@dtos/DoadorDTO";
import { Doador } from "@entities/Doador";
import { Departamentos } from "@enums/Departamentos";
import { TiposDoador } from "@enums/TiposDoador";
import { RegisterOptions } from "react-hook-form";

export type DoadorFormValues = {
  nome: string;
  tipo: string;
  cpf: string;
  endereco: string;
  telefone: string;
  email: string;
  aniversario: string;
  departamento: string;
  valor: string;
};

type DoadorValidationRules = Record<
  keyof DoadorFormValues,
  RegisterOptions<DoadorFormValues>
>;

export const doadorForm = {
  defaultValues: {
    nome: "",
    tipo: TiposDoador.Esporadico,
    cpf: "",
    endereco: "",
    telefone: "",
    email: "",
    aniversario: "",
    departamento: Departamentos.SemDepartamento,
    valor: "",
  },

  getValidationRules(): DoadorValidationRules {
    return {
      nome: {
        required: "O nome é obrigatório!",
      },
      cpf: {
        pattern: {
          value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
          message: "Insira um CPF válido!",
        },
      },
      telefone: {
        pattern: {
          value: /(\((\d{2})\)) (9?\d{4})-(\d{4})/,
          message: "Insira um telefone válido!",
        },
      },
      email: {
        pattern: {
          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "Insira um email válido!",
        },
      },
      endereco: {},
      aniversario: {
        validate: (value) => {
          if (!value) return true;
          if (new Date(value) < new Date()) return true;
          return "O aniversário deve ser anterior à data atual!";
        },
      },
      valor: {
        required: "O valor é obrigatório!",
        valueAsNumber: true,
      },
      tipo: {
        required: "O tipo é obrigatório",
      },
      departamento: {
        required: "O departamento é obrigatório",
      },
    };
  },

  getDTOValues(formValues: DoadorFormValues): DoadorDTO {
    return {
      nome: formValues.nome,
      tipo: formValues.tipo as TiposDoador,
      cpf: formValues.cpf || undefined,
      endereco: formValues.endereco || undefined,
      telefone: formValues.telefone || undefined,
      email: formValues.email || undefined,
      aniversario: formValues.aniversario || undefined,
      departamento: formValues.departamento as Departamentos,
      valor: Number(formValues.valor),
    };
  },

  getFormValues(doador: Doador): DoadorFormValues {
    return {
      nome: doador.nome,
      tipo: doador.tipo,
      cpf: doador.cpf || "",
      endereco: doador.endereco || "",
      telefone: doador.telefone || "",
      email: doador.email || "",
      aniversario: doador.aniversario || "",
      departamento: doador.departamento,
      valor: doador.valor.toString(),
    };
  },
};
