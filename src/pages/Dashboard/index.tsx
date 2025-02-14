/* eslint-disable react-hooks/exhaustive-deps */
import { Layout } from "@components/layout";
import { useStore } from "@hooks/useStore";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { DoadoresTable } from "./DoadoresTable";
import { DoadorModal } from "./DoadorModal";

export const Dashboard = observer(() => {
  const { doadoresCtrl } = useStore();

  useEffect(() => {
    doadoresCtrl.getDoadores();
  }, []);

  return (
    <Layout>
      <DoadoresTable />
      <DoadorModal />
    </Layout>
  );
});
