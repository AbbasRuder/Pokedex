import React from 'react'
import Search from './Search'

export default function PokemonHeading({storePageData}) {
    return (
        <>
            <div className="flex justify-around items-center border bg-gray-800">
                <h1 className="text-white text-3xl font-bold text-center p-6">Pokedex</h1>
                <Search storePageData={storePageData}/>
            </div>
        </>
    )
}
