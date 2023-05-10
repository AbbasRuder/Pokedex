import PokemonCard from './PokemonCard'
import { useState, useEffect } from 'react'
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

            Promise.all(data).then(pokemon => {
                SetPokemonData(pokemon)
            })
        })

    

    },[])
    // console.log(PokemonData.map(pokemon => pokemon.name));

    return (
        <>
            {/* Main Page Heading */}
            <div className="border mb-10">
                <h1 className="text-xl font-bold text-center p-6">Pokemon Cards</h1>
            </div>
            {/* Pokemon Card Component */}
            <div className="flex gap-x-10 gap-y-4 justify-center flex-wrap mb-10">
                {PokemonData.map(pokemon => 
                    <PokemonCard key={pokemon.name} name={pokemon.name} image={pokemon.image} colorType={pokemon.colorType}/>)}
            </div>
        </>
    )
}
