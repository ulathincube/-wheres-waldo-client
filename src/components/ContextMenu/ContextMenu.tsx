import styles from './ContextMenu.module.css';
import Button from '../Button';

interface ContextStyles extends React.CSSProperties {
  '--position-x': string;
  '--position-y': string;
}

type Props = {
  onHideContextMenu: () => void;
  position: { x: number; y: number };
};

function ContextMenu({ onHideContextMenu, position }: Props) {
  return (
    <ul
      className={styles.wrapper}
      style={
        {
          '--position-x': `${position.x}px`,
          '--position-y': `${position.y}px`,
        } as ContextStyles
      }
    >
      <li>
        <Button onButtonClick={onHideContextMenu}>Option One</Button>
      </li>
      <li>
        <Button onButtonClick={onHideContextMenu}>Option Two</Button>
      </li>
      <li>
        <Button onButtonClick={onHideContextMenu}>Option Three</Button>
      </li>
    </ul>
  );
}

export default ContextMenu;
