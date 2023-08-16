import ReactDOM from 'react-dom';
import classes from './PokemonModal.module.css';
import { useState, useEffect } from 'react';
import {
  titleize,
  decimetersToMeters,
  decimetersToFeetAndInches,
  hectogramsToPounds,
  hectogramsToKilograms,
  normalizeCaptureRate
} from '../../utils';
import Backdrop from '../UI/Backdrop';
import Overlay from '../UI/Overlay';
import Card from '../UI/Card';
import PokemonStatBar from '../PokemonStatBar/PokemonStatBar';

const portalElement = document.getElementById('overlays');

const generateTableRow = (label, ...args) => {
  return (
    <tr>
      <td className={classes['row-label']}>{label}</td>
      {args.map(arg => (
        <td
          key={arg}
          className={classes['row-data']}>
          {arg}
        </td>
      ))}
    </tr>
  );
};

const computeHeightText = decimeters => {
  const [feet, inches] = decimetersToFeetAndInches(decimeters);
  return `${feet}' ${inches}" (${decimetersToMeters(decimeters)}m)`;
};

const computeWeightText = hectograms => {
  const pounds = hectogramsToPounds(hectograms).toFixed(1);
  const kilograms = hectogramsToKilograms(hectograms).toFixed(1);
  return `${pounds} lbs (${kilograms} kg)`;
};

const PokemonModal = props => {
  const data = props.data;

  const [showShinySprite, setShowShinySprite] = useState(false);
  const [speciesData, setSpeciesData] = useState({});

  useEffect(() => {
    if (data.species?.url) {
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
    .map(ability => titleize(ability.ability.name))
    .join(', ');
  const types = data.types.map(type => titleize(type.type.name)).join(', ');
  const stats = {
    hp: data.stats[0].base_stat,
    attack: data.stats[1].base_stat,
    defense: data.stats[2].base_stat,
    'special-attack': data.stats[3].base_stat,
    'special-defense': data.stats[4].base_stat,
    speed: data.stats[5].base_stat
  };
  const totalStats = Object.values(stats).reduce((a, b) => a + b, 0);

  let color = null;
  let habitat = null;
  let shape = null;
  let captureRate = null;
  let japaneseName = null;
  let description = null;
  if (Object.keys(speciesData).length > 0) {
    color = speciesData.color.name;
    habitat = speciesData.habitat?.name;
    captureRate = normalizeCaptureRate(speciesData.capture_rate);
    shape = speciesData.shape.name;
    japaneseName = speciesData.names
      .filter(entry => entry.language.name === 'ja')
      .pop().name;
    description = speciesData.flavor_text_entries
      .filter(entry => entry.language.name === 'en')
      .pop().flavor_text;
  }

  const modalOverlayContent = (
    <>
      <div className={classes.sprite}>
        <p>#{data.id}</p>
        <img
          onClick={() => setShowShinySprite(previousState => !previousState)}
          className={classes['pokemon-sprite']}
          src={imageUrl}
          alt={`${data.name} sprite`}
        />
        <h1>{titleize(data.name)}</h1>
        {japaneseName && (
          <h2 className={classes['japanese-name']}>{japaneseName}</h2>
        )}
      </div>
      <div className={classes.information}>
        <section className={classes.section}>
          <h3 className={classes['section-header']}>About</h3>
          <table>
            <tbody>
              {generateTableRow('Species', titleize(data.species.name))}
              {color && generateTableRow('Color', titleize(color))}
              {habitat && generateTableRow('Habitat', titleize(habitat))}
              {shape && generateTableRow('Shape', titleize(shape))}
              {generateTableRow('Types', types)}
              {generateTableRow('Abilities', abilities)}
              {generateTableRow('Height', computeHeightText(data.height))}
              {generateTableRow('Weight', computeWeightText(data.weight))}
              {captureRate &&
                generateTableRow('Capture Rate', `${captureRate}%`)}
            </tbody>
          </table>
        </section>
        <section className={classes.section}>
          <h3 className={classes['section-header']}>Base Stats</h3>
          <table>
            <tbody>
              {generateTableRow(
                'HP',
                stats.hp,
                <PokemonStatBar value={stats.hp} />
              )}
              {generateTableRow(
                'Attack',
                stats.attack,
                <PokemonStatBar value={stats.attack} />
              )}
              {generateTableRow(
                'Defense',
                stats.defense,
                <PokemonStatBar value={stats.defense} />
              )}
              {generateTableRow(
                'Special Attack',
                stats['special-attack'],
                <PokemonStatBar value={stats['special-attack']} />
              )}
              {generateTableRow(
                'Special Defense',
                stats['special-defense'],
                <PokemonStatBar value={stats['special-defense']} />
              )}
              {generateTableRow(
                'Speed',
                stats.speed,
                <PokemonStatBar value={stats.speed} />
              )}
              {generateTableRow(
                'Total',
                <p>
                  <strong>{totalStats}</strong>
                </p>
              )}
            </tbody>
          </table>
        </section>
        {description && (
          <section className={classes.section}>
            <p className={classes.description}>{description}</p>
          </section>
        )}
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
        <Overlay>
          <Card className={classes.PokemonModal}>{modalOverlayContent}</Card>
        </Overlay>,
        portalElement
      )}
    </>
  );
};

export default PokemonModal;
