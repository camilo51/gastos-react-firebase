import { Helmet } from "react-helmet"
import { Header, Titulo, ContenedorHeader, Boton, Formulario, Input, ContenedorBoton, Alerta } from "./../elementos";
import SvgLogin from './../images/login.svg?react'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 12.5rem;
  margin-bottom: 1.25rem;
`;

export const InicioSesion = () => {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});


  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setCorreo(e.target.value);
    }else if(e.target.name === 'password'){
      setPassword(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstadoAlerta(false);
    setAlerta({});

    const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/

    if (!expresionRegular.test(correo)) {
      setEstadoAlerta(true);
      setAlerta({
        tipo:'error',
        mensaje: 'Por favor ingresa un correo electrónico valido'
      })
      return;
    }

    if (correo === '' || password === '') {
      setEstadoAlerta(true);
      setAlerta({
        tipo:'error',
        mensaje: 'Por favor rellene todos los datos'
      })
      return;
    }

    try {
      await signInWithEmailAndPassword( auth, correo, password)
      navigate('/');
    } catch (error) {

      setEstadoAlerta(true);

      let mensaje;
      switch (error.code) {
        case 'auth/wrong-password':
          mensaje= 'La contraseñaa no es correcta';
          break;
        case 'auth/user-not-found':
          mensaje= 'No se encontro ninguna cuenta con este correo electronico';
          break;
        default:
          mensaje = 'Hubo un error al intentar iniciar sesion.'
          break;
      }

      setAlerta({
        tipo:'error',
        mensaje
      })
    }

  }


  return (
    <>
        <Helmet>
          <title>Iniciar Sesión</title>
        </Helmet>

        <Header>
          <ContenedorHeader>
            <Titulo>Iniciar Sesión</Titulo>
            <div>
              <Boton to='/crear-cuenta'>Registrarse</Boton>
            </div>
          </ContenedorHeader>
        </Header>

        <Formulario onSubmit={handleSubmit}>
          <Svg />
          <Input type="email" name="email" placeholder="Correo" value={correo} onChange={handleChange} />
          <Input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange} />
          
          <ContenedorBoton>
            <Boton as='button' $primario="true" type="submit">Iniciar Sesión</Boton>
          </ContenedorBoton>
          
        </Formulario>

        <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} />

      </>
  )
}
