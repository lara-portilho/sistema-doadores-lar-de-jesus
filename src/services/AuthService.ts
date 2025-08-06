import { auth, db } from "@app/firebase";
import { IUser } from "@stores/entities/User";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthService = {
  login: async (email: string, pass: string): Promise<IUser> => {
    const user = await signInWithEmailAndPassword(auth, email, pass);
    const docRef = doc(db, "users", user.user.uid);
    const docSnap = await getDoc(docRef);
    sessionStorage.setItem("user", user.user.uid);
    return docSnap.data() as IUser;
  },
  logout: async () => {
    sessionStorage.setItem("user", "");
    await signOut(auth);
  },
  getUser: async (id: string): Promise<IUser | undefined> => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as IUser | undefined;
  },
};
