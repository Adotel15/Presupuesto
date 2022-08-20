
import { useState, useEffect } from "react"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ 
    presupuesto,
    setPresupuesto,
    setGastos,
    gastos,
    setIsValidPresupuesto
}) => {

    // Variable para ver cuando hay disponible (Total - gastado)
    const [disponible, setDisponible] = useState(0);
    // Total - Disponible
    const [gastado, setGastado] = useState(0);
    // Porentaje para mostrarlo en la gráfica
    const [porcentaje, setPorcentaje] = useState(100)

    // Cada vez que gastos se modique (En la app.jsx tambien hay un useEffect de gastos, que guarda en local storage)
    // se recalculan total gastado, y total disponible
    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)
        setGastado(totalGastado);

        const totalDisponible = presupuesto - totalGastado;
        setDisponible(totalDisponible)

        // Calcular el porcentaje
        const nuevoPorcentaje = (( (presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        
        // Se espera para mostrar el nuevo porcentaje para que se vea la animación
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500)

    }, [gastos])

    // Función para convertir los números a dólares
   const formatearCantidad = (cantidad) => {

        return cantidad.toLocaleString('en-US', { 
            style: 'currency', 
            currency: 'USD' 
        })
    }

    // Botón para reinciar la app
    const handleResetApp = (() => {
        const resultado = confirm('¿Deseas reiniciar App?')

        // Si si que quiere, vaciamos presupuesto, y gastos y decimos que ya no es válido para que lo saque de la app
        if(resultado)
        {
            setPresupuesto('')
            setGastos([])
            setIsValidPresupuesto(false)

        } else {
            alert('Las finanzas son importantes')
        }

    })


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">

        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? 'red' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? 'red' : '#3B82F6'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
             />
        </div>

        <div className="contenido-presupuesto">
            <button
                className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>
            <p>
                <span>Presupuesto: </span> { formatearCantidad(Number(presupuesto)) }
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span>Disponible: </span> { formatearCantidad(Number(disponible)) }
            </p>
            <p>
                <span>Gastado: </span> { formatearCantidad(Number(gastado)) }
            </p>
        </div>
      
    </div>
  )
}

export default ControlPresupuesto
