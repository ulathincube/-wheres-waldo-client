import styles from './Found.module.css';
import { memo } from 'react';

type Props = {
  position: { x: number; y: number };
};

interface FoundStyles extends React.CSSProperties {
  '--position-x': string;
  '--position-y': string;
}

function Found({ position }: Props) {
  return (
    <div
      style={
        {
          '--position-x': `${position.x}px`,
          '--position-y': `${position.y}px`,
        } as FoundStyles
      }
      className={styles.wrapper}
    >
      <span className={styles.found}>
        <svg
          className={styles.icon}
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <polyline points='20 6 9 17 4 12'></polyline>
        </svg>
      </span>
    </div>
  );
}

export default memo(Found);
