import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.Header}>
      <h1>PokéDex</h1>
      <nav>
        {/* If you're planning to add other navigational links, they can go here. */}
      </nav>
      <form>{/* Form to search for Pokemon will be here. */}</form>
      {/* Another filter form can also go here in the future. */}
    </header>
  );
};

export default Header;
