import React from "react";
// import '../Components/PokemonCard.css'

export default function PokemonCard({name, image, colorType}) {
   const capitalName = name[0].toUpperCase() + name.slice(1)
//    console.log(colorType[1]);
  
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-52 max-w-xs">
                <div className={`${colorType[1] ? `bg-gradient-to-r from-${colorType[0]} to-${colorType[1]}` : `bg-${colorType[0]}`}`}>
                    <img className="w-full h-36 mx-auto lg:w-1/2" src={image} />
                </div>
                <div className="p-4">
                    <h2 className="text-lg text-center font-medium text-gray-800">{capitalName}</h2>
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

// {`${colorType[1] ? `bg-gradient-to-r from-${colorType[0]} to-${colorType[1]}` : `bg-${colorType}`}`}
// `${colorType[1] ? `bg-gradient-to-r from-${typeColors[colorType[0]]} to-${typeColors[colorType[1]]}` : `bg-${typeColors[colorType[0]]}`}`

