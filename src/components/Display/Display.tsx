import styles from './Display.module.css';
import { timeCounter } from '../../utils/day';

type Props = {
  position: { x: number; y: number };
  counter: number;
};

const IMAGE_WIDTH: number = 1152;
const IMAGE_HEIGHT: number = 648;

function Display({ position, counter }: Props) {
  const { innerWidth, innerHeight } = window;

  const freeSpaceHorizontal = innerWidth - IMAGE_WIDTH;
  const freeSpaceVertical = innerHeight - IMAGE_HEIGHT;

  const valueX = (position.x - 0.5 * freeSpaceHorizontal) / IMAGE_WIDTH;
  const valueY = (position.y - 0.5 * freeSpaceVertical) / IMAGE_HEIGHT;

  // console.log({ valueX, valueY });

  return (
    <div className={styles.wrapper}>
      <span className={styles.position}>x: {valueX.toFixed(2)}</span>
      <span className={styles.position}>y: {valueY.toFixed(2)}</span>
      <span className={styles.timer}>{timeCounter(counter)}</span>
    </div>
  );
}

export default Display;
