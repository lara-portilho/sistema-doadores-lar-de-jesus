/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@components/actions/Button";
import { Select } from "@components/actions/Select";
import { TextInput } from "@components/actions/TextInput";
import { RealIcon } from "@components/icons";
import { Modal } from "@components/layout/Modal";
import { useStore } from "@hooks/useStore";
import {
  getTiposPagamentoLabel,
  TiposPagamento,
} from "@stores/entities/enums/TiposPagamento";
import {
  addMonths,
  eachMonthOfInterval,
  format,
  isBefore,
  isEqual,
  parseISO,
} from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

type PagamentoFormValues = {
  data: string;
  pagoDataInicio: string;
  pagoDataFim: string;
  metodo: TiposPagamento;
  valorExtra: number;
};

export const PagamentoModal = observer(() => {
  const { pagamentosCtrl, doadoresCtrl } = useStore();
  const doador = useMemo(
    () =>
      doadoresCtrl.doadores.find(
        (doador) => doador.id === pagamentosCtrl.selectedDoadorId,
      ),
    [doadoresCtrl.doadores.length, pagamentosCtrl.selectedDoadorId],
  );
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<PagamentoFormValues>({
    defaultValues: {
      data: format(new Date(), "yyyy-MM-dd"),
      metodo: TiposPagamento.Cartao,
      pagoDataInicio: format(new Date(), "yyyy-MM"),
      pagoDataFim: format(new Date(), "yyyy-MM"),
    },
  });

  async function onSubmit(data: PagamentoFormValues) {
    try {
      if (!pagamentosCtrl.selectedDoadorId || !doador)
        throw new Error("Houve um problema ao salvar o pagamento!");
      const dataInicio = parseISO(data.pagoDataInicio);
      const dataFim = parseISO(data.pagoDataFim);
      const mesesQuitados = eachMonthOfInterval({
        start: dataInicio,
        end: dataFim,
      }).map((mes) => format(mes, "yyyy-MM-dd"));

      await pagamentosCtrl.addPagamento({
        id: uuid(),
        cpf: doador?.cpf,
        data: data.data,
        metodo: data.metodo,
        valorExtra: data.valorExtra || 0,
        valorTotal:
          mesesQuitados.length * (doador?.valor || 0) + (data.valorExtra || 0),
        mesesQuitados: mesesQuitados,
      });
      doadoresCtrl.getDoadores();
      reset();
      pagamentosCtrl.setModalClose();
      toast.success("Pagamento adicionado com sucesso!");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (pagamentosCtrl.selectedDoadorId && doador?.ultimoMes) {
      setValue(
        "pagoDataInicio",
        format(addMonths(parseISO(doador?.ultimoMes), 1), "yyyy-MM"),
      );
    }

    return () => reset();
  }, [pagamentosCtrl.selectedDoadorId]);

  return (
    <Modal
      isOpen={pagamentosCtrl.modalOpen}
      onRequestClose={() => pagamentosCtrl.setModalClose()}
      size="40rem"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-2xl mb-2">
          Adicionar pagamento para {doador?.nome}
        </h1>
        <div className="flex justify-stretch gap-10">
          <TextInput
            {...register("data", {
              required: "Esse campo é necessário!",
            })}
            label="Data"
            type="date"
            error={errors.data?.message}
            className="flex-1"
          />
          <Select
            {...register("metodo", {
              required: "Esse campo é necessário!",
            })}
            options={Object.values(TiposPagamento).map((tipo) => ({
              label: getTiposPagamentoLabel(tipo),
              value: tipo,
            }))}
            label="Método de pagamento"
            error={errors.metodo?.message}
            className="flex-1"
          />
        </div>
        <div className="flex justify-stretch gap-10">
          <TextInput
            {...register("pagoDataInicio", {
              required: "Esse campo é necessário!",
              validate: {
                checkAfterUltimoPagamento: (pagoDataInicio) => {
                  if (!doador?.ultimoMes) return true;
                  const dataInicio = parseISO(pagoDataInicio);
                  const ultimoPagamento = parseISO(doador.ultimoMes);
                  if (
                    isBefore(dataInicio, ultimoPagamento) ||
                    isEqual(dataInicio, ultimoPagamento)
                  )
                    return "A data inicial deve ser posterior à data da última doação!";
                  return true;
                },
              },
            })}
            label="Pago de"
            type="month"
            error={errors.pagoDataInicio?.message}
            className="flex-1"
          />
          <TextInput
            {...register("pagoDataFim", {
              required: "Esse campo é necessário!",
              validate: {
                checkAfterInicio: (pagoDataFim, { pagoDataInicio }) => {
                  const dataInicio = parseISO(pagoDataInicio);
                  const dataFim = parseISO(pagoDataFim);
                  if (isBefore(dataFim, dataInicio))
                    return "A data final deve ser posterior à inicial!";
                  return true;
                },
              },
            })}
            label="Pago até"
            type="month"
            error={errors.pagoDataFim?.message}
            className="flex-1"
          />
          <TextInput
            {...register("valorExtra", {
              valueAsNumber: true,
            })}
            label="Valor extra"
            type="number"
            lang="pt"
            step="0.01"
            placeholder="0,00"
            error={errors.valorExtra?.message}
            icon={<RealIcon className="size-3 mt-1" />}
            className="flex-1"
          />
        </div>
        <Button type="submit" className="ml-auto">
          Adicionar pagamento
        </Button>
      </form>
    </Modal>
  );
});
