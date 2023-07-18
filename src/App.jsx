
import './App.css'
import Pokemon from './Components/Pokemon'
import { Route, Routes } from 'react-router-dom'
import PokemonDetails from './Components/PokemonDetails'

function App() {

  return (
    <Routes>
        <Route path='/' element={<Pokemon />}/>
        <Route path='/:id' element={<PokemonDetails />}/>
    </Routes>
  )
}

export default App
