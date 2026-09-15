import styles from './Overlay.module.css';

interface OverlayStyles extends React.CSSProperties {
  '--position-x': string;
  '--position-y': string;
}

interface Position {
  x: number;
  y: number;
}

type Props = {
  position: Position;
};

function Overlay({ position }: Props) {
  return (
    <div
      className={styles.wrapper}
      style={
        {
          '--position-x': `${position.x}px`,
          '--position-y': `${position.y}px`,
        } as OverlayStyles
      }
    >
      &nbsp;
    </div>
  );
}

export default Overlay;
