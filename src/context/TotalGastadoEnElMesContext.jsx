import React, { useContext, useEffect, useState } from "react"
import { useOntenerGastosDelMes } from "../hooks/useOntenerGastosDelMes";

const TotalGastafoContext = React.createContext();
const useTotalDelMes = () => useContext(TotalGastafoContext);

const TotalGastadoProvider = ({children}) => {
    const [total, setTotal] = useState(0);
    const gastos = useOntenerGastosDelMes();

    useEffect(() => {
        let acumulado = 0;
        gastos.forEach((gasto) => {
            acumulado += parseFloat(gasto.cantidad);
        })
        setTotal(acumulado)
    }, [gastos])
    

    return (
        <TotalGastafoContext.Provider value={{total}}>
            {children}
        </TotalGastafoContext.Provider>
    )
}

export {TotalGastadoProvider, useTotalDelMes };
