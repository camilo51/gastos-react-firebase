import { Boton } from './Boton';
import IconoCerrarSesion  from './../images/log-out.svg?react';
import { auth } from '../firebase/firebaseConfig';
import { signOut } from 'firebase/auth';
import { Navigate } from 'react-router-dom';


export const BotonCerrarSesion = () => {

  const cerrarSesion = async() => {

    try {
      await signOut(auth);
      <Navigate to='/iniciar-sesion' />
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Boton $iconoGrande as="button" onClick={cerrarSesion}>
        <IconoCerrarSesion />
    </Boton>
  )
}
