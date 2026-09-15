import styles from './Button.module.css';

type Props = {
  children: React.ReactNode;
  onButtonClick: () => void;
  className?: string;
  disabled?: boolean;
};

function Button({ children, onButtonClick, className, ...delegated }: Props) {
  if (className)
    return (
      <button
        onClick={(event: React.MouseEvent) => {
          event.stopPropagation();
          console.log({
            target: event.target,
            currentTarget: event.currentTarget,
          });
          onButtonClick();
        }}
        className={`${styles.button} ${styles[className]}`}
        {...delegated}
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
