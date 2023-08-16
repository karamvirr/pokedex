import classes from './PokemonList.module.css';
import PokemonCard from '../PokemonCard';

const PokemonList = props => {
  const data = [];

  for (
    let i = props.data.regionStartNumber;
    i <= props.data.regionEndNumber;
    i++
  ) {
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
