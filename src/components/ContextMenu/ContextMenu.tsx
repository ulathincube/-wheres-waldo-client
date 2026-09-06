import styles from './ContextMenu.module.css';
import Button from '../Button';
import { findCharacter } from '../../services/image';

interface ContextStyles extends React.CSSProperties {
  '--position-x': string;
  '--position-y': string;
}

type Props = {
  onHideContextMenu: () => void;
  position: { x: number; y: number };
};

function ContextMenu({ onHideContextMenu, position }: Props) {
  async function handleOptionClick(character: string) {
    onHideContextMenu();
    try {
      const response = await findCharacter({ character, position, imageId: 1 });
      console.log(response);
    } catch (error) {
      console.log({ error });
    }
  }
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
        <Button
          className='context'
          onButtonClick={() => handleOptionClick('waldo')}
        >
          Option One
        </Button>
      </li>
      <li>
        <Button
          className='context'
          onButtonClick={() => handleOptionClick('morty')}
        >
          Option Two
        </Button>
      </li>
      <li>
        <Button
          className='context'
          onButtonClick={() => handleOptionClick('robocop')}
        >
          Option Three
        </Button>
      </li>
    </ul>
  );
}

export default ContextMenu;
