import { Helmet } from "react-helmet";
import { Header, Titulo, BtnRegresar, Boton } from "./../elementos";
import { useAuth } from './../context/AuthContext'
import { BarraTotalGastado } from "./BarraTotalGastado";
import { useObtenerGastos } from "../hooks/useObtenerGastos";
import {
  Lista,
  ElementoLista,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo
} from "./../elementos/ElementosDeLista";
import IconoCategoria from "../elementos/IconoCategoria";
import formatearCantidad from "../functions/convertirAMoneda";
import IconoEditar from './../images/editar.svg?react';
import IconoBorrar from './../images/borrar.svg?react';
import { Link } from "react-router-dom";
import { format, fromUnixTime } from "date-fns";
import { es } from "date-fns/locale";
import { borrarGasto } from "../firebase/borrarGasto";


export const ListaDeGastos = () => {

  const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos();

  const formatearFecha = (fecha) => {
    return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", {locale: es})
  }
  
  const fechaEsIgual = (gastos, index, gasto) => {
    if (index !== 0) {
      const fechaActual = formatearFecha(gasto.fecha);
      const fechaGastoAnterior = formatearFecha(gastos[index -1].fecha);

      if (fechaActual === fechaGastoAnterior) {
        return true;
      }else{
        return false
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Lista de Gastos</title>
      </Helmet>

      <Header>
        <BtnRegresar />
        <Titulo>Lista de Gastos</Titulo>
      </Header>
      

      <Lista>
        {gastos.map((gasto, index) => {
          return(
            <div key={gasto.id}>
              {!fechaEsIgual(gastos, index, gasto) && <Fecha>{formatearFecha(gasto.fecha)}</Fecha>} 
              
              <ElementoLista>
                <Categoria>
                  <IconoCategoria id={gasto.categoria} />
                  {gasto.categoria}
                </Categoria>
                <Descripcion>
                  {gasto.descripcion}
                </Descripcion>
                <Valor>
                  {formatearCantidad(gasto.cantidad)}
                </Valor>
                <ContenedorBotones>
                  <BotonAccion as={Link} to={`/editar/${gasto.id}`}><IconoEditar /></BotonAccion>
                  <BotonAccion onClick={() => borrarGasto(gasto.id)}><IconoBorrar /></BotonAccion>
                </ContenedorBotones>
              </ElementoLista>
            </div>
          );
        })}
        {
          hayMasPorCargar &&
          <ContenedorBotonCentral>
            <BotonCargarMas onClick={() => obtenerMasGastos() }>Cargar Más</BotonCargarMas>
          </ContenedorBotonCentral>
        }

        {gastos.length === 0 &&
          <ContenedorSubtitulo>
            <Subtitulo>No hay gastos por mostrar</Subtitulo>
            <Boton as={Link} to="/">Agregar Gasto</Boton>
          </ContenedorSubtitulo>
        }

      </Lista>

      <BarraTotalGastado />

    </>
  )
}
