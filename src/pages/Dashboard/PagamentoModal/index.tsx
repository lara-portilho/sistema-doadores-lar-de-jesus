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
import { addMonths, format, isBefore, isEqual, parseISO } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type PagamentoFormValues = {
  data: string;
  primeiroMesQuitado: string;
  ultimoMesQuitado: string;
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
      primeiroMesQuitado: format(new Date(), "yyyy-MM"),
      ultimoMesQuitado: format(new Date(), "yyyy-MM"),
    },
  });

  async function onSubmit(data: PagamentoFormValues) {
    try {
      if (!pagamentosCtrl.selectedDoadorId || !doador || !doador.id)
        throw new Error("Houve um problema ao salvar o pagamento!");
      await pagamentosCtrl.addPagamento(data, doador.id);
      doadoresCtrl.getDoadores();
      reset();
      pagamentosCtrl.setModalClose();
      toast.success("Pagamento adicionado com sucesso!");
    } catch (err) {
      toast.error("Houve algum erro ao adicionar o pagamento!");
      console.log(err);
    }
  }

  useEffect(() => {
    if (pagamentosCtrl.selectedDoadorId && doador?.ultimoMes) {
      setValue(
        "primeiroMesQuitado",
        format(addMonths(parseISO(doador?.ultimoMes), 1), "yyyy-MM"),
      );
      setValue(
        "ultimoMesQuitado",
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
        <h1 className="mb-2 text-2xl font-bold">
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
            {...register("primeiroMesQuitado", {
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
            })}
            label="Pago de"
            type="month"
            error={errors.primeiroMesQuitado?.message}
            className="flex-1"
          />
          <TextInput
            {...register("ultimoMesQuitado", {
              required: "Esse campo é necessário!",
              validate: {
                checkAfterInicio: (
                  ultimoMesQuitado,
                  { primeiroMesQuitado },
                ) => {
                  const dataInicio = parseISO(primeiroMesQuitado);
                  const dataFim = parseISO(ultimoMesQuitado);
                  if (isBefore(dataFim, dataInicio))
                    return "A data final deve ser posterior à inicial!";
                  return true;
                },
              },
            })}
            label="Pago até"
            type="month"
            error={errors.ultimoMesQuitado?.message}
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
            icon={<RealIcon className="mt-1 size-3" />}
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
