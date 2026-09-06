import styles from './WallPaper.module.css';
import Button from '../Button';

type Props = {
  onShowContextMenu: () => void;
};

function WallPaper({ onShowContextMenu }: Props) {
  return (
    <Button onButtonClick={onShowContextMenu}>
      {/* <img
        src='/assets/images/waldo-images-01.jpeg'
        alt="Where's Waldo 01"
        className={styles.wallpaper}
      /> */}
    </Button>
  );
}

export default WallPaper;
