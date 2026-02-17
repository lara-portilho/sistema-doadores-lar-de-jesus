import { TiposDoador } from "@enums/TiposDoador";
import {
  differenceInCalendarMonths,
  format,
  isBefore,
  parseISO,
} from "date-fns";
import { RegisterOptions } from "react-hook-form";

export type RelatorioPeriodoFormValues = {
  tipoDoador: string;
  mesInicial: string;
  mesFinal: string;
};

type RelatorioPeriodoValidationRules = Record<
  keyof RelatorioPeriodoFormValues,
  RegisterOptions<RelatorioPeriodoFormValues>
>;

export const relatorioPeriodoForm = {
  defaultValues: {
    tipoDoador: TiposDoador.Efetivo,
    mesInicial: format(new Date(), "yyyy-MM"),
    mesFinal: format(new Date(), "yyyy-MM"),
  },

  getValidationRules(): RelatorioPeriodoValidationRules {
    return {
      tipoDoador: {
        required: "Esse campo é necessário!",
      },
      mesInicial: {
        required: "Esse campo é necessário!",
      },
      mesFinal: {
        required: "Esse campo é necessário!",
        validate: {
          checkAfterInicio: (mesFinal, { mesInicial }) => {
            const dataInicio = parseISO(mesInicial);
            const dataFim = parseISO(mesFinal);
            if (isBefore(dataFim, dataInicio))
              return "O mês final deve ser posterior ao inicial!";
            return true;
          },
          checkDuration: (mesFinal, { mesInicial }) => {
            const dataInicio = parseISO(mesInicial);
            const dataFim = parseISO(mesFinal);
            if (differenceInCalendarMonths(dataFim, dataInicio) >= 30)
              return "É possível gerar relatórios com, no máximo, 30 meses!";
            return true;
          },
        },
      },
    };
  },
};
