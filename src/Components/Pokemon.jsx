import PokemonCard from './PokemonCard'
import PokemonDetails from './PokemonDetails'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Pokemon() {
    const [PokemonData, SetPokemonData] = useState([])

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon").then(response => {
            const data = response.data.results.map(pokemon => {
                return axios.get(pokemon.url).then(response => {
                    return {
                        name: response.data.name,
                        image: response.data.sprites.other.dream_world.front_default,
                        colorType: response.data.types.map(type => type.type.name)
                    }
                })
            })
            // Ensuring that all the promises in the data array is resolved before setting 'setPokemonData'
            Promise.all(data).then(pokemon => {
                SetPokemonData(pokemon)
                // console.log(pokemon)
            })
        })
    },[])
    // console.log(PokemonData.map(pokemon => pokemon.name));

    return (
        <>
            {/* Main Page Heading */}
            <div className="border mb-10">
                <h1 className="text-3xl font-bold text-center p-6">Pokemon Cards</h1>
            </div>
            {/* Pokemon Card Component */}
            <div className="mx-16 flex gap-x-10 gap-y-4 justify-center flex-wrap mb-10">
                {PokemonData.map(pokemon =>
                    <Link to={`${pokemon.name}`}>
                    <PokemonCard key={pokemon.name} name={pokemon.name} image={pokemon.image} colorType={pokemon.colorType}/>
                    </Link>)}
            </div>
        </>
    )
}
