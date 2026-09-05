// import styles from './WallPaper.module.css';
import Button from '../Button';

type Props = {
  onShowContextMenu: () => void;
};

function WallPaper({ onShowContextMenu }: Props) {
  return <Button onButtonClick={onShowContextMenu}>Hey</Button>;
}

export default WallPaper;
