import React from "react";
import './PokemonCard.css'

export default function PokemonCard({ name, image, types, storePageData }) {
    const capitalName = name[0].toUpperCase() + name.slice(1)
    const typeName = types.map(item => item.type.name)

  
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-52 max-w-xs" onClick={storePageData}>
                <div className=''>
                    <div className={`${typeName[1] ? `bg-gradient-to-r from-${typeName[0]} to-${typeName[1]}` : `bg-${typeName[0]}`}`}>

                        <img className="w-full h-36 mx-auto lg:w-1/2" src={image} />
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-lg text-center font-medium text-gray-800">{capitalName}</h2>
                    <div className="mt-2 text-sm text-gray-600">
                    </div>
                    <div className="flex mx-8 mt-4 md:mt-0 ">
                        {typeName.map((type, index) => (
                            <div className={`icon ${type}`} key={index}>
                                <img src={`/assets/icons/${type}.svg`} alt={type} className="" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

