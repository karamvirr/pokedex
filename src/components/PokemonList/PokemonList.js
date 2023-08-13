import classes from './PokemonList.module.css';
import PokemonCard from '../PokemonCard';

const PokemonList = props => {
  const data = [];
  for (let i = 1; i <= 151; i++) {
    data.push(
      <PokemonCard
        onShowModal={props.onShowModal}
        id={i}
        key={i}
      />
    );
  }

  return <main className={classes.PokemonList}>{data}</main>;
};

export default PokemonList;
