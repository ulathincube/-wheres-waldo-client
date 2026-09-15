import WallPaper from './components/WallPaper';
import ContextMenu from './components/ContextMenu';
import { useState, useEffect } from 'react';
import Overlay from './components/Overlay';
import { getWallpaper } from './services/image';
import Display from './components/Display';
import Found from './components/Found';
import Toast from './components/Toast';

function App() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [count, setCount] = useState<
    { x: number; y: number; characterId: number }[]
  >([]);

  const [toastMessage, setToastMessage] = useState<string>('');

  useEffect(() => {
    const runEffect = async () => {
      await getWallpaper();
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

  function onChangeCount(newCount: {
    x: number;
    y: number;
    characterId: number;
  }) {
    setCount([...count, newCount]);
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
        onShowContextMenu={onShowContextMenu}
        onHideContextMenu={onHideContextMenu}
      >
        <Display position={position} />
        {count.map(countObject => (
          <Found key={JSON.stringify(countObject)} position={countObject} />
        ))}
        {showMenu && <Overlay position={position} />}
        {showMenu && (
          <ContextMenu
            onToastMessageChange={onToastMessageChange}
            count={count}
            onChangeCount={onChangeCount}
            position={position}
            onHideContextMenu={onHideContextMenu}
          />
        )}
        <Toast message={toastMessage} />
      </WallPaper>
    </>
  );
}

export default App;
