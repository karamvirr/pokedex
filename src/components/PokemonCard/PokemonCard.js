import { useState, useEffect } from 'react';
import { titleCase, getTypeColor } from '../../utils';

import classes from './PokemonCard.module.css';

const PokemonCard = props => {
  const [name, setName] = useState('');
  const [types, setTypes] = useState([]);
  const [image_url, setImageUrl] = useState('');

  const [data, setData] = useState({});

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
      .then(response => response.json())
      .then(data => {
        setName(data.name);
        setTypes(data.types.map(type => type.type.name));
        setImageUrl(data.sprites.other['official-artwork'].front_default);
        setData(data);
      })
      .catch(console.log);
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
    <div
      onClick={() => {
        props.onShowModal(data);
      }}
      className={classes.PokemonCard}>
      <div className={classes.information}>
        <p>#{props.id}</p>
        <h2>{titleCase(name)}</h2>
        <div className={classes.types}>{typeCards}</div>
      </div>
      <div className={classes.sprite}>
        <img
          className={classes['pokemon-sprite']}
          src={image_url}
          alt={`${name} sprite`}
        />
      </div>
    </div>
  );
};

export default PokemonCard;
