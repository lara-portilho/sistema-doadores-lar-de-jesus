import { Layout } from "@components/layout";
import { observer } from "mobx-react-lite";
import { ToastContainer } from "react-toastify";
import { DoadoresTable } from "./DoadoresTable";
import { DoadorModal } from "./DoadorModal";
import { HistoricoModal } from "./HistoricoModal";
import { PagamentoModal } from "./PagamentoModal";
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
      <ToastContainer />
    </Layout>
  );
});
