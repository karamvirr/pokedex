import classes from './RegionListItem.module.css';

const RegionListItem = props => {
  const classList = `${classes.RegionListItem} ${
    props.active ? classes.selected : ''
  }`;

  return (
    <div
      className={classList}
      data-region={props.name}
      data-start={props.start}
      data-end={props.end}
      onClick={props.onRegionChange}>
      <h3>{props.name}</h3>
    </div>
  );
};

export default RegionListItem;
