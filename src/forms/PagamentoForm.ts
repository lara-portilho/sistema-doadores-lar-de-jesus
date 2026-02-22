import { PagamentoDTO } from "@dtos/PagamentoDTO";
import { Doador } from "@entities/Doador";
import { TiposPagamento } from "@enums/TiposPagamento";
import { getMonthsArray } from "@utils/getMonthsArray";
import { format, isBefore, isEqual, parseISO } from "date-fns";
import { RegisterOptions } from "react-hook-form";

export type PagamentoFormValues = {
  data: string;
  primeiroMesQuitado: string;
  ultimoMesQuitado: string;
  metodo: string;
  valorExtra: string;
};

type PagamentoValidationRules = Record<
  keyof PagamentoFormValues,
  RegisterOptions<PagamentoFormValues>
>;

export const pagamentoForm = {
  defaultValues: {
    data: format(new Date(), "yyyy-MM-dd"),
    metodo: TiposPagamento.Cartao,
    primeiroMesQuitado: format(new Date(), "yyyy-MM"),
    ultimoMesQuitado: format(new Date(), "yyyy-MM"),
    valorExtra: "",
  },

  getValidationRules(doador: Doador): PagamentoValidationRules {
    return {
      data: {
        required: "Esse campo é necessário!",
      },
      metodo: {
        required: "Esse campo é necessário!",
      },
      primeiroMesQuitado: {
        required: "Esse campo é necessário!",
        validate: {
          checkAfterUltimoPagamento: (primeiroMesQuitado) => {
            if (!doador?.ultimoMes) return true;
            const dataInicio = parseISO(primeiroMesQuitado);
            const ultimoPagamento = parseISO(doador.ultimoMes);
            if (
              isBefore(dataInicio, ultimoPagamento) ||
              isEqual(dataInicio, ultimoPagamento)
            )
              return "O mês inicial deve ser posterior ao último mês quitado!";
            return true;
          },
        },
      },
      ultimoMesQuitado: {
        required: "Esse campo é necessário!",
        validate: {
          checkAfterInicio: (ultimoMesQuitado, { primeiroMesQuitado }) => {
            const dataInicio = parseISO(primeiroMesQuitado);
            const dataFim = parseISO(ultimoMesQuitado);
            if (isBefore(dataFim, dataInicio))
              return "A data final deve ser posterior à inicial!";
            return true;
          },
        },
      },
      valorExtra: {
        valueAsNumber: true,
      },
    };
  },

  getDTOValues(
    formValues: PagamentoFormValues,
    doadorId: string,
  ): PagamentoDTO {
    const meses = getMonthsArray(
      formValues.primeiroMesQuitado,
      formValues.ultimoMesQuitado,
    );
    return {
      doadorId: doadorId,
      data: formValues.data,
      valorExtra: Number(formValues.valorExtra) || 0,
      metodo: formValues.metodo as TiposPagamento,
      mesesQuitados: meses,
    };
  },
};
