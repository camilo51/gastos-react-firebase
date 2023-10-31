import { Helmet } from "react-helmet"
import { Header, Titulo, ContenedorHeader, ContenedorBotones, Boton } from "./elementos";
import { BotonCerrarSesion } from "./elementos/BotonCerrarSesion";
import { FormularioGasto } from "./components/FormularioGasto";
import { BarraTotalGastado } from "./components/BarraTotalGastado";

export const App = () => {
  return (
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Agregar Gasto</Titulo>
          <ContenedorBotones>
            <Boton to='/categorias'>Categorias</Boton>
            <Boton to='/lista'>Lista de Gasto</Boton>
            <BotonCerrarSesion />
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>

      <FormularioGasto />
      <BarraTotalGastado />

    </>
  )
}
