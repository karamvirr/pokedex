import classes from './RegionList.module.css';
import RegionListItem from '../RegionListItem';
import { useState } from 'react';

const RegionList = props => {
  const [selectedRegion, setSelectedRegion] = useState('Kanto');

  const regionClickHandler = event => {
    const dataset = event.target.dataset;
    setSelectedRegion(dataset.region);
    props.onRegionChange(dataset.start, dataset.end);
  };

  const listData = [
    { name: 'Kanto', start: 1, end: 151 },
    { name: 'Johto', start: 152, end: 251 },
    { name: 'Hoenn', start: 252, end: 386 },
    { name: 'Sinnoh', start: 387, end: 493 },
    { name: 'Unova', start: 494, end: 649 },
    { name: 'Kalos', start: 650, end: 721 },
    { name: 'Alola', start: 722, end: 809 },
    { name: 'Galar', start: 810, end: 898 }
  ].map(({ name, start, end }) => (
    <RegionListItem
      key={name}
      name={name}
      start={start}
      end={end}
      active={name === selectedRegion}
      onRegionChange={regionClickHandler}
    />
  ));

  return <div className={classes.RegionList}>{listData}</div>;
};

export default RegionList;
