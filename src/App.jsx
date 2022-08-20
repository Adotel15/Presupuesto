
// Imports de los Componentes
import Header from "./components/Header"
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'
// Imports de las funciones que vamos a necesitar
import { useState, useEffect } from 'react'
import { generarId } from './helpers'
// Import de para abrir el Modal
import IconoNuevoGasto from './img/nuevo-gasto.svg'


// Función Principal el main.jsx que renderiza todo, y que está vinculado al index.html llama a este componente como el principal
function App() {

  // 
  // *********************** STATES ****************************
  //

  // Estado del presupuesto, Busca en el local storage si ya existe, o sino lo inicia a 0
  const [presupuesto, setPresupuesto] = useState
  (
    Number(localStorage.getItem('Presupuesto')) ?? 0
  );

  // Estado de si es válido o no. Este bool sirve para o renderizar el componente NuevoPresupuesto o ControlPresupuesto
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  // Estados del modal, si está en true, se abre la pantalla en negro con los datos para añadir gasto
  const [modal, setModal] = useState(false);

   // Y la animar modal es para la animación del CSS, se le tiene que dejar un poco de tiempo con setTimeout
  const [animarModal, setAnimarModal] = useState(false);

  // Estado para la array con todos los gastos, se busca si ya existia, y sino se inicializa vacio
  const [gastos, setGastos] = useState
  (
    localStorage.getItem('Gastos') ? JSON.parse(localStorage.getItem('Gastos')) : []
  )
  
  // Esta es la variable que se llena cuando el usuario quiere editar un gasto en particular, luego de editarse se vuelve a vacío
  const [gastoEditar, setGastoEditar] = useState({})

  // Si la variable de filtros está llena, significa que el usuario ha dado a los filtros, entonces se creará un array temporal en gastosFlitrados que
  // Se mostrará en vez de la array de los gastos
  const [filtros, setFiltros] = useState('')

  // Array creado para mostrar un filtro temporal, luego se vacia
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  // 
  // **************************** EFFECTS *******************************
  //

  // Effect atento a gastosEditar si no es un objeto vacío, abre el modal
  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0){
      setModal(true);

      setTimeout(() => {
        setAnimarModal(true);
      }, 500)
    }
  }, [gastoEditar])

  // Effect que lee la variable presupuesto cada vez que se modifica para guardarlo en localStorage
  useEffect(() => {
    localStorage.setItem('Presupuesto', presupuesto ?? 0)

  }, [presupuesto])

  // Effecto para la variable gastos, cada vez que se modifique lo convierte en un string de JSON y lo guarda en localStorage
  useEffect(() => {
    localStorage.setItem('Gastos', JSON.stringify(gastos) ?? [])

  }, [gastos])

  // Lee si filtros tiene algo, si es así crea un array con todos los gastos que coincidan con ese filtro, y lo guarda en gastosFiltrados
  useEffect(() => {
    if(filtros){
      const gastadoFiltrados = gastos.filter( gasto => gasto.categoria === filtros)
      setGastosFiltrados(gastadoFiltrados)
    }

  }, [filtros])

  // Este se ejectua solo cuando se abre la página una vez, hace la primera comprobación si hay alguien en localstorage, si lo hay incia la variable de válido para que salte la pag incial
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('Presupuesto')) ?? 0;

    if (presupuestoLS > 0) setIsValidPresupuesto(true)
  },[])

  // Función para abrir el modal, con la animación cada vez que se quiere añadir un gasto
  const handleNuevoGasto = () => {
    // El modal se pone en true para renderizarlo
    setModal(true);
    // Por si habia algo en gastoEditar se se vacia
    setGastoEditar({})

    // Para darle tiempo a la animación
    setTimeout(() => {
      setAnimarModal(true);
    }, 500)
  }

  // Guardar el gasto añadido, y cerrar el modal automáticamente
  const guardarGasto = gasto => {
    // Primero comprobamos si el gasto tiene id, porque significa que estaríamos editando
    if(gasto.id) {
      // Recorremos el array y cuando los id coincidan los intercambiamos
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      // Guardamos la nueva array
      setGastos(gastosActualizados)
      // Vaciamos los gastosEditar
      setGastoEditar({})

    } else { 
      // Sino es un nuevo gasto
      // Creamos su id, con una función auxiliar
      gasto.id = generarId();
      // Ponemos la fecha de hoy en el objeto
      gasto.fecha = Date.now();
      // Añadimos a la array
      setGastos([...gastos, gasto]);
   }

   // Llamamos a la animación, y cerramos el modal después de medio segundo
    setAnimarModal(false);

        setTimeout(() => {
            setModal(false);
        }, 500)
  }

  // Función para eliminar el gasto, solo recoremos el array gastos con el .filter y quitamos el que coincide con el id
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados);

  }

  return (
    // Cuando el modal está en true, la página se queda estática arriba del todo
    <div className={modal ? 'fijar' : '' }>

      {/* El header es la pantalla incial, en función de si el presupuesto es válido o no, mostrará la pantalla incial o la app abierta*/}
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto = {isValidPresupuesto}
        setIsValidPresupuesto = {setIsValidPresupuesto}
      />


      {
      /* Si el presupuesto es válido se mostrará el listado de los gastos */
      isValidPresupuesto &&
      (
        <>
        <main>
          <Filtros
            filtros={filtros}
            setFiltros={setFiltros}          
          />
          <ListadoGastos
            gastos = {gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto = {eliminarGasto}
            filtros={filtros}
            gastosFiltrados={gastosFiltrados}
          />
        </main>

         <div className='nuevo-gasto'>
            <img 
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {
      // Si el modal está en true, se muestra una pantalla en negro por encima para añadir un nuevo gasto
      modal && <Modal 
                  setModal = {setModal}
                  animarModal = {animarModal}
                  setAnimarModal = {setAnimarModal}
                  guardarGasto = {guardarGasto}
                  gastoEditar={gastoEditar}
                  setGastoEditar={setGastoEditar}
                  />}
     
    </div>
    
  )
}

export default App
