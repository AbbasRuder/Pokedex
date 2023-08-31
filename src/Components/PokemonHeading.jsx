import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

export default function PokemonHeading({ storePageData }) {
    return (
        <>
            <div className="flex justify-around items-center border bg-gray-800 sticky top-0">
                <Link to={'/'}>
                    <h1 className="text-white text-3xl font-bold text-center p-6">Pokedex</h1>
                </Link>
                <Search storePageData={storePageData} />
            </div>
        </>
    )
}
