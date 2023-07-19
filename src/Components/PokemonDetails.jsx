import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PokemonDetails() {
    const [data, setData] = useState({});
    const [desc, setDesc] = useState("");
    const { id } = useParams();
    
    useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonSpeciesData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );

        const data = {
          stats: pokemonData.data.stats,
          image: pokemonData.data.sprites.front_default,
        };

        const description = pokemonSpeciesData.data.flavor_text_entries[0].flavor_text;

        setData(data);
        setDesc(description);
        console.log(data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
    }, [id]);
    
    return (
    <>
      <div className="p-64">
        <div className="">
          <h1>This is {id} </h1>
          <p>{desc}</p>
          <img className="w-40 h-30" src={data.image} />
        </div>
        <div className="flex gap-4 flex-wrap">
          {Object.keys(data).length === 0 ? (
            <p>...loading</p>
          ) : (
            data.stats.map(stat =>
                <div className="flex gap-1" key={stat.stat.name}>
                  <h1>{stat.stat.name}:</h1>
                  <span>{stat.base_stat}</span>
                </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
