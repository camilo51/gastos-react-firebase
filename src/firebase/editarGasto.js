import { updateDoc, doc } from 'firebase/firestore'
import { db } from './firebaseConfig'

export const editarGasto = async ({id, categoria, descripcion, cantidad, fecha}) => {

    const documento = doc(db, 'gastos', id)
    return await updateDoc(documento, {
        categoria,
        descripcion,
        cantidad,
        fecha,
    });
}