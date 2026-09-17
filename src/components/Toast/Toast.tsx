import styles from './Toast.module.css';
import { memo } from 'react';

type Props = {
  message: string;
};

function Toast({ message }: Props) {
  if (!message) return;
  return <div className={styles.toast}>{message}</div>;
}

export default memo(Toast);
