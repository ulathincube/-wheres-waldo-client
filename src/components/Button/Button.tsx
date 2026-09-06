import styles from './Button.module.css';

type Props = {
  children: React.ReactNode;
  onButtonClick: () => void;
  className?: string;
};

function Button({ children, onButtonClick, className }: Props) {
  if (className)
    return (
      <button
        onClick={onButtonClick}
        className={`${styles.button} ${styles[className]}`}
      >
        {children}
      </button>
    );
  return (
    <button onClick={onButtonClick} className={styles.button}>
      {children}
    </button>
  );
}

export default Button;
