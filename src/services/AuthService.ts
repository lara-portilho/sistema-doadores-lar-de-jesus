import { auth, db } from "@app/firebase";
import { User } from "@entities/User";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export const AuthService = {
  login: async (email: string, pass: string): Promise<User> => {
    const user = await signInWithEmailAndPassword(auth, email, pass);
    const docRef = doc(db, "users", user.user.uid);
    const docSnap = await getDoc(docRef);
    sessionStorage.setItem("user", user.user.uid);
    return docSnap.data() as User;
  },
  logout: async () => {
    sessionStorage.setItem("user", "");
    await signOut(auth);
  },
  getUser: async (id: string): Promise<User | undefined> => {
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as User | undefined;
  },
};
