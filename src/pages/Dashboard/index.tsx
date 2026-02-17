import { Layout } from "@components/layout";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { DoadoresTable } from "./DoadoresTable";
import { DoadorModal } from "./DoadorModal";
import { HistoricoModal } from "./HistoricoModal";
import { PagamentoModal } from "./PagamentoModal";
import { RelatorioDescritivoModal } from "./RelatorioDescritivoModal";
import { RelatorioMensalModal } from "./RelatorioMensalModal";
import { RelatorioPeriodoModal } from "./RelatorioPeriodoModal";

export const Dashboard = observer(() => {
  return (
    <Layout>
      <DoadoresTable />
      <DoadorModal />
      <PagamentoModal />
      <HistoricoModal />
      <RelatorioPeriodoModal />
      <RelatorioMensalModal />
      <RelatorioDescritivoModal />
      <ToastContainer />
    </Layout>
  );
});
