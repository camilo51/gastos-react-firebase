import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


export const useObtenerGasto = (id) => {
    const navigate = useNavigate();
    const [gasto, setGasto] = useState('');

    useEffect(() => {

        const obtenerGasto = async () => {
            const documento = await getDoc(doc(db, 'gastos', id));
            if (documento.exists()) {
                setGasto(documento);
            }else{
                navigate('/lista');
            }
        }
        obtenerGasto();
    }, [navigate, id])
    

    return[gasto];
}