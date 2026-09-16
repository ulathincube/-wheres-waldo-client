import styles from './WallPaper.module.css';

interface Wallpaper {
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

interface Props extends React.PropsWithChildren {
  onShowContextMenu: () => void;
  onHideContextMenu: () => void;
  wallpaper: Wallpaper | null;
}

function WallPaper({
  onShowContextMenu,
  // onHideContextMenu,
  children,
  wallpaper,
}: Props) {
  if (!wallpaper) return;

  return (
    <div
      onClick={(event: React.MouseEvent) => {
        event.stopPropagation();
      }}
      className={styles.wrapper}
    >
      <figure className={styles.box} onClick={onShowContextMenu}>
        <img
          src={wallpaper.url}
          className={styles.image}
          alt={wallpaper.name}
        />
      </figure>
      {children}
    </div>
  );
}

export default WallPaper;
