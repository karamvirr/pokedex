import ReactDOM from 'react-dom';
import classes from './PokemonModal.module.css';

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

  const modalOverlayContent = (
    <div className={classes.content}>
      <div className={classes.sprite}></div>
      <div className={classes.information}>
        <p>
          <strong>Summary: </strong>
          <span></span>
        </p>
      </div>
    </div>
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
