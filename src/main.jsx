import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

/*
    Este es el archivo que el index de HTML (Osea el esqueleto de la página) importa del <script /> para saber que mostrar

    Aqui importamos React, el DOM, el componente App que es el principal, y la hoja de estilos que se guarda en index.css
    Y lo renderizamos
    Llamamos dentro dela función al componente de App que será el que llamará a todos los demás
 */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
