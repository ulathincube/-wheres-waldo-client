import WallPaper from './components/WallPaper';
import ContextMenu from './components/ContextMenu';
import { useState, useEffect } from 'react';

function App() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

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

  function onShowContextMenu() {
    setShowMenu(true);
  }

  function onHideContextMenu() {
    setShowMenu(false);
  }

  return (
    <>
      <WallPaper onShowContextMenu={onShowContextMenu} />
      {showMenu && (
        <ContextMenu
          position={position}
          onHideContextMenu={onHideContextMenu}
        />
      )}
    </>
  );
}

export default App;
