/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@components/actions/Button";
import { MaskInput } from "@components/actions/MaskInput";
import { Select } from "@components/actions/Select";
import { TextInput } from "@components/actions/TextInput";
import { RealIcon } from "@components/icons";
import { Modal } from "@components/layout/Modal";
import { getTiposPagamentoLabel, TiposPagamento } from "@enums/TiposPagamento";
import { pagamentoForm, PagamentoFormValues } from "@forms/PagamentoForm";
import { useStore } from "@hooks/useStore";
import { addMonths, format, parseISO } from "date-fns";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

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
    defaultValues: pagamentoForm.defaultValues,
  });

  const validationRules = useMemo(
    () => pagamentoForm.getValidationRules(doador!),
    [],
  );

  async function onSubmit(data: PagamentoFormValues) {
    try {
      if (!pagamentosCtrl.selectedDoadorId || !doador || !doador.id)
        throw new Error("Houve um problema ao salvar o pagamento!");
      const dto = pagamentoForm.getDTOValues(data, doador.id);
      await pagamentosCtrl.addPagamento(dto);
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
            {...register("data", validationRules.data)}
            label="Data"
            type="date"
            error={errors.data?.message}
            className="flex-1"
          />
          <Select
            {...register("metodo", validationRules.metodo)}
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
            {...register(
              "primeiroMesQuitado",
              validationRules.primeiroMesQuitado,
            )}
            label="Pago de"
            type="month"
            error={errors.primeiroMesQuitado?.message}
            className="flex-1"
          />
          <TextInput
            {...register("ultimoMesQuitado", validationRules.ultimoMesQuitado)}
            label="Pago até"
            type="month"
            error={errors.ultimoMesQuitado?.message}
            className="flex-1"
          />
          <MaskInput
            {...register("valorExtra", validationRules.valorExtra)}
            mask={[
              {
                mask: Number,
                radix: ",",
                thousandsSeparator: ".",
                mapToRadix: ["."],
                scale: 2,
              },
            ]}
            unmask
            label="Valor extra"
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
