import styles from './ContextMenu.module.css';
import Button from '../Button';
import { findCharacter } from '../../services/image';
import includesValue from '../../utils/includesValue';

interface ContextStyles extends React.CSSProperties {
  '--position-x': string;
  '--position-y': string;
}

interface Character {
  url: string;
  name: string;
  id: string;
  position_x: number;
  position_y: number;
}

type Props = {
  characters?: Character[];
  onChangeFoundCharacters: () => void;
  imageId?: string;
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
  normalizedPosition: {
    x: number;
    y: number;
  };
  onChangeCounter: (newCounter: number) => void;
};

function ContextMenu({
  imageId,
  characters,
  onChangeFoundCharacters,
  onToastMessageChange,
  onHideContextMenu,
  position,
  onChangeCount,
  count,
  normalizedPosition,
  onChangeCounter,
}: Props) {
  async function handleOptionClick(characterId: string, wallpaperId: string) {
    // console.log({ valueX, valueY });
    onHideContextMenu();
    try {
      const result = await findCharacter({
        characterId,
        position: normalizedPosition,
        wallpaperId,
      });
      if (result.data) {
        // fix characterId
        onChangeCount({ ...position, characterId: 1 });
        onChangeFoundCharacters();

        // state update, found
      } else {
        // keep looking!
        onToastMessageChange('Keep looking!');
      }
      onChangeCounter(result.counter);
    } catch (error) {
      console.log({ error });
    }
  }

  if (!imageId) return;

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
      {/* <li>
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
      </li> */}
      {characters?.map(characterObject => (
        <li key={characterObject.id} className={styles.item}>
          <Button
            className='context'
            onButtonClick={() => handleOptionClick(characterObject.id, imageId)}
          >
            <span className={styles.caption}>
              <img
                className={styles.image}
                src={characterObject.url}
                alt={characterObject.name}
              />
            </span>
            <span className={styles.option}>{characterObject.name}</span>
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default ContextMenu;
