import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import './PokemonCard.css'
import PokemonHeading from "./PokemonHeading";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export default function PokemonDetails() {
  const [pokeData, setPokeData] = useState(null);
  const [pokeSpeciesData, setPokeSpeciesData] = useState(null)
  const [pokemonEvolutionData, setPokemonEvolutionData] = useState(null)
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
          desc: pokemonSpeciesData.data.flavor_text_entries[10].flavor_text,
          happiness: pokemonSpeciesData.data.base_happiness,
          capture_rate: pokemonSpeciesData.data.capture_rate,
          color: pokemonSpeciesData.data.color.name,
          evolved_from: pokemonSpeciesData.data.evolves_from_species,
          mythical: pokemonSpeciesData.data.is_mythical,
          legendary: pokemonSpeciesData.data.is_legendary
        }
        setPokeSpeciesData(speciesData);

        // Fetching Evolution Chain data
        const evolutionChainUrl = pokemonSpeciesData.data.evolution_chain.url
        const EvolutionChain = await axios.get(
          `${evolutionChainUrl}`
        )
        const pokemonEvolutionChain = {
          first: EvolutionChain.data.chain.species.name,
          second: EvolutionChain.data.chain.evolves_to[0].species.name,
          third: EvolutionChain.data.chain.evolves_to[0]?.evolves_to[0]?.species.name
        }
        // fetching name and image of each pokemon in the evolution chain.
        const evolutionDataPromises = Object.values(pokemonEvolutionChain).map(async pokemon => {
          // checking for falsy because the 'third' object may not be present
          if (pokemon) {
            try {
              const data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
              const evolutionData = {
                name: data.data.name,
                image: data.data.sprites.other.dream_world.front_default,
              }
              return evolutionData
            } catch (error) {
              console.error('Error fetching Pokemon Evolution data', error)
            }
          }
        })

        const evolutionDataArray = await Promise.all(evolutionDataPromises)
        setPokemonEvolutionData(evolutionDataArray)

        setLoading(false)
      } catch (error) {
        setLoading(false)
        console.log("Error fetching data:", error);
      }
    };
    fetchData();

  }, [id]);

  const filteredDesc = pokeSpeciesData && pokeSpeciesData.desc.replace('POKéMON', 'pokemon')

  return (
    <>
      <PokemonHeading />
      {loading ? (
        <Loading />
      ) : (

        pokeData &&
        <>
          <div className="bg-slate-100 pb-10">
            <div className="flex flex-col lg:flex-row">

              <div className="w-full px-6 pt-20">

                <div className="flex flex-col gap-16">
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-44 h-44 flex justify-center items-center border-4 rounded-full bg-slate-300" style={{ borderColor: `${pokeSpeciesData.color}` }}>
                      <img className="h-36 w-36" src={pokeData.image} />
                    </div>

                    <div className="flex gap-6">
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
                    <p className="mb-4 text-center text-lg">{filteredDesc}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-1/2 p-5 mx-auto rounded-md bg-slate-200">
              <h3 className="text-lg font-semibold text-center md:text-left text-slate-400">Evolution Chain</h3>
              <div className="p-5 flex flex-col items-center gap-4 md:justify-around md:flex-row">
                {pokemonEvolutionData && pokemonEvolutionData.map((item, index) => {
                  if (item) {
                    // filtered cause 'pokemonEvolutionData' might contain a falsy value.
                    const filteredPokemonEvolutionData = pokemonEvolutionData.filter(item => item !== undefined)
                    const isLastItem = index == filteredPokemonEvolutionData.length - 1
                    return (
                      <>
                        <Link to={`/${item.name}`}>
                          <div className="flex flex-col items-center" key={index}>
                            <div className="w-30 h-30 flex justify-center items-center border-4 rounded-full bg-slate-100" style={{ borderColor: `${pokeSpeciesData.color}` }}>
                              <img className="h-28 w-28" src={item.image} />
                            </div>
                            <p className="text-md capitalize text-slate-500">{item.name}</p>
                          </div>
                        </Link>
                        {!isLastItem && <img className="w-10 md:-rotate-90" src="assets/bottom-arrow.png" />}
                      </>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </>

      )}

    </>
  );
}
