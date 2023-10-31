import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import './index.css'
import WebFont from 'webfontloader';
import { Contenedor, Fondo } from './elementos';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EditarGasto, GastosPorCategorias, InicioSesion, ListaDeGastos, RegistroUsuarios, RutaPrivada } from './components';
import { Helmet } from 'react-helmet';
import favicon from './images/logo.png'
import { AuthProvider } from './context/AuthContext';
import { TotalGastadoProvider } from './context/TotalGastadoEnElMesContext.jsx';


WebFont.load({
  google: {
    families: ['Work Sans: 400,500,700', 'sans-serif']
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Helmet>
      <link rel="icon" href={favicon} type='image/x-icon' />
    </Helmet>
    <AuthProvider>
      <TotalGastadoProvider>

        <BrowserRouter>
          <Contenedor>
            <Routes>
              <Route path='/iniciar-sesion' element={<InicioSesion />} />
              <Route path='/crear-cuenta' element={<RegistroUsuarios />} />

              <Route path='/categorias' element={
                <RutaPrivada>
                  <GastosPorCategorias />
                </RutaPrivada>

              } />

              <Route path="/lista" element={
                <RutaPrivada>
                  <ListaDeGastos />
                </RutaPrivada>
              } />
              <Route path="/editar/:id" element={
                <RutaPrivada>
                  <EditarGasto />
                </RutaPrivada>
              } />
              <Route path="/" element={
                <RutaPrivada>
                  <App />
                </RutaPrivada>

              } />
            </Routes>

          </Contenedor>
        </BrowserRouter>
      </TotalGastadoProvider>
    </AuthProvider>


    <Fondo />
  </>
)
