import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import './PokemonCard.css'
import PokemonHeading from "./PokemonHeading";
import { useParams } from "react-router-dom";


export default function PokemonDetails() {
  const [pokeData, setPokeData] = useState(null);
  const [pokeSpeciesData, setPokeSpeciesData] = useState(null)
  const [loading, setLoading] = useState(false);

  // this id is the value that is being passed using <Link to=' '/>. In our case it is the name of the pokemon
  const { id } = useParams();
  // --> useParams returns the route parameters as a key value pair, where 'id' is the key and the parameter is the value

  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      try {
        const pokemonData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const pokemonSpeciesData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );

        // console.log(pokemonSpeciesData);

        const data = {
          id: pokemonData.data.id,
          stats: pokemonData.data.stats,
          image: pokemonData.data.sprites.other.dream_world.front_default,
          abilities: pokemonData.data.abilities,
          height: pokemonData.data.height,
          types: pokemonData.data.types.map(item => item.type.name),

        };
        setPokeData(data);

        const speciesData = {
          desc: pokemonSpeciesData.data.flavor_text_entries[0].flavor_text,
          happiness: pokemonSpeciesData.data.base_happiness,
          capture_rate: pokemonSpeciesData.data.capture_rate,
          color: pokemonSpeciesData.data.color.name,
          evolved_from: pokemonSpeciesData.data.evolves_from_species,
          mythical: pokemonSpeciesData.data.is_mythical,
          legendary: pokemonSpeciesData.data.is_legendary
        }

        setPokeSpeciesData(speciesData);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <PokemonHeading />
      {loading ? (
        <Loading />
      ) : (

        pokeData &&
        <>
          <div className="flex flex-col lg:flex-row h-screen">

            <div className="w-full h-screen px-6 py-32 bg-slate-100">

              <div className="flex flex-col gap-16">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-44 h-44 flex justify-center items-center border-4 rounded-full bg-slate-300" style={{ borderColor: `${pokeSpeciesData.color}` }}>
                    <img className="h-36 w-36" src={pokeData.image} />
                  </div>

                  <div className="flex gap-6  ">
                    {pokeData.types.map((type, index) => (
                      <div className={`icon ${type} flex flex-col items-center gap-2`} key={index}>
                        <img src={`/assets/icons/${type}.svg`} alt={type} className="" />
                        <h3 className="uppercase font-semibold opacity-20">{type}</h3>
                      </div>
                    ))}
                  </div>

                  <div className="flex mt-14 gap-2">
                    <h1 className="text-4xl font-bold underline  decoration-2 decoration-sky-500/30">
                      #{pokeData.id}.
                    </h1>
                    <h1 className="capitalize text-4xl font-bold underline  decoration-2 decoration-sky-500/30" >
                      {id}
                    </h1>
                  </div>

                </div>

                <div>
                  <p className="text-center text-lg">{pokeSpeciesData.desc}</p>
                </div>
              </div>
            </div>
          </div>
          </>
        
      )}
    </>
  );
}
