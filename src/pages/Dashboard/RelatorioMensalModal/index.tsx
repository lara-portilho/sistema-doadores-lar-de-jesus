import { Button } from "@components/actions/Button";
import { RadioInput } from "@components/actions/RadioInput";
import { TextInput } from "@components/actions/TextInput";
import { Modal } from "@components/layout/Modal";
import { useStore } from "@hooks/useStore";
import {
  getTiposDoadorLabel,
  TiposDoador,
} from "@stores/entities/enums/TiposDoador";
import { format } from "date-fns";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type RelatorioMensalFormValues = {
  tipoDoador: TiposDoador;
  mes: string;
};

export const RelatorioMensalModal = observer(() => {
  const { relatorioMensalCtrl, doadoresCtrl } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RelatorioMensalFormValues>({
    defaultValues: {
      tipoDoador: TiposDoador.Efetivo,
      mes: format(new Date(), "yyyy-MM"),
    },
  });

  async function onSubmit(data: RelatorioMensalFormValues) {
    try {
      relatorioMensalCtrl.generateRelatorio(data, toJS(doadoresCtrl.doadores));
      reset();
      relatorioMensalCtrl.setModalClose();
      toast.success("Relatório gerado com sucesso!");
    } catch (err) {
      toast.error("Houve algum erro ao gerar o relatório!");
      console.log(err);
    }
  }

  return (
    <Modal
      isOpen={relatorioMensalCtrl.modalOpen}
      onRequestClose={() => relatorioMensalCtrl.setModalClose()}
      size="30rem"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-2 text-2xl font-bold">Relatório mensal</h1>

        <div className="flex justify-between gap-10">
          <RadioInput
            {...register("tipoDoador", {
              required: "Esse campo é necessário!",
            })}
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
              {...register("mes", {
                required: "Esse campo é necessário!",
              })}
              label="Mês"
              type="month"
              error={errors.mes?.message}
            />
          </div>
        </div>
        <Button type="submit" className="ml-auto">
          Gerar relatório
        </Button>
      </form>
    </Modal>
  );
});
