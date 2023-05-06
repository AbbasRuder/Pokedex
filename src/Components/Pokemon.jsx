import React from "react";
import img from "../assets/pikachu.png"

export default function Pokemon() {
    return (
        <>
            {/* <div classNameNameName="bg-orange-600">
                <img
                    classNameNameName="w-56"
                    src={img}/>
                <div>#001</div>
            </div> */}
            <div className="flex-col w-52 h-full max-w-xs rounded-lg bg-orange-600 ">
                <a href="#!">
                    <img
                        className="border border-white rounded-lg"
                        src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/251.png"
                        alt=""
                    />
                </a>
                <div className="p-6">
                    <h5
                        className="mb-2 text-md font-medium text-center leading-tight text-neutral-800 dark:text-neutral-50">
                        Calebi
                    </h5>
                    <p className="mb-4 text-sm text-white">
                        A fun pokemon ultil it is hungry.
                    </p>
                    {/* <button className="mx-14">
                        Button
                    </button> */}
                </div>
            </div>
        </>
    )
}