import styles from './WallPaper.module.css';

interface Props extends React.PropsWithChildren {
  onShowContextMenu: () => void;
  onHideContextMenu: () => void;
}

function WallPaper({ onShowContextMenu, onHideContextMenu, children }: Props) {
  return (
    <div
      onClick={(event: React.MouseEvent) => {
        event.stopPropagation();
        console.log('hello!');
      }}
      className={styles.wrapper}
    >
      <figure className={styles.box} onClick={onShowContextMenu}>
        <img
          src={'/assets/images/wheres-wally-01.webp'}
          className={styles.image}
          alt="Where's Waldo?"
        />
      </figure>
      {children}
    </div>
  );
}

export default WallPaper;
