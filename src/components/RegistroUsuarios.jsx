import { Helmet } from "react-helmet"
import { Header, Titulo, ContenedorHeader, Boton, Formulario, Input, ContenedorBoton, Alerta } from "./../elementos";
import SvgLogin from './../images/registro.svg?react'
import styled from "styled-components";
import { useState } from "react";
import { auth } from './../firebase/firebaseConfig'
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Svg = styled(SvgLogin)`
  width: 100%;
  max-height: 6.25rem;
  margin-bottom: 1.25rem;
`;

export const RegistroUsuarios = () => {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [estadoAlerta, setEstadoAlerta] = useState(false);
  const [alerta, setAlerta] = useState({});


  const handleChange = (e) => {

    switch (e.target.name) {
      case 'email':
        setCorreo(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break
      case 'password2':
        setPassword2(e.target.value);
        break
      default:
        break;
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

    if (correo === '' || password === '' || password2 === '') {
      setEstadoAlerta(true);
      setAlerta({
        tipo:'error',
        mensaje: 'Por favor rellene todos los datos'
      })
      return;
    }

    if (password !== password2) {
      setEstadoAlerta(true);
      setAlerta({
        tipo:'error',
        mensaje: 'Las contraseñas no son iguales'
      })
      return;
    }

    try {
      await createUserWithEmailAndPassword( auth, correo, password)
      navigate('/');
    } catch (error) {

      setEstadoAlerta(true);

      let mensaje;
      switch (error.code) {
        case 'auth/invalid-password':
          mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
          break;
        case 'auth/email-already-in-use':
          mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
          break;
        case 'auth/invalid-email':
          mensaje = 'El correo electrónico no es válido.'
          break;
        default:
          mensaje = 'Hubo un error al intentar crear la cuenta.'
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
        <title>Crear Cuenta</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Crear Cuenta</Titulo>
          <div>
            <Boton to='/iniciar-sesion'>Iniciar Sesión</Boton>
          </div>
        </ContenedorHeader>
      </Header>

      <Formulario onSubmit={handleSubmit}>
        <Svg />
        <Input type="email" name="email" placeholder="Correo" value={correo} onChange={handleChange} />
        <Input type="password" name="password" placeholder="Contraseña" value={password} onChange={handleChange} />
        <Input type="password" name="password2" placeholder="Repetir la contraseña" value={password2} onChange={handleChange} />

        <ContenedorBoton>
          <Boton as='button' $primario="true" type="submit">Crear Cuenta</Boton>
        </ContenedorBoton>

      </Formulario>

      <Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} setEstadoAlerta={setEstadoAlerta} />
    </>
  )
}
