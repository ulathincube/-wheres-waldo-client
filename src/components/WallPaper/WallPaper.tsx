import { useEffect } from 'react';
import styles from './WallPaper.module.css';

function WallPaper() {
  useEffect(() => {
    function onMouseMove(event: MouseEvent) {
      console.log({ x: event.clientX, y: event.clientY });
    }
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);
  return <button className={styles.button}>Hey!</button>;
}

export default WallPaper;
