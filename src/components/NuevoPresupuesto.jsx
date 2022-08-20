
import { useState } from 'react'
import Mensaje from './Mensaje'

const NuevoPresupuesto = ({ 
    presupuesto, 
    setPresupuesto,
    setIsValidPresupuesto
 }) => {

    const [mensaje, setMensaje] = useState('');

    const handlePresupuesto = (e) => {
        e.preventDefault();

        // La función Number convierte de un string a un Número
        // El input predeterminado es un string
        if ( !presupuesto || presupuesto < 0) {
            setMensaje("No es un Presupuesto válido");
            return // Esto es para detener la función handlePresupuesto
        }

        setMensaje('');
        setIsValidPresupuesto(true);

        

    }


  return (
    <div className='contenedor-presupuesto contenedor sombra'>

        <form 
            onSubmit={handlePresupuesto} 
            className='formulario'>

            <div className='campo'>

                <label>Crear Presupuesto</label>

                <input
                    className='nuevo-presupuesto'
                    type='number'
                    placeholder='Añade tu Presupuesto'
                    value={presupuesto}
                    onChange= { Entrada => setPresupuesto(Entrada.target.value)}
                />

                <input
                    type='submit'
                    value='Añadir'
                />

                {mensaje && <Mensaje tipo='error'>{mensaje}</Mensaje> }

            </div>
        </form>

    </div>
  )
}

export default NuevoPresupuesto
