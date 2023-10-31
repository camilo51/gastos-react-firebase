import { deleteDoc, doc } from "firebase/firestore"
import { db } from "./firebaseConfig"

export const borrarGasto = async (id) => {
    await deleteDoc(doc(db, 'gastos', id))
}