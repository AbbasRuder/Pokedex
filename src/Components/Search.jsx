import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

//Component Hierarchy--> Pokemon > PokemonHeading > Search
export default function Search({storePageData}) {
    const [pokemonAllName, setPokemonAllName] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredSearchNames, setFilteredSearchNames] = useState(null)


    useEffect(() => {

        if (!pokemonAllName) {
            axios.get('https://pokeapi.co/api/v2/pokemon?limit=1281')
                .then(res => {
                    const pokename = res.data.results.map(item => item.name)
                    setPokemonAllName(pokename)
                })
                .catch(error => {
                    console.error(error);
                })
        }

        const filterNames = (query, array) => {
            // checks if any pokemon name in the 'array' starts with the words in 'query'
            return array.filter((name) => name.toLowerCase().startsWith(query.toLowerCase()))
        }
        const array = pokemonAllName && searchQuery && filterNames(searchQuery, pokemonAllName)
        setFilteredSearchNames(array)

    }, [searchQuery])


    const handleChange = (e) => {
        const name = e.target.value
        setSearchQuery(name)
    }

    return (
        <>
            <div className='relative'>
                <div className="relative text-gray-600 focus-within:text-gray-400 ">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" className="w-6 h-6">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </button>
                    </span>
                    <input type="search" name="input" className="py-2 text-sm md:text-md text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900"
                        placeholder="Search..."
                        autoComplete='off'
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-1 absolute w-full max-h-52 overflow-auto rounded bg-slate-200">
                {filteredSearchNames && filteredSearchNames.map((item, index) => {
                    return (
                        <Link to={`/${item}`} key={index}>
                            <div className='mb-0.5 p-2 rounded bg-slate-100 cursor' key={index} onClick={storePageData}>{item}</div>
                        </Link>
                            )
                        })}
                </div>

            </div>
        </>
    )
}
