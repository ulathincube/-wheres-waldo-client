import styles from './ShowBoard.module.css';

type Props = {
  onShowBoard: () => void;
};

function ShowBoard({ onShowBoard }: Props) {
  return (
    <div className={styles.wrapper}>
      <button onClick={onShowBoard} className={styles.show}>
        Show LeaderBoard
      </button>
    </div>
  );
}

export default ShowBoard;
