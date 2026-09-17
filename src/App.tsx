import WallPaper from './components/WallPaper';
import ContextMenu from './components/ContextMenu';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getWallpaper, completeGame } from './services/image';
import Display from './components/Display';
import Found from './components/Found';
import Toast from './components/Toast';
import InputForm from './components/InputForm';
import LeaderBoard from './components/LeaderBoard';
import ShowBoard from './components/ShowBoard';

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
  const [showInputForm, setShowInputForm] = useState<boolean>(false);
  const [showLeaderBoard, setShowLeaderBoard] = useState<boolean>(false);

  const cachedShowInputForm = useCallback(() => setShowInputForm(true), []);
  const cachedHideInputForm = useCallback(() => setShowInputForm(false), []);

  const { innerHeight, innerWidth } = window;
  const freeSpaceHorizontal = innerWidth - IMAGE_WIDTH;
  const freeSpaceVertical = innerHeight - IMAGE_HEIGHT;

  const valueX = Number(
    ((position.x - 0.5 * freeSpaceHorizontal) / IMAGE_WIDTH).toFixed(2),
  );

  const valueY = Number(
    ((position.y - 0.5 * freeSpaceVertical) / IMAGE_HEIGHT).toFixed(2),
  );

  useEffect(() => {
    if (foundCharacters === 3) {
      const runEffect = async () => {
        const data = await completeGame(wallpaper!.id, counterSeconds);
        console.log({ data });
        cachedShowInputForm();
      };

      runEffect();
      // api request => game complete
      return;
    }

    const intervalId = setInterval(() => {
      onChangeCounter(counterSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [counterSeconds, foundCharacters, wallpaper, cachedShowInputForm]);

  useEffect(() => {
    const runEffect = async () => {
      try {
        const { data, counter } = await getWallpaper();
        const timeElapsed = Date.now() - counter;
        const timeElapsedInSeconds = Math.round(timeElapsed / 1000);
        setCounterSeconds(timeElapsedInSeconds);
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
      setPosition({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [showMenu]);

  const cachedShowContextMenu = useCallback(() => setShowMenu(true), []);

  const cachedHideContextMenu = useCallback(() => setShowMenu(false), []);

  const cachedShowLeaderBoard = useCallback(() => setShowLeaderBoard(true), []);
  const cachedHideLeaderBoard = useCallback(
    () => setShowLeaderBoard(false),
    [],
  );

  const cachedOnChangeFoundCharacters = useCallback(() => {
    const nextCount = foundCharacters + 1;
    setFoundCharacters(nextCount);
  }, [foundCharacters]);

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

  const cachedOnToastMessageChange = useCallback((newMessage: string) => {
    setToastMessage(newMessage);
    setTimeout(() => {
      setToastMessage('');
    }, 2000);
  }, []);

  const cachedWallpaper = useMemo(() => wallpaper, [wallpaper]);
  const cachedNormalizedPosition = useMemo(() => {
    return { x: valueX, y: valueY };
  }, [valueX, valueY]);

  // console.log({ counterSeconds });

  return (
    <>
      <ShowBoard onShowBoard={cachedShowLeaderBoard} />
      <WallPaper
        wallpaper={cachedWallpaper}
        onShowContextMenu={cachedShowContextMenu}
        onHideContextMenu={cachedHideContextMenu}
      >
        <Display counter={counterSeconds} />
        {count.map(countObject => (
          <Found key={JSON.stringify(countObject)} position={countObject} />
        ))}
        {/* {showMenu && <Overlay position={position} />} */}
        {showMenu && (
          <ContextMenu
            onChangeFoundCharacters={cachedOnChangeFoundCharacters}
            normalizedPosition={cachedNormalizedPosition}
            characters={wallpaper?.characters}
            imageId={wallpaper?.id}
            onToastMessageChange={cachedOnToastMessageChange}
            count={count}
            onChangeCount={onChangeCount}
            position={position}
            onHideContextMenu={cachedHideContextMenu}
            onChangeCounter={onChangeCounter}
          />
        )}

        <Toast message={toastMessage} />
      </WallPaper>
      {showLeaderBoard && <LeaderBoard onHideBoard={cachedHideLeaderBoard} />}
      {showInputForm && <InputForm onHideInputForm={cachedHideInputForm} />}
    </>
  );
}

export default App;
