import { Button } from "@components/actions/Button";
import { RadioInput } from "@components/actions/RadioInput";
import { TextInput } from "@components/actions/TextInput";
import { CalendarIcon, Spinner } from "@components/icons";
import { Modal } from "@components/layout/Modal";
import { useStore } from "@hooks/useStore";
import {
  getTiposDoadorLabel,
  TiposDoador,
} from "@stores/entities/enums/TiposDoador";
import {
  differenceInCalendarMonths,
  format,
  isBefore,
  parseISO,
} from "date-fns";
import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export type RelatorioPeriodoFormValues = {
  tipoDoador: TiposDoador;
  mesInicial: string;
  mesFinal: string;
};

export const RelatorioPeriodoModal = observer(() => {
  const { relatorioPeriodoCtrl, doadoresCtrl } = useStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RelatorioPeriodoFormValues>({
    defaultValues: {
      tipoDoador: TiposDoador.Efetivo,
      mesInicial: format(new Date(), "yyyy-MM"),
      mesFinal: format(new Date(), "yyyy-MM"),
    },
  });

  async function onSubmit(data: RelatorioPeriodoFormValues) {
    try {
      relatorioPeriodoCtrl.generateRelatorio(data, toJS(doadoresCtrl.doadores));
      reset();
      relatorioPeriodoCtrl.setModalClose();
      toast.success("Relatório gerado com sucesso!");
    } catch (err) {
      toast.error("Houve algum erro ao gerar o relatório!");
      console.log(err);
    }
  }

  return (
    <Modal
      isOpen={relatorioPeriodoCtrl.modalOpen}
      onRequestClose={() => relatorioPeriodoCtrl.setModalClose()}
      size="30rem"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="mb-2 text-2xl font-bold">Relatório por período</h1>

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
              {...register("mesInicial", {
                required: "Esse campo é necessário!",
              })}
              label="Mês inicial"
              type="month"
              error={errors.mesInicial?.message}
            />
            <TextInput
              {...register("mesFinal", {
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
              })}
              label="Mês final"
              type="month"
              error={errors.mesFinal?.message}
            />
          </div>
        </div>
        <Button type="submit" className="ml-auto" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner className="size-4 animate-spin text-white" />
          ) : (
            <CalendarIcon className="size-4 text-white" />
          )}
          Gerar relatório
        </Button>
      </form>
    </Modal>
  );
});
