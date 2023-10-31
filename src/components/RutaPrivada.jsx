import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"



export const RutaPrivada = ({children}) => {
  const {usuario} = useAuth();

  if (usuario) {
    return children;
  }else{
    return <Navigate to="/iniciar-sesion" />
  }

}
