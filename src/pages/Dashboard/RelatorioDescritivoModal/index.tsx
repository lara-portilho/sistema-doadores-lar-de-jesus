import { Button } from "@components/actions/Button";
import { RadioInput } from "@components/actions/RadioInput";
import { TextInput } from "@components/actions/TextInput";
import { ListIcon, Spinner } from "@components/icons";
import { Modal } from "@components/layout/Modal";
import { getTiposDoadorLabel, TiposDoador } from "@enums/TiposDoador";
import {
  relatorioMensalForm,
  RelatorioMensalFormValues,
} from "@forms/RelatorioMensalForm";
import { useStore } from "@hooks/useStore";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const RelatorioDescritivoModal = observer(() => {
  const { relatorioDescritivoCtrl, doadoresCtrl } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RelatorioMensalFormValues>({
    defaultValues: relatorioMensalForm.defaultValues,
  });

  const validationRules = useMemo(
    () => relatorioMensalForm.getValidationRules(),
    [],
  );

  async function onSubmit(data: RelatorioMensalFormValues) {
    try {
      relatorioDescritivoCtrl.generateRelatorio(
        data,
        toJS(doadoresCtrl.doadores),
      );
      reset();
      relatorioDescritivoCtrl.setModalClose();
      toast.success("Relatório gerado com sucesso!");
    } catch (err) {
      toast.error("Houve algum erro ao gerar o relatório!");
      console.log(err);
    }
  }

  return (
    <Modal
      isOpen={relatorioDescritivoCtrl.modalOpen}
      onRequestClose={() => relatorioDescritivoCtrl.setModalClose()}
      size="30rem"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-2 text-2xl font-bold">Relatório Descritivo</h1>

        <div className="flex justify-between gap-10">
          <RadioInput
            {...register("tipoDoador", validationRules.tipoDoador)}
            options={Object.values(TiposDoador).map((tipo) => ({
              label: getTiposDoadorLabel(tipo),
              value: tipo,
            }))}
            type="radio"
            label="Tipo de doador"
            error={errors.tipoDoador?.message}
            className="shrink-0"
          />
          <div className="flex-1">
            <TextInput
              {...register("mes", validationRules.mes)}
              label="Mês"
              type="month"
              error={errors.mes?.message}
            />
          </div>
        </div>
        <Button type="submit" className="ml-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner className="size-4 animate-spin text-white" />
          ) : (
            <ListIcon className="size-4 text-white" />
          )}
          Gerar relatório
        </Button>
      </form>
    </Modal>
  );
});
