import React from 'react';

const DataContext = React.createContext({
  data: {},
  region: 'kanto',
  pokemonRegionBounds: { regionStartNumber: 1, regionEndNumber: 151 },
  pokemonData: id => {},
  pokemonSpeciesData: id => {},
  updateRegion: region => {},
  insertPokemonData: data => {},
  insertPokemonSpeciesData: data => {}
});

export default DataContext;
