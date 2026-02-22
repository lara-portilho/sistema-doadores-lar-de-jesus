import { db } from "@app/firebase";
import { DoadorDTO } from "@dtos/DoadorDTO";
import { Doador } from "@entities/Doador";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const DoadoresService = {
  getDoadores: async (): Promise<Doador[]> => {
    const collectionRef = collection(db, "doadores");
    const querySnapshot = await getDocs(collectionRef);
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Doador[];
    return data;
  },
  addDoador: async (doador: DoadorDTO) => {
    const collectionRef = collection(db, "doadores");
    await addDoc(collectionRef, { ...doador, excluido: false });
  },
  updateDoador: async (id: string, doador: DoadorDTO) => {
    const docRef = doc(db, "doadores", id);
    await updateDoc(docRef, doador);
  },
  deleteDoador: async (id: string) => {
    const docRef = doc(db, "doadores", id);
    await updateDoc(docRef, { excluido: true });
  },
};
