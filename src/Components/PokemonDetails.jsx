import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

export default function PokemonDetails() {
  const [pokeData, setPokeData] = useState(null);
  const [pokeSpeciesData, setPokeSpeciesData] = useState(null)
  const [loading, setLoading] = useState(false);

  // this id is the value that is being passed using <Link to=' '/>. In our case it is the name of the pokemon
  const { id } = useParams();


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

        console.log(pokemonSpeciesData);

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

  console.log('f', pokeData);
  console.log(pokeSpeciesData);

  // ----------------------------    Bar Chart     ----------------------------
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    // Tooltip,
    Legend
  );

  const options = {
    // responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Abilities',
      },
    },
  };

  const labels = pokeData && Array.isArray(pokeData.stats) ? pokeData.stats.map(item => item.stat.name) : [];

  const barData = {
    labels,
    datasets: [
      {
        // label: 'Dataset 1',
        data: pokeData && Array.isArray(pokeData.stats) ? pokeData.stats.map(item => item.base_stat) : [],
        backgroundColor: `${pokeSpeciesData && pokeSpeciesData.color}`
      },
    ],
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (

        pokeData &&
        <div className="flex flex-col lg:flex-row h-screen bg-[#242424]">

          {/* left */}
          <div className="w-full lg:w-4/12 px-6 py-32 bg-slate-100">

            <div className="flex flex-col gap-16">
              <div className="flex flex-col items-center gap-2">
                <div className="w-44 h-44 flex justify-center items-center border-4 rounded-full bg-[#242424]"  style={{ borderColor: `${pokeSpeciesData.color}` }}>
                  <img className="h-36 w-36" src={pokeData.image} />
                </div>
                <h1 className="mt-6 capitalize text-4xl font-bold underline" >
                  {id}
                </h1>
                <div >
                  {pokeData.types.map(item => {
                    return (
                      <span className="text-black text-xs font-semibold mr-2 px-2.5 py-0.5 rounded uppercase " style={{ backgroundColor: `${pokeSpeciesData.color}` }}>
                        {item}
                      </span>
                    )
                  })}
                </div>

              </div>
              <div>
                <p className="text-center text-lg">{pokeSpeciesData.desc}</p>
              </div>
            </div>

          </div>

          {/* right */}
          <div className="w-full lg:w-8/12 bg-[#242424]">
            <h1 className="text-7xl font-bold text-slate-100 p-4">#{pokeData.id}</h1>
            <div className="w-2/3 mx-auto mt-20 bg-slate-100 rounded-lg p-4">
              <Bar options={options} data={barData} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
