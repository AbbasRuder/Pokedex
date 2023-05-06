import React from "react";
import img from "../assets/pikachu.png"

export default function Pokemon() {

    // const PokemonCard = ({ name, image, abilities })
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-52 max-w-xs">
                <img className="w-1/2 mx-auto" src={img} />
                <div className="p-4">
                    <h2 className="text-lg font-medium text-gray-800">Name</h2>
                    <div className="mt-2 text-sm text-gray-600">
                    <p className="text-gray-700">Abilities:</p>
                    <ul className="list-disc pl-5">
                        {/* {abilities.map((ability, index) => (
                        <li key={index}>{ability.ability.name}</li>
                        ))} */}
                        <li>Ability 1</li>
                        <li>Ability 2</li>
                    </ul>
                    </div>
                </div>
            </div>
        </>
    )
}