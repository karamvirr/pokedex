import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.Header}>
      <h1>Pokédex</h1>
      <nav></nav>
      <form>{/* Form to search for Pokemon will be here. */}</form>
    </header>
  );
};

export default Header;
