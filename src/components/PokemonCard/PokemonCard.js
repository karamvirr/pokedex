import { useState, useEffect } from 'react';
import { titleize, getTypeColor } from '../../utils';

import classes from './PokemonCard.module.css';
import Card from '../UI/Card';

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
    <Card
      className={classes.PokemonCard}
      onClick={() => {
        props.onShowModal(data);
      }}>
      <div className={classes.information}>
        <p>#{props.id}</p>
        <h2>{titleize(name)}</h2>
        <div className={classes.types}>{typeCards}</div>
      </div>
      <div className={classes.sprite}>
        <img
          className={classes['pokemon-sprite']}
          src={image_url}
          alt={`${name} sprite`}
        />
      </div>
    </Card>
  );
};

export default PokemonCard;
