import { useEffect, useState } from "react"
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { endOfMonth, getUnixTime, startOfMonth } from "date-fns";
import { useAuth } from './../context/AuthContext'



export const useOntenerGastosDelMes = () => {
    const [gastos, setGastos] = useState([]);
    const {usuario} = useAuth();

    useEffect(() => {
    
        const inicioDeMes = getUnixTime(startOfMonth(new Date()));
        const finDeMes = getUnixTime(endOfMonth(new Date()));
        
        if (usuario) {
            const consulta = query(
                collection(db, 'gastos'),
                orderBy('fecha', 'desc'),
                where('fecha', '>=', inicioDeMes),
                where('fecha', '<=', finDeMes),
                where('uidUsuario', '==', usuario.uid)
            )
    
            const unsuscribe = onSnapshot(consulta, snapshot => {
                setGastos(snapshot.docs.map(documento => {
                     return {...documento.data(), id: documento.id}
                }))
            }, (error) => console.log(error));
            
            return unsuscribe;
        }

        
    }, [usuario])
    

    return gastos;
}
