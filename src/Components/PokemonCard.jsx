import React from "react";

export default function Pokemon({name, image}) {
   const Capname = name[0].toUpperCase() + name.slice(1)
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden w-52 max-w-xs">
                <div className="bg-red-100">
                    <img className="w-full h-36 mx-auto lg:w-1/2" src={image} 
                /></div>
                <div className="p-4">
                    <h2 className="text-lg text-center font-medium text-gray-800">{Capname}</h2>
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