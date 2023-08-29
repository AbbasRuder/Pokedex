import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PokemonHeading from './PokemonHeading'
import PokemonCard from './PokemonCard'
import Pagination from './Pagination'
import Loading from './Loading'


export default function Pokemon() {
    // const [allPokemonData, setAllPokemonData] = useState([])
    const [pokemonData, setPokemonData] = useState([])
    const [currentPageURL, setCurrentPageURL] = useState("https://pokeapi.co/api/v2/pokemon")
    const [nextPageURL, setNextPageURL] = useState()
    const [prevPageURL, setPrevPageURL] = useState()
    const [loading, setLoading] = useState(false)



    useEffect(() => {
        // setting loading state to true whenever useEffect loads
        setLoading(true)
        setPokemonData([])
        axios.get(currentPageURL).then(response => {

            //setting next and previous page url for pagination
            setNextPageURL(response.data.next)
            setPrevPageURL(response.data.previous)

            // fetching all the data of individual pokemon's
            const data = response.data.results.map(pokemon => {
                return axios.get(pokemon.url).then(response => {
                    return response.data
                })
            })

            // Ensuring that all the promises in the data array is resolved before setting 'setPokemonData'
            Promise.all(data).then(response => {
                // setAllPokemonData(response);
                setPokemonData(response.map(poke => (
                    {
                        name: poke.name,
                        image: poke.sprites.other.dream_world.front_default,
                        types: poke.types
                    })
                ))
            })

            // If Fetching is complete, displaying the loading screen for at least 1.3s and then setting it to false. --> This is to avoid the quick flashes of the bg which doesn't look good.
            setTimeout(() => {
                setLoading(false);
            }, 1300);

            // Set pagination data from local storage 
            const storedPageData = JSON.parse(localStorage.getItem('pokemonPageData'));
            if (storedPageData) {
                setCurrentPageURL(storedPageData.currentPageURL);
                setNextPageURL(storedPageData.nextPageURL);
                setPrevPageURL(storedPageData.prevPageURL);

                // cleaning local-Storage to avoid unwanted behaviors
                localStorage.removeItem('pokemonPageData');
            }

        })
            .catch(error => {
                setLoading(false)
                console.error("Error Fetching", error);
            })

        // useEffect re-runs wherever currentPageURL changes
    }, [currentPageURL])

    // Pagination
    const gotoNextPage = () => {
        setCurrentPageURL(nextPageURL)
    }

    const gotoPrevPage = () => {
        setCurrentPageURL(prevPageURL)
    }

    // storing the current page url's to local-storage
    const storePageData = () => {
        const pageData = {
            currentPageURL,
            nextPageURL,
            prevPageURL,
        }
        localStorage.setItem('pokemonPageData', JSON.stringify(pageData))
    }


    return (
        <>
            {loading ?
                (
                    <Loading />
                ) : (
                    <>
                        {/*------ Main Page Heading ------*/}
                        <PokemonHeading />

                        {/*------ Pokemon Card Component ------ */}
                        <div className="mt-10 mx-16 flex gap-x-10 gap-y-4 justify-center flex-wrap mb-10">
                            {pokemonData.map(mapItem =>
                                <Link to={mapItem.name} key={mapItem.name}>
                                    <PokemonCard key={mapItem.name} name={mapItem.name} image={mapItem.image} types={mapItem.types} storePageData={storePageData} />
                                </Link>)}
                        </div>

                        {/*------ Pagination ------ */}
                        <div className="flex justify-center mb-10">
                            {/*We are passing function props conditionally so that we can disable the previous/next button if there are no previous/next page */}
                            <Pagination gotoNextPage={nextPageURL ? gotoNextPage : null} gotoPrevPage={prevPageURL ? gotoPrevPage : null} />
                        </div>
                    </>
                )
            }


        </>
    )
}
