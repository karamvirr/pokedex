const getTypeColor = type => {
  switch (type.toLowerCase()) {
    case 'grass':
      return '#78c850';
    case 'poison':
      return '#a040a0';
    case 'fire':
      return '#f08030';
    case 'flying':
      return '#a890f0';
    case 'water':
      return '#6890f0';
    case 'bug':
      return '#a8b820';
    case 'normal':
      return '#a8a878';
    case 'electric':
      return '#f8d030';
    case 'ground':
      return '#e0c068';
    case 'fairy':
      return '#ee99ac';
    case 'fighting':
      return '#c03028';
    case 'psychic':
      return '#f85888';
    case 'rock':
      return '#b8a038';
    case 'steel':
      return '#b8b8d0';
    case 'ice':
      return '#98d8d8';
    case 'ghost':
      return '#705898';
    case 'dragon':
      return '#7038f8';
    default:
      return '#000';
  }
};

const hectogramsToPounds = hectograms => {
  return hectograms / 4.536;
};

const hectogramsToKilograms = hectograms => {
  return hectograms / 10;
};

const decimetersToFeet = decimeters => {
  return decimeters / 3.048;
};

const decimetersToInches = decimeters => {
  return decimeters / 2.54;
};

const decimetersToFeetAndInches = decimeters => {
  const feet = Math.round(decimetersToFeet(decimeters));
  const inches = Math.round(decimetersToInches(decimeters));

  return [feet, inches];
};

const decimetersToMeters = decimeters => {
  return decimeters / 10;
};

const titleize = text => {
  if (text === '') {
    return text;
  }
  return text[0].toUpperCase() + text.slice(1);
};

// this function normalizes the capture rate to a percentage.
// for the given capture rate, 255 is the highest capture rate, and
// 0 is the lowest.
const normalizeCaptureRate = captureRate => {
  return ((captureRate / 255) * 100).toFixed(1);
};

export {
  getTypeColor,
  titleize,
  hectogramsToPounds,
  hectogramsToKilograms,
  decimetersToFeet,
  decimetersToMeters,
  decimetersToFeetAndInches,
  normalizeCaptureRate
};
