
import './App.css'
import PokemonCard from './Components/PokemonCard'
import Pokemon from './Components/Pokemon'

function App() {

  return (
    <>
        <Pokemon />
      <div className="flex gap-x-10 gap-y-4 mx-16 flex-wrap mb-10">
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
        <PokemonCard />
      </div>
    </>
  )
}

export default App
