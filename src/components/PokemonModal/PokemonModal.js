import ReactDOM from 'react-dom';
import classes from './PokemonModal.module.css';
import { useState, useEffect } from 'react';
import { titleCase } from '../../utils';
const Backdrop = props => {
  return (
    <div
      className={classes.backdrop}
      onClick={props.onClick}></div>
  );
};

const Overlay = props => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById('overlays');

const PokemonModal = props => {
  const data = props.data;

  const [showShinySprite, setShowShinySprite] = useState(false);
  const [speciesData, setSpeciesData] = useState({});
  const [evolutionChain, setEvolutionChain] = useState({});

  useEffect(() => {
    if (speciesData.evolution_chain && speciesData.evolution_chain.url) {
      fetch(speciesData.evolution_chain.url)
        .then(response => response.json())
        .then(data => {
          setEvolutionChain(data);
        })
        .catch(console.log);
    }
  }, [speciesData]);
  useEffect(() => {
    if (data.species && data.species.url) {
      fetch(data.species.url)
        .then(response => response.json())
        .then(data => {
          setSpeciesData(data);
        })
        .catch(console.log);
    }
  }, [data]);

  const imageUrl = showShinySprite
    ? data.sprites.other['official-artwork'].front_shiny
    : data.sprites.other['official-artwork'].front_default;

  const abilities = data.abilities
    .map(ability => ability.ability.name)
    .join(', ');
  const types = data.types.map(type => type.type.name).join(', ');
  const height = data.height;
  const weight = data.weight;

  const stats = {
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    'special-attack': data.stats[3].base_stat,
    'special-defense': data.stats[4].base_stat,
    speed: data.stats[5].base_stat
  };

  let summary = null;
  let captureRate = null;
  let nameJa = null;
  if (speciesData.flavor_text_entries) {
    summary = speciesData.flavor_text_entries
      .filter(entry => entry.language.name === 'en')
      .pop().flavor_text;
    captureRate = speciesData.capture_rate;
    nameJa = speciesData.names
      .filter(entry => entry.language.name === 'ja')
      .pop().name;
  }

  const modalOverlayContent = (
    <>
      <div className={classes.sprite}>
        <img
          onClick={() => setShowShinySprite(previousState => !previousState)}
          className={classes['pokemon-sprite']}
          src={imageUrl}
          alt={`${data.name} sprite`}
        />
        <h1 className={classes.name}>{titleCase(data.name)}</h1>
        {nameJa && <h2 className={classes.name}>{nameJa}</h2>}
        <p style={{ textAlign: 'center', color: 'gray' }}>#{data.id}</p>
      </div>
      <div className={classes.information}>
        <section>
          <h3>About</h3>
          <p>
            <strong>Abilities:</strong>
            <span>{abilities}</span>
          </p>
          <p>
            <strong>Types:</strong>
            <span>{types}</span>
          </p>
          <p>
            <strong>Height:</strong>
            <span>{height}</span>
          </p>
          <p>
            <strong>Weight:</strong>
            <span>{weight}</span>
          </p>
          {captureRate && (
            <p>
              <strong>Capture Rate:</strong>
              <span>{captureRate}</span>
            </p>
          )}
        </section>
        <section>
          <h3>Stats</h3>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <p>
                <strong>HP</strong>
              </p>
              <p>{stats.hp}</p>
              <div className={classes['stat-bar']}>
                <div
                  className={classes['stat-bar-fill']}
                  style={{ width: `${stats.hp}%` }}></div>
              </div>
            </div>
          </div>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <p>
                <strong>Attack</strong>
              </p>
              <p>{stats.attack}</p>
              <div className={classes['stat-bar']}>
                <div
                  className={classes['stat-bar-fill']}
                  style={{ width: `${stats.attack}%` }}></div>
              </div>
            </div>
          </div>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <p>
                <strong>Defense</strong>
              </p>
              <p>{stats.defense}</p>
              <div className={classes['stat-bar']}>
                <div
                  className={classes['stat-bar-fill']}
                  style={{ width: `${stats.defense}%` }}></div>
              </div>
            </div>
          </div>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <p>
                <strong>Special Attack</strong>
              </p>
              <p>{stats['special-attack']}</p>
              <div className={classes['stat-bar']}>
                <div
                  className={classes['stat-bar-fill']}
                  style={{ width: `${stats['special-attack']}%` }}></div>
              </div>
            </div>
          </div>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <p>
                <strong>Special Defense</strong>
              </p>
              <p>{stats['special-defense']}</p>
              <div className={classes['stat-bar']}>
                <div
                  className={classes['stat-bar-fill']}
                  style={{ width: `${stats['special-defense']}%` }}></div>
              </div>
            </div>
          </div>
          <div className={classes.stats}>
            <div className={classes.stat}>
              <p>
                <strong>Speed</strong>
              </p>
              <p>{stats.speed}</p>
              <div className={classes['stat-bar']}>
                <div
                  className={classes['stat-bar-fill']}
                  style={{ width: `${stats.speed}%` }}></div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <h3>Summary</h3>
          <p>{summary}</p>
        </section>
      </div>
    </>
  );

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onClick={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Overlay>{modalOverlayContent}</Overlay>,
        portalElement
      )}
    </>
  );
};

export default PokemonModal;
