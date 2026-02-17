/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@components/actions/Button";
import { MaskInput } from "@components/actions/MaskInput";
import { RadioInput } from "@components/actions/RadioInput";
import { Select } from "@components/actions/Select";
import { TextInput } from "@components/actions/TextInput";
import { RealIcon } from "@components/icons";
import { Modal } from "@components/layout/Modal";
import { Departamentos, getDepartamentosLabel } from "@enums/Departamentos";
import { getTiposDoadorLabel, TiposDoador } from "@enums/TiposDoador";
import { doadorForm, DoadorFormValues } from "@forms/DoadorForm";
import { useStore } from "@hooks/useStore";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const DoadorModal = observer(() => {
  const { doadoresCtrl } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<DoadorFormValues>({
    defaultValues: doadorForm.defaultValues,
  });

  const validationRules = useMemo(() => doadorForm.getValidationRules(), []);

  async function onSubmit(data: DoadorFormValues) {
    try {
      const dto = doadorForm.getDTOValues(data);
      if (doadoresCtrl.selectedDoadorId)
        await doadoresCtrl.updateDoador(doadoresCtrl.selectedDoadorId, dto);
      else await doadoresCtrl.addDoador(dto);
      await doadoresCtrl.getDoadores();
      toast.success(
        `Doador ${doadoresCtrl.selectedDoadorId ? "editado" : "adicionado"} com sucesso!`,
      );
      reset();
      doadoresCtrl.setModalClose();
    } catch (err) {
      toast.error(
        `Houve algum erro ao ${doadoresCtrl.selectedDoadorId ? "editar" : "adicionar"} o doador!`,
      );
      console.log(err);
    }
  }

  useEffect(() => {
    if (doadoresCtrl.selectedDoadorId && doadoresCtrl.selectedDoador) {
      const values = doadorForm.getFormValues(doadoresCtrl.selectedDoador);
      Object.entries(values).forEach(([key, value]) => {
        setValue(key as keyof DoadorFormValues, value);
      });
    }

    return () => reset();
  }, [doadoresCtrl.selectedDoadorId]);

  return (
    <Modal
      isOpen={doadoresCtrl.modalOpen}
      onRequestClose={() => doadoresCtrl.setModalClose()}
      size="55rem"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-2 text-2xl font-bold">
          {doadoresCtrl.selectedDoadorId ? "Atualização" : "Cadastro"} de doador
        </h1>
        <div className="flex justify-stretch gap-10">
          <TextInput
            {...register("nome", validationRules.nome)}
            label="Nome completo"
            error={errors.nome?.message}
            placeholder="Nome completo"
            className="flex-1"
          />
          <MaskInput
            {...register("cpf", validationRules.cpf)}
            mask="000.000.000-00"
            label="CPF"
            placeholder="000.000.000-00"
            error={errors.cpf?.message}
            className="flex-1"
          />
        </div>
        <div className="flex justify-stretch gap-10">
          <MaskInput
            {...register("telefone", validationRules.telefone)}
            mask={[{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }]}
            label="Telefone celular ou fixo"
            placeholder="(62) 9999-9999"
            error={errors.telefone?.message}
            className="flex-1"
          />
          <TextInput
            {...register("email", validationRules.email)}
            label="Email"
            placeholder="exemplo@exemplo.com"
            error={errors.email?.message}
            className="flex-1"
          />
        </div>
        <TextInput
          {...register("endereco", validationRules.endereco)}
          label="Endereço"
          error={errors.endereco?.message}
          placeholder="Rua, CEP, Cidade..."
          className="flex-1"
        />
        <div className="flex justify-stretch gap-10">
          <TextInput
            {...register("aniversario", validationRules.aniversario)}
            label="Aniversário"
            type="date"
            error={errors.aniversario?.message}
            className="flex-1"
          />
          <MaskInput
            {...register("valor", validationRules.valor)}
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
            label="Valor"
            placeholder="0,00"
            error={errors.valor?.message}
            icon={<RealIcon className="mt-1 size-3" />}
            className="flex-1"
          />
        </div>
        <div className="flex justify-stretch gap-10">
          <RadioInput
            {...register("tipo", validationRules.tipo)}
            options={Object.values(TiposDoador).map((tipo) => ({
              label: getTiposDoadorLabel(tipo),
              value: tipo,
            }))}
            type="radio"
            label="Tipo de doador"
            error={errors.tipo?.message}
            className="flex-1"
          />
          <Select
            {...register("departamento", validationRules.departamento)}
            options={Object.values(Departamentos).map((departamento) => ({
              label: getDepartamentosLabel(departamento),
              value: departamento,
            }))}
            label="Departamento"
            error={errors.departamento?.message}
            className="flex-1"
          />
        </div>
        <Button type="submit" className="ml-auto">
          {doadoresCtrl.selectedDoadorId ? "Atualizar" : "Cadastrar"}
        </Button>
      </form>
    </Modal>
  );
});
