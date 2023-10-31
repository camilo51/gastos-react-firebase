import { useEffect, useState } from "react"
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from './../elementos/ElementosDeFormulario'
import { Alerta, Boton } from "../elementos"
import IconoPlus from './../images/plus.svg?react';
import { SelectCategorias } from "./SelectCategorias";
import { DatePicker } from "./DatePicker";
import { agregarGasto } from "../firebase/agregarGasto";
import { fromUnixTime, getUnixTime } from "date-fns";
import { useAuth } from './../context/AuthContext'
import { useNavigate } from "react-router-dom";
import { editarGasto } from "../firebase/editarGasto";


export const FormularioGasto = ({gasto}) => {

    const [inputDescripcion, setInputDescripcion] = useState('');
    const [inputCantidad, setInputCantidad] = useState('');
    const [categoria, setCategoria] = useState('hogar')
    const [fecha, setFecha] = useState(new Date());
    const [estadoAlerta, setEstadoAlerta] = useState(false);
    const [alerta, setAlerta] = useState({});
    
    const {usuario} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      
        if (gasto) {
            if (gasto.data().uidUsuario === usuario.uid) {
                setCategoria(gasto.data().categoria);
                setFecha(fromUnixTime(gasto.data().fecha));
                setInputDescripcion(gasto.data().descripcion);
                setInputCantidad(gasto.data().cantidad);
            }else{
                navigate('/lista');
            }
        }

    }, [gasto, usuario, navigate])
    

    const handleChange = (e) => {
        if (e.target.name === 'descripcion') {
            setInputDescripcion(e.target.value)
        }else if(e.target.name === 'cantidad'){
            setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const cantidad = parseFloat(inputCantidad).toFixed(2);

        if (inputDescripcion !== '' && inputCantidad !== '') {

            if (cantidad) {

                if (gasto) {
                    editarGasto({
                        id: gasto.id,
                        categoria,
                        descripcion: inputDescripcion,
                        cantidad,
                        fecha: getUnixTime(fecha)
                    }).then(() => navigate('/lista'))
                }else{
                    agregarGasto({
                        categoria,
                        descripcion: inputDescripcion,
                        cantidad,
                        fecha: getUnixTime(fecha),
                        uidUsuario: usuario.uid
                    })
                    .then(() => {
                        setCategoria('hogar');
                        setInputDescripcion('');
                        setInputCantidad('');
                        setFecha(new Date());
    
                        setEstadoAlerta(true)
                        setAlerta({
                            tipo: 'exito',
                            mensaje: 'El gasto fue agregado correctamente.'
                        })  
                    })
                    .catch((error) => {
                        setEstadoAlerta(true)
                        setAlerta({
                            tipo: 'error',
                            mensaje: 'Hubo un problema al intentar agregar tu gasto.'
                        }) 
                    })
                }


            }else{
                setEstadoAlerta(true)
                setAlerta({
                    tipo: 'error',
                    mensaje: 'El valor que ingresaste no es correcto.'
                })    
            }

        }else{
            setEstadoAlerta(true)
            setAlerta({
                tipo: 'error',
                mensaje: 'Por favor rellena todos los campos.'
            })
        }

    }

  return (
    <Formulario onSubmit={handleSubmit}>
        <ContenedorFiltros>
            <SelectCategorias categoria={categoria} setCategoria={setCategoria} />
            <DatePicker fecha={fecha} setFecha={setFecha} />
        </ContenedorFiltros>
        <div>
            <Input type="text" name="descripcion" id="descripcion" placeholder="Descripcion del gasto" value={inputDescripcion} onChange={handleChange} />
            <InputGrande type="text" name="cantidad" id="cantidad" placeholder="$0.00" value={inputCantidad} onChange={handleChange} />
            <ContenedorBoton>
                <Boton as="button" $primario $conIcono type="submit">{gasto ? 'Editar Gasto' : 'Agregar Gasto'} <IconoPlus /></Boton>
            </ContenedorBoton>
        </div>
        <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} />
    </Formulario>
  )
}
