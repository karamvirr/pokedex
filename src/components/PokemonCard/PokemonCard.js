import classes from './PokemonCard.module.css';
import Card from '../UI/Card';
import DataContext from '../../store/data-context';

import { useState, useEffect, useContext } from 'react';
import { titleize, formatId, getTypeColor } from '../../utils';

const PokemonCard = props => {
  const ctx = useContext(DataContext);
  const data = ctx.pokemonData(props.id);

  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);
  const [image_url, setImageUrl] = useState('');

  const setStateFromData = pokemonData => {
    setName(pokemonData.name);
    setTypes(pokemonData.types.map(type => type.type.name));
    setImageUrl(pokemonData.sprites.other['official-artwork'].front_default);
  };

  useEffect(() => {
    if (data) {
      console.log('cache hit!');
      setStateFromData(data);
    } else {
      fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
        .then(response => response.json())
        .then(data => {
          console.log('fetched data from API!');
          ctx.insertPokemonData(data);
          setStateFromData(data);
        })
        .catch(console.log);
    }
  }, []);

  const typeCards = types.map(type => (
    <p
      className={classes.type}
      style={{ backgroundColor: getTypeColor(type) }}
      key={type}>
      {type}
    </p>
  ));

  return (
    <Card
      className={classes.PokemonCard}
      onClick={() => {
        props.onShowModal(data);
      }}>
      <div className={classes.information}>
        <p>{formatId(props.id)}</p>
        <h2>{titleize(name)}</h2>
        <div className={classes.types}>{typeCards}</div>
      </div>
      <div className={classes.sprite}>
        <img
          className={classes['pokemon-sprite']}
          src={image_url}
          alt={`${name} sprite`}
          loading='lazy'
        />
      </div>
    </Card>
  );
};

export default PokemonCard;
