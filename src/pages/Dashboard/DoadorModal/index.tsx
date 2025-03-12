/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@components/actions/Button";
import { InputMask } from "@components/actions/InputMask";
import { RadioInput } from "@components/actions/RadioInput";
import { Select } from "@components/actions/Select";
import { TextInput } from "@components/actions/TextInput";
import { RealIcon } from "@components/icons";
import { Modal } from "@components/layout/Modal";
import { useStore } from "@hooks/useStore";
import { IDoador } from "@stores/entities/Doador";
import {
  Departamentos,
  getDepartamentosLabel,
} from "@stores/entities/enums/Departamentos";
import {
  getTiposDoadorLabel,
  TiposDoador,
} from "@stores/entities/enums/TiposDoador";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

export const DoadorModal = observer(() => {
  const { doadoresCtrl } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IDoador>({
    defaultValues: {
      nome: "",
      tipo: TiposDoador.Esporadico,
      cpf: "",
      endereco: "",
      telefone: "",
      email: "",
      aniversario: "",
      departamento: Departamentos.SemDepartamento,
    },
  });

  async function onSubmit(data: IDoador) {
    try {
      if (doadoresCtrl.selectedDoadorId)
        await doadoresCtrl.updateDoador({
          ...doadoresCtrl.selectedDoador,
          ...data,
        });
      else
        await doadoresCtrl.addDoador({
          ...data,
          id: uuid(),
        });
      await doadoresCtrl.getDoadores();
      reset();
      doadoresCtrl.setModalClose();
      toast.success(
        `Doador ${doadoresCtrl.selectedDoadorId ? "editado" : "adicionado"} com sucesso!`,
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (doadoresCtrl.selectedDoadorId && doadoresCtrl.selectedDoador) {
      Object.entries(doadoresCtrl.selectedDoador).forEach(([key, value]) => {
        setValue(key as keyof IDoador, value);
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
        <h1 className="font-bold text-2xl mb-2">
          {doadoresCtrl.selectedDoadorId ? "Atualização" : "Cadastro"} de doador
        </h1>
        <div className="flex justify-stretch gap-10">
          <TextInput
            {...register("nome", { required: "Esse campo é necessário!" })}
            label="Nome completo"
            error={errors.nome?.message}
            placeholder="Nome completo"
            className="flex-1"
          />
          <InputMask
            {...register("cpf", {
              required: "Esse campo é necessário!",
              pattern: {
                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                message: "Insira um CPF válido!",
              },
            })}
            mask="000.000.000-00"
            label="CPF"
            placeholder="000.000.000-00"
            error={errors.cpf?.message}
            className="flex-1"
          />
        </div>
        <div className="flex justify-stretch gap-10">
          <InputMask
            {...register("telefone", {
              required: "Esse campo é necessário!",
              pattern: {
                value: /(\((\d{2})\)) (9?\d{4})-(\d{4})/,
                message: "Insira um telefone válido!",
              },
            })}
            mask={[{ mask: "(00) 0000-0000" }, { mask: "(00) 00000-0000" }]}
            label="Telefone celular ou fixo"
            placeholder="(62) 9999-9999"
            error={errors.telefone?.message}
            className="flex-1"
          />
          <TextInput
            {...register("email", {
              required: "Esse campo é necessário!",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Insira um email válido!",
              },
            })}
            label="Email"
            placeholder="exemplo@exemplo.com"
            error={errors.email?.message}
            className="flex-1"
          />
        </div>{" "}
        <TextInput
          {...register("endereco", { required: "Esse campo é necessário!" })}
          label="Endereço"
          error={errors.nome?.message}
          placeholder="Rua, CEP, Cidade..."
          className="flex-1"
        />
        <div className="flex justify-stretch gap-10">
          <TextInput
            {...register("aniversario", {
              required: "Esse campo é necessário!",
            })}
            label="Aniversário"
            type="date"
            error={errors.aniversario?.message}
            className="flex-1"
          />
          <TextInput
            {...register("valor", {
              required: "Esse campo é necessário!",
              valueAsNumber: true,
            })}
            label="Valor"
            type="number"
            lang="pt"
            step="0.01"
            placeholder="0,00"
            error={errors.valor?.message}
            icon={<RealIcon className="size-3 mt-1" />}
            className="flex-1"
          />
        </div>
        <div className="flex justify-stretch gap-10">
          <RadioInput
            {...register("tipo", { required: "Esse campo é necessário!" })}
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
            {...register("departamento", {
              required: "Esse campo é necessário!",
            })}
            options={Object.values(Departamentos).map((departamento) => ({
              label: getDepartamentosLabel(departamento),
              value: departamento,
            }))}
            label="Tipo de doador"
            error={errors.tipo?.message}
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
