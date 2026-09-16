import WallPaper from './components/WallPaper';
import ContextMenu from './components/ContextMenu';
import { useState, useEffect } from 'react';
import Overlay from './components/Overlay';
import { getWallpaper } from './services/image';
import Display from './components/Display';
import Found from './components/Found';
import Toast from './components/Toast';

const IMAGE_WIDTH = 1152;
const IMAGE_HEIGHT = 648;

interface WallpaperData {
  url: string;
  name: string;
  id: string;
  characters: {
    url: string;
    name: string;
    id: string;
    position_x: number;
    position_y: number;
  }[];
}

type WallPaper = WallpaperData | null;

function App() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [count, setCount] = useState<
    { x: number; y: number; characterId: number }[]
  >([]);
  const [wallpaper, setWallpaper] = useState<WallPaper>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [counterSeconds, setCounterSeconds] = useState<number>(0);
  const [foundCharacters, setFoundCharacters] = useState<number>(0);

  const { innerHeight, innerWidth } = window;
  const freeSpaceHorizontal = innerWidth - IMAGE_WIDTH;
  const freeSpaceVertical = innerHeight - IMAGE_HEIGHT;

  const valueX = Number(
    ((position.x - 0.5 * freeSpaceHorizontal) / IMAGE_WIDTH).toFixed(2),
  );

  const valueY = Number(
    ((position.y - 0.5 * freeSpaceVertical) / IMAGE_HEIGHT).toFixed(2),
  );

  console.log({ freeSpaceHorizontal, freeSpaceVertical, valueX, valueY });

  useEffect(() => {
    if (foundCharacters === 3) return;

    const intervalId = setInterval(() => {
      onChangeCounter(counterSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [counterSeconds, foundCharacters]);

  useEffect(() => {
    const runEffect = async () => {
      try {
        const { data, counter } = await getWallpaper();
        setCounterSeconds(counter);
        setWallpaper(data);
      } catch (error: unknown) {
        if (error instanceof Error) throw error;
      }
    };
    runEffect();
  }, []);

  useEffect(() => {
    if (showMenu) return;
    function onMouseMove(event: MouseEvent) {
      // console.log({
      //   x: event.clientX / window.innerWidth,
      //   y: event.clientY / window.innerHeight,
      // });

      setPosition({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [showMenu]);

  function onShowContextMenu() {
    setShowMenu(true);
  }

  function onHideContextMenu() {
    setShowMenu(false);
  }

  function onChangeFoundCharacters() {
    const nextCount = foundCharacters + 1;
    setFoundCharacters(nextCount);
  }

  function onChangeCount(newCount: {
    x: number;
    y: number;
    characterId: number;
  }) {
    setCount([...count, newCount]);
  }

  function onChangeCounter(newCounter: number) {
    setCounterSeconds(newCounter);
  }

  function onToastMessageChange(newMessage: string) {
    setToastMessage(newMessage);
    setTimeout(() => {
      setToastMessage('');
    }, 2000);
  }

  return (
    <>
      <WallPaper
        wallpaper={wallpaper}
        onShowContextMenu={onShowContextMenu}
        onHideContextMenu={onHideContextMenu}
      >
        <Display counter={counterSeconds} position={position} />
        {count.map(countObject => (
          <Found key={JSON.stringify(countObject)} position={countObject} />
        ))}
        {showMenu && <Overlay position={position} />}
        {showMenu && (
          <ContextMenu
            onChangeFoundCharacters={onChangeFoundCharacters}
            normalizedPosition={{ x: valueX, y: valueY }}
            characters={wallpaper?.characters}
            imageId={wallpaper?.id}
            onToastMessageChange={onToastMessageChange}
            count={count}
            onChangeCount={onChangeCount}
            position={position}
            onHideContextMenu={onHideContextMenu}
            onChangeCounter={onChangeCounter}
          />
        )}
        <Toast message={toastMessage} />
      </WallPaper>
    </>
  );
}

export default App;
