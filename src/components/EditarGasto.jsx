import { Helmet } from "react-helmet";
import { Header, Titulo, BtnRegresar } from "./../elementos";
import { BarraTotalGastado } from "./BarraTotalGastado";
import { FormularioGasto } from "./FormularioGasto";
import { useParams } from "react-router-dom";
import { useObtenerGasto } from "../hooks/useObtenergasto";

export const EditarGasto = () => {

  const {id} = useParams();
  const [gasto] = useObtenerGasto(id);


  return (
    <>
    <Helmet>
      <title>Editar Gasto</title>
    </Helmet>

    <Header>
      <BtnRegresar ruta="/lista" />
      <Titulo>Editar Gasto</Titulo>
    </Header>

    <FormularioGasto gasto={gasto} />
    <BarraTotalGastado />

  </>
  )
}
