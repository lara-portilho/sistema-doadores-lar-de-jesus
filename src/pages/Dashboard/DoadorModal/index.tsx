/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@components/actions/Button";
import { IconButton } from "@components/actions/IconButton";
import { InputMask } from "@components/actions/InputMask";
import { RadioInput } from "@components/actions/RadioInput";
import { Select } from "@components/actions/Select";
import { TextInput } from "@components/actions/TextInput";
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
import { FaBrazilianRealSign } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root");

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
      telefone: "",
      email: "",
      aniversario: "",
      departamento: Departamentos.SemDepartamento,
    },
  });

  function onSubmit(data: IDoador) {
    if (doadoresCtrl.selectedDoadorCpf)
      doadoresCtrl.updateDoador({ ...doadoresCtrl.selectedDoador, ...data });
    else doadoresCtrl.addDoador(data);
    doadoresCtrl.getDoadores();
    reset();
    doadoresCtrl.setModalClose();
  }

  useEffect(() => {
    console.log(doadoresCtrl.selectedDoadorCpf);
    if (doadoresCtrl.selectedDoadorCpf && doadoresCtrl.selectedDoador) {
      Object.entries(doadoresCtrl.selectedDoador).forEach(([key, value]) => {
        setValue(key as keyof IDoador, value);
      });
    }
  }, [doadoresCtrl.selectedDoadorCpf]);

  return (
    <ReactModal
      isOpen={doadoresCtrl.modalOpen}
      onRequestClose={() => doadoresCtrl.setModalClose()}
      shouldCloseOnOverlayClick={true}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          left: "20rem",
          right: "20rem",
          top: "50%",
          bottom: "auto",
          transform: "translate(0, -50%)",
        },
      }}
    >
      <div className="w-full h-full relative">
        <IconButton
          onClick={() => doadoresCtrl.setModalClose()}
          className="absolute top-0 right-0"
        >
          <MdClose className="size-4" />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full px-5 pt-1">
          <h1 className="font-bold text-2xl mb-2">
            {doadoresCtrl.selectedDoadorCpf ? "Atualização" : "Cadastro"} de
            doador
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
          </div>
          <div className="flex justify-stretch gap-10">
            <TextInput
              {...register("aniversario", {
                required: "Esse campo é necessário!",
              })}
              label="Aniversario"
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
              icon={<FaBrazilianRealSign className="size-3 mt-1" />}
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
            {doadoresCtrl.selectedDoadorCpf ? "Atualizar" : "Cadastrar"}
          </Button>
        </form>
      </div>
    </ReactModal>
  );
});
