import { Helmet } from "react-helmet";
import { Header, Titulo, BtnRegresar } from "./../elementos";
import { BarraTotalGastado } from "./BarraTotalGastado";
import { useObtenerGastosDelMesPorCategoria } from "../hooks/useObtenerGastosDelMesPorCategoria";
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor } from "./../elementos/ElementosDeLista";
import IconoCategoria from './../elementos/IconoCategoria'
import formatearCantidad from "../functions/convertirAMoneda";



export const GastosPorCategorias = () => {

    const gastosPorCategoria = useObtenerGastosDelMesPorCategoria()

  return (
    <>
      <Helmet>
        <title>Gastos Por Categoria</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Gastos Por Categoria</Titulo>
      </Header>

      <ListaDeCategorias>
        {gastosPorCategoria.map((elemento,index) => {
          return (
            <ElementoListaCategorias key={index}>
              <Categoria> <IconoCategoria id={elemento.categoria} /> {elemento.categoria}</Categoria>
              <Valor>{formatearCantidad(elemento.cantidad)}</Valor>
            </ElementoListaCategorias>
          );
        })}
      </ListaDeCategorias>

      <BarraTotalGastado />

    </>
  )
}
