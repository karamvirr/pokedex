import RegionList from '../RegionList/RegionList';
import classes from './Header.module.css';

const Header = props => {
  return (
    <header className={classes.Header}>
      <h1>Pokédex</h1>
      <RegionList onRegionChange={props.onRegionChange} />
    </header>
  );
};

export default Header;
