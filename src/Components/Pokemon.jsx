import PokemonCard from './PokemonCard'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Pokemon() {
    const [allPokemonData, setAllPokemonData] = useState([])
    const [pokemonData, setPokemonData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("https://pokeapi.co/api/v2/pokemon").then(response => {
            const data = response.data.results.map(pokemon => {
                return axios.get(pokemon.url).then(response => {
                    return response.data
                })
            })

            //---> Ensuring that all the promises in the data array is resolved before setting 'setPokemonData'
            Promise.all(data).then( response => {
                console.log(response);
                setAllPokemonData(response);
                setPokemonData(response.map(poke => (
                    {
                        name: poke.name,
                        image: poke.sprites.other.dream_world.front_default
                    })
                ))
            })

            setLoading(false)
        })
        .catch(error => {
            console.error("Error Fetching", error);
        })

    },[])

  


    return (
        <>
            {/* Main Page Heading */}
            <div className="border mb-10">
                <h1 className="text-3xl font-bold text-center p-6">Pokemon Cards</h1>
            </div>
            {/* Pokemon Card Component */}
            {loading === true ? (
                <p className='mx-16 text-xl'>loading...</p>) : (
            <div className="mx-16 flex gap-x-10 gap-y-4 justify-center flex-wrap mb-10">
                {pokemonData.map(pokemon =>
                    <Link to={`${pokemon.name}`} key={pokemon.name}>
                    <PokemonCard key={pokemon.name} name={pokemon.name} image={pokemon.image}/>
                    </Link>)}
            </div>
                )
            }
        </>
        // <></>
    )
}
