import { TiposDoador } from "@enums/TiposDoador";
import { format } from "date-fns";
import { RegisterOptions } from "react-hook-form";

export type RelatorioMensalFormValues = {
  tipoDoador: string;
  mes: string;
};

type RelatorioMensalValidationRules = Record<
  keyof RelatorioMensalFormValues,
  RegisterOptions<RelatorioMensalFormValues>
>;

export const relatorioMensalForm = {
  defaultValues: {
    tipoDoador: TiposDoador.Efetivo,
    mes: format(new Date(), "yyyy-MM"),
  },

  getValidationRules(): RelatorioMensalValidationRules {
    return {
      tipoDoador: {
        required: "Esse campo é necessário!",
      },
      mes: {
        required: "Esse campo é necessário!",
      },
    };
  },
};
