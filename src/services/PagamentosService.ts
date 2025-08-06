import { RelatorioMensalDTO } from "@app/dtos/RelatorioMensalDTO";
import { db } from "@app/firebase";
import { PagamentoDTO } from "@dtos/PagamentoDTO";
import { RelatorioPeriodoDTO } from "@dtos/RelatorioPeriodoDTO";
import { IDoador } from "@stores/entities/Doador";
import { IPagamento } from "@stores/entities/Pagamento";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const PagamentosService = {
  addPagamento: async (pagamento: PagamentoDTO) => {
    const collectionRef = collection(db, "pagamentos");
    const doadorRef = doc(db, "doadores", pagamento.doadorId);
    const doador = (await getDoc(doadorRef)).data() as IDoador;

    const qtdMeses = pagamento.mesesQuitados?.length || 0;
    const ultimoMes = pagamento.mesesQuitados?.[qtdMeses - 1] || "";

    const valorMensalidade = doador.valor;
    const valorTotal =
      valorMensalidade * qtdMeses + (pagamento.valorExtra || 0);
    await addDoc(collectionRef, { ...pagamento, valorTotal, valorMensalidade });
    await updateDoc(doadorRef, {
      ultimoMes: ultimoMes,
      dataUltimoPag: pagamento.data,
    });
  },
  getHistorico: async (doadorId: string): Promise<IPagamento[]> => {
    const collectionRef = collection(db, "pagamentos");
    const q = query(collectionRef, where("doadorId", "==", doadorId));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as IPagamento[];
    return data;
  },
  getRelatorioPeriodo: async (
    data: RelatorioPeriodoDTO,
  ): Promise<IPagamento[]> => {
    const collectionRef = collection(db, "pagamentos");
    const q = query(
      collectionRef,
      where("mesesQuitados", "array-contains-any", data.meses),
    );
    const querySnapshot = await getDocs(q);
    const result = (
      querySnapshot.docs.map((doc) => doc.data()) as IPagamento[]
    ).filter((doc) => data.doadoresIds.includes(doc.doadorId));

    return result;
  },
  getRelatorioMensal: async (
    data: RelatorioMensalDTO,
  ): Promise<IPagamento[]> => {
    console.log(data);
    const collectionRef = collection(db, "pagamentos");
    const q = query(
      collectionRef,
      where("mesesQuitados", "array-contains", data.mes),
    );
    const querySnapshot = await getDocs(q);
    const result = (
      querySnapshot.docs.map((doc) => doc.data()) as IPagamento[]
    ).filter((doc) => data.doadoresIds.includes(doc.doadorId));

    return result;
  },
};
