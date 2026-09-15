import styles from './Toast.module.css';

type Props = {
  message: string;
};

function Toast({ message }: Props) {
  if (!message) return;
  return <div className={styles.toast}>{message}</div>;
}

export default Toast;
