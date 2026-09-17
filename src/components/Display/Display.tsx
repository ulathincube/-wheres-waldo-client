import styles from './Display.module.css';
import { timeCounter } from '../../utils/day';
import { memo } from 'react';

type Props = {
  counter: number;
};

function Display({ counter }: Props) {
  console.log({ status: 'rendering', counter });
  return (
    <div className={styles.wrapper}>
      <span className={styles.timer}>{timeCounter(counter)}</span>
    </div>
  );
}

export default memo(Display);
