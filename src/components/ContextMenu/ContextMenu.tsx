import styles from './ContextMenu.module.css';
import Button from '../Button';
import { findCharacter } from '../../services/image';
import includesValue from '../../utils/includesValue';

interface ContextStyles extends React.CSSProperties {
  '--position-x': string;
  '--position-y': string;
}

const IMAGE_URL = '/assets/images/character-01.webp';

interface Character {
  url: string;
  name: string;
  id: string;
  position_x: number;
  position_y: number;
}

type Props = {
  characters?: Character[];
  onToastMessageChange: (newMessage: string) => void;
  count: {
    x: number;
    y: number;
    characterId: number;
  }[];
  onHideContextMenu: () => void;
  position: { x: number; y: number };
  onChangeCount: (newCount: {
    x: number;
    y: number;
    characterId: number;
  }) => void;
};

function ContextMenu({
  characters,
  onToastMessageChange,
  onHideContextMenu,
  position,
  onChangeCount,
  count,
}: Props) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  async function handleOptionClick(characterId: number) {
    onHideContextMenu();
    try {
      const result = await findCharacter({
        characterId,
        position,
        wallpaperId: 1,
        dimensions: {
          width,
          height,
        },
      });
      if (result.data) {
        // fix characterId
        onChangeCount({ ...position, characterId: 1 });
        // state update, found
      } else {
        // keep looking!
        onToastMessageChange('Keep looking!');
      }
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
          disabled={includesValue(count, 1)}
          className='context'
          onButtonClick={() => handleOptionClick(1)}
        >
          <span className={styles.caption}>
            <img className={styles.image} src={IMAGE_URL} alt='Character One' />
          </span>
          <span className={styles.option}>Character One</span>
        </Button>
      </li>
      <li>
        <Button
          disabled={includesValue(count, 2)}
          className='context'
          onButtonClick={() => handleOptionClick(2)}
        >
          <span className={styles.caption}>
            <img
              className={styles.image}
              src={IMAGE_URL.replace('1', '2')}
              alt='Character One'
            />
          </span>
          <span className={styles.option}>Character Two</span>
        </Button>
      </li>
      <li>
        <Button
          disabled={includesValue(count, 3)}
          className='context'
          onButtonClick={() => handleOptionClick(3)}
        >
          <span className={styles.caption}>
            <img
              className={styles.image}
              src={IMAGE_URL.replace('1', '3')}
              alt='Character One'
            />
          </span>
          <span className={styles.option}>Character Three</span>
        </Button>
      </li>
    </ul>
  );
}

export default ContextMenu;
