import classes from './App.module.css';
import Header from './components/Header';
import PokemonList from './components/PokemonList';

import { useState } from 'react';
import PokemonModal from './components/PokemonModal/PokemonModal';

const App = () => {
  const [modalData, setModalData] = useState({});

  const showModalHandler = pokemonData => {
    setModalData(pokemonData);
  };

  const dismissModalHandler = () => {
    setModalData({});
  };

  const modalIsOpen = Object.keys(modalData).length > 0;

  return (
    <div className={classes.App}>
      {modalIsOpen && (
        <PokemonModal
          data={modalData}
          onClose={dismissModalHandler}
        />
      )}
      <Header />
      <PokemonList onShowModal={showModalHandler} />
    </div>
  );
};

export default App;
