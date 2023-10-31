import { addDoc, collection } from 'firebase/firestore'
import { db } from './firebaseConfig'

export const agregarGasto = ({categoria, descripcion, cantidad, fecha, uidUsuario}) => {

    return addDoc(collection(db, 'gastos'),{
        categoria,
        descripcion,
        cantidad,
        fecha,
        uidUsuario
    })
}