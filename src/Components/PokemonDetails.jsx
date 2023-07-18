import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";

export default function PokemonDetails() {
    const [desc, setDesc] = useState('')
    const [data, setData] = useState('')
    const { id } = useParams();
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pokemonData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
                const pokemonSpeciesData = await  axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

                const data = {
                    stats: pokemonData.data.stats,
                    image: pokemonData.data.sprites.front_default
                  };
            
                  const description = pokemonSpeciesData.data.flavor_text_entries[0].flavor_text;
            
                  setData(data);
                  setDesc(description);
                  console.log(data);

            } catch (error) {    
            }
        }
        fetchData()
    }, [])
    // useEffect(() => {
    //     const data = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => {
    //         return {
    //             stats: res.data.stats,
    //             image: res.data.sprites.front_default
    //         }
    //     })
    //     Promise.all(data).then(
    //         setData(data)
    //     )
    //     axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then(res => {
    //         const desc = res.data.flavor_text_entries[0].flavor_text
    //         setDesc(desc)
    //     })
    // }, [])

  

    return (
        <>
            <div className="p-32">
                <h1>This is {id} </h1>
                <p>{desc}</p>
                <img className="w-40 h-30" src={data.image}/>
            </div>
        </>
    )
}