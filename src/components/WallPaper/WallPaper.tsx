import styles from './WallPaper.module.css';

type Props = {
  onShowContextMenu: () => void;
};

function WallPaper({ onShowContextMenu }: Props) {
  return (
    <div className={styles.wrapper}>
      <figure className={styles.box} onClick={onShowContextMenu}>
        <img
          src={'/assets/images/wheres-wally-01.webp'}
          className={styles.image}
          alt="Where's Waldo?"
        />
      </figure>
    </div>
  );
}

export default WallPaper;
