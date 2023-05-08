import React from "react";
import img from "../assets/pikachu.png"

export default function Pokemon({name}) {
   
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-52 max-w-xs">
                <img className="w-1/2 mx-auto border" src={img} />
                <div className="p-4">
                    <h2 className="text-lg text-center font-medium text-gray-800">{name}</h2>
                    <div className="mt-2 text-sm text-gray-600">
                    <p className="text-gray-700">Abilities:</p>
                    <ul className="list-disc pl-5">

                        <li>Electricity</li>
                        <li>Thunder</li>
                    </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

 // const PokemonCard = ({ name, image, abilities })
{/* {abilities.map((ability, index) => (
 <li key={index}>{ability.ability.name}</li>
))} */}