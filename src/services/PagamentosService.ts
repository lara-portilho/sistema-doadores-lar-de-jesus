import { db } from "@app/firebase";
import { PagamentoDTO } from "@dtos/PagamentoDTO";
import { RelatorioDescritivoDTO } from "@dtos/RelatorioDescritivoDTO";
import { RelatorioMensalDTO } from "@dtos/RelatorioMensalDTO";
import { RelatorioPeriodoDTO } from "@dtos/RelatorioPeriodoDTO";
import { IDoador } from "@stores/entities/Doador";
import { IPagamento } from "@stores/entities/Pagamento";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
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
  deletePagamento: async (
    id: string,
    props?: {
      doadorId: string;
      pagamentoAnterior?: IPagamento;
    },
  ) => {
    const docRef = doc(db, "pagamentos", id);
    await deleteDoc(docRef);

    if (!props) return;
    const { doadorId, pagamentoAnterior } = props;

    const doadorRef = doc(db, "doadores", doadorId);
    if (!pagamentoAnterior) {
      await updateDoc(doadorRef, { dataUltimoPag: "", ultimoMes: "" });
      return;
    }

    const ultimoMesIndex = pagamentoAnterior.mesesQuitados
      ? pagamentoAnterior.mesesQuitados?.length - 1
      : 0;
    await updateDoc(doadorRef, {
      dataUltimoPag: pagamentoAnterior.data,
      ultimoMes: pagamentoAnterior.mesesQuitados?.[ultimoMesIndex],
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
  getRelatorioDescritivo: async (
    data: RelatorioDescritivoDTO,
  ): Promise<IPagamento[]> => {
    const collectionRef = collection(db, "pagamentos");
    let docs: QueryDocumentSnapshot<DocumentData, DocumentData>[] = [];

    if (data.dias.length > 30) {
      const dias1 = data.dias.slice(0, Math.ceil(data.dias.length / 2));
      const dias2 = data.dias.slice(
        Math.ceil(data.dias.length / 2),
        data.dias.length,
      );
      const q1 = query(collectionRef, where("data", "in", dias1));
      const q2 = query(collectionRef, where("data", "in", dias2));
      const [querySnapshot1, querySnapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);
      docs = [...querySnapshot1.docs, ...querySnapshot2.docs];
    } else {
      const q = query(collectionRef, where("data", "in", data.dias));
      const querySnapshot = await getDocs(q);
      docs = querySnapshot.docs;
    }
    const result = (docs.map((doc) => doc.data()) as IPagamento[]).filter(
      (doc) => data.doadoresIds.includes(doc.doadorId),
    );

    return result;
  },
};
