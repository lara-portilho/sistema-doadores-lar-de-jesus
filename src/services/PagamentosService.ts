import { db } from "@app/firebase";
import { IDoador } from "@app/stores/entities/Doador";
import { PagamentoDTO } from "@dtos/PagamentoDTO";
import { IPagamento } from "@stores/entities/Pagamento";
import { differenceInMonths, parseISO } from "date-fns";
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

    const mesesLength =
      differenceInMonths(
        parseISO(pagamento.ultimoMesQuitado),
        parseISO(pagamento.primeiroMesQuitado),
      ) + 1;

    const valorTotal = doador.valor * mesesLength + (pagamento.valorExtra || 0);
    await addDoc(collectionRef, { ...pagamento, valorTotal });
    await updateDoc(doadorRef, { ultimoMes: pagamento.ultimoMesQuitado });
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
};
