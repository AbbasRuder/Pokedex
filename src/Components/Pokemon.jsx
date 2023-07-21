import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PokemonCard from './PokemonCard'
import Pagination from './Pagination'

export default function Pokemon() {
    const [allPokemonData, setAllPokemonData] = useState([])
    const [pokemonData, setPokemonData] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextPageURL, setNextPageURL] = useState()
    const [prevPageURL, setPrevPageURL] = useState()
    

    useEffect(() => {
        // setting loading state to true whenever useeffect loads
        setLoading(true)

        axios.get(currentPageURL).then(response => {

            //setting next and previous page url for pagination
            setNextPageURL(response.data.next)
            setPrevPageURL(response.data.previous)

            // fetching all the data of indiviual pokemons
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

             // setting loading state to false whenever fetching is completed
            setLoading(false)
            
        })
        .catch(error => {
            console.error("Error Fetching", error);
        })
    
    // useEffect re-runs wherever currentPageURL changes
    },[currentPageURL])

    // Pagination
    const gotoNextPage = () => {
        setCurrentPageURL(nextPageURL)
    }

    const gotoPrevPage = () => {
        setCurrentPageURL(prevPageURL)
    }
  

    // console.log("data",allPokemonData)
    // console.log("url", nextPageURL);

    return (
        <>
            {/* Main Page Heading */}
            <div className="border mb-10">
                <h1 className="text-3xl font-bold text-center p-6">Pokemon Cards</h1>
            </div>
            {/* Pokemon Card Component */}
            {loading ? 
            (
                <p className='mx-16 text-xl'>loading...</p>
                ) : (
                <>
                    <div className="mx-16 flex gap-x-10 gap-y-4 justify-center flex-wrap mb-10">
                        {pokemonData.map(pokemon =>
                            <Link to={`${pokemon.name}`} key={pokemon.name}>
                            <PokemonCard key={pokemon.name} name={pokemon.name} image={pokemon.image}/>
                            </Link>)}
                    </div>
                    <div className="flex justify-center mb-10">
                        {/*We are passing function props conditionaly so that we can disable the previous/next button if there are no previous/next page */}
                        <Pagination gotoNextPage={nextPageURL ? gotoNextPage : null} gotoPrevPage={prevPageURL ? gotoPrevPage : null}/>
                    </div>
                </>
                )
            }

            
        </>
        // <></>
    )
}
