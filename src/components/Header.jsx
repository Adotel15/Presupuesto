
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({ 
    presupuesto,
    setPresupuesto, 
    isValidPresupuesto, 
    setIsValidPresupuesto,
    gastos,
    setGastos
}) => {

  return (
    <header>
        <h1>Planificador de Gastos</h1>

        {isValidPresupuesto ? 
        (
            // Si el presupuesto es válido se llama al componente que controla la app como tal
            <ControlPresupuesto 
            presupuesto = {presupuesto}
            gastos = {gastos}
            setGastos={setGastos}
            setPresupuesto={setPresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            />
        ) 
        : 
        (
            // Si no es válido se llamará al componente para crear un nuevo presupuesto
            <NuevoPresupuesto 
            presupuesto = {presupuesto}
            setPresupuesto = {setPresupuesto} 
            setIsValidPresupuesto = {setIsValidPresupuesto}
        />    
        )}
    </header>
  )
}

export default Header
