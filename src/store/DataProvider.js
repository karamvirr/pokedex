import { useEffect, useReducer, useState } from 'react';
import DataContext from './data-context';

/* API Response Cache Structure
{
  regionData: {
    REGION_NAME: {
      POKEMON_ID: {
        POKEMON_NAME: "",
        // /pokemon/{id or name}
        POKEMON_DATA: { ... },
        // /pokemon-species/{id or name}
        POKEMON_SPECIES_DATA: { ... },
      },
      ...
    },
    ...
  },
  evolutionChains: [
    [POKEMON_NAME, POKEMON_NAME, ...],
    ...
  ]
}
*/
const initialDataState = {
  regionData: {
    kanto: {},
    johto: {},
    hoenn: {},
    sinnoh: {},
    unova: {},
    kalos: {},
    alola: {},
    galar: {}
  },
  evolutionChains: []
};

const dataReducer = (state, action) => {
  const region = action.region;
  const data = action.data;
  let updatedState = { ...state };

  switch (action.type) {
    case 'INSERT_POKEMON_DATA':
      updatedState.regionData[region][data.id] = {};
      updatedState.regionData[region][data.id].name = data.name;
      updatedState.regionData[region][data.id].pokemon_data = data;

      return updatedState;
    case 'INSERT_POKEMON_SPECIES_DATA':
      updatedState.regionData[region][data.id].pokemon_species_data = data;
      return updatedState;
    case 'INSERT_POKEMON_EVOLUTION_DATA':
      updatedState.evolutionChains.push(data);
      return updatedState;
  }

  return initialDataState;
};

const DataProvider = props => {
  const [data, dispatch] = useReducer(dataReducer, initialDataState);
  const [region, setRegion] = useState('kanto');
  const [pokemonRegionBounds, setPokemonRegionBounds] = useState({
    regionStartNumber: 1,
    regionEndNumber: 151
  });

  useEffect(() => {
    switch (region) {
      case 'kanto':
        setPokemonRegionBounds({
          regionStartNumber: 1,
          regionEndNumber: 151
        });
        break;
      case 'johto':
        setPokemonRegionBounds({
          regionStartNumber: 152,
          regionEndNumber: 251
        });
        break;
      case 'hoenn':
        setPokemonRegionBounds({
          regionStartNumber: 252,
          regionEndNumber: 386
        });
        break;
      case 'sinnoh':
        setPokemonRegionBounds({
          regionStartNumber: 387,
          regionEndNumber: 493
        });
        break;
      case 'unova':
        setPokemonRegionBounds({
          regionStartNumber: 494,
          regionEndNumber: 649
        });
        break;
      case 'kalos':
        setPokemonRegionBounds({
          regionStartNumber: 650,
          regionEndNumber: 721
        });
        break;
      case 'alola':
        setPokemonRegionBounds({
          regionStartNumber: 722,
          regionEndNumber: 809
        });
        break;
      case 'galar':
        setPokemonRegionBounds({
          regionStartNumber: 810,
          regionEndNumber: 898
        });
        break;
    }
  }, [region]);

  const regionChangeHandler = region => {
    setRegion(region);
  };

  const insertPokemonDataHandler = data => {
    dispatch({ type: 'INSERT_POKEMON_DATA', region: region, data: data });
  };

  const insertPokemonSpeciesDataHandler = data => {
    dispatch({
      type: 'INSERT_POKEMON_SPECIES_DATA',
      region: region,
      data: data
    });
  };

  const insertPokemonEvolutionsDataHandler = data => {
    dispatch({ type: 'INSERT_POKEMON_EVOLUTION_DATA', data: data });
  };

  const evolutionChainForPokemon = name => {
    return data.evolutionChains.find(chain => chain.includes(name));
  };

  const regionData = data.regionData[region];

  const pokemonDataFromId = id => {
    return regionData[id]?.pokemon_data || null;
  };

  const pokemonDataFromName = name => {
    const pokemonId = Object.keys(regionData).find(
      id => regionData[id].name === name
    );

    return pokemonDataFromId(pokemonId);
  };

  const speciesDataForPokemon = id => {
    return regionData[id]?.pokemon_species_data || null;
  };

  const ctx = {
    data: data,
    region: region,
    pokemonRegionBounds: pokemonRegionBounds,
    updateRegion: regionChangeHandler,
    pokemonDataFromId: pokemonDataFromId,
    pokemonDataFromName: pokemonDataFromName,
    pokemonEvolutionData: evolutionChainForPokemon,
    pokemonSpeciesData: speciesDataForPokemon,
    insertPokemonData: insertPokemonDataHandler,
    insertPokemonSpeciesData: insertPokemonSpeciesDataHandler,
    insertPokemonEvolutionsData: insertPokemonEvolutionsDataHandler
  };

  return (
    <DataContext.Provider value={ctx}>{props.children}</DataContext.Provider>
  );
};

export default DataProvider;
