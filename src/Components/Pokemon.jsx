import PokemonCard from './PokemonCard'
import { useState } from 'react'

export default function Pokemon() {
    const [PokemonName, SetPokemonName] = useState(['Pikachu', 'Charijard'])

    return (
        <>
            {/* Main Page Heading */}
            <div className="border mb-10">
                <h1 className="text-xl font-bold text-center p-6">Pokemon Cards</h1>
            </div>
            {/* Pokemon Card Component */}
            <div className="flex gap-x-10 gap-y-4 justify-center flex-wrap mb-10">
                {PokemonName.map(pokemon => 
                    <PokemonCard name={pokemon}/>)}
            </div>

        </>
    )
}