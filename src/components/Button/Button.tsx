import styles from './Button.module.css';

type Props = {
  children: React.ReactNode;
  onButtonClick: () => void;
};

function Button({ children, onButtonClick }: Props) {
  return (
    <button onClick={onButtonClick} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;
