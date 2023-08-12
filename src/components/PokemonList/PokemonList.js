import classes from './PokemonList.module.css';
import PokemonCard from '../PokemonCard';

const PokemonList = props => {
  const id = 1;

  const data = [];
  for (let i = 1; i <= 1; i++) {
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
