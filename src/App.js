import classes from './App.module.css';
import Header from './components/Header';
import PokemonList from './components/PokemonList';

import { useState } from 'react';
import PokemonModal from './components/PokemonModal/PokemonModal';

const App = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const showModalHandler = pokemonData => {
    console.log('data', pokemonData);
    setModalIsOpen(true);
  };

  return (
    <div className={classes.App}>
      {modalIsOpen && <PokemonModal onClose={() => setModalIsOpen(false)} />}
      <Header />
      <PokemonList onShowModal={showModalHandler} />
    </div>
  );
};

export default App;
