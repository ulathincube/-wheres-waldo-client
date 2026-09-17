import styles from './LeaderBoard.module.css';
import { getUsers } from '../../services/user';
import { useEffect, useState } from 'react';
import { timeCounter } from '../../utils/day';

interface User {
  username: string;
  id: string;
  time: number;
}

type Props = {
  onHideBoard: () => void;
};

function LeaderBoard({ onHideBoard }: Props) {
  const [users, setUsers] = useState<null | User[]>(null);

  useEffect(() => {
    const runEffect = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error: unknown) {
        if (error instanceof Error) throw error;
      }
    };
    runEffect();
  }, []);

  if (!users) return;

  return (
    <aside className={styles.wrapper}>
      <h3 className={styles.title}>Leaderboard</h3>
      {/* <ul className={styles.list}>
        {users.map(userObject => (
          <li key={userObject.id}>
            <span className={styles.username}>{userObject.username}</span>
            <span className={styles.time}>{userObject.time}</span>
          </li>
        ))}
      </ul> */}
      <table className={styles.leaderboard}>
        <thead>
          <tr className={styles.row}>
            <th className={styles.header} scope='col'>
              Player
            </th>
            <th className={styles.data} scope='col'>
              Time
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map(userObject => (
            <tr key={userObject.id} className={styles.row}>
              <th className={styles.header} scope='row'>
                {userObject.username}
              </th>
              <td className={styles.data}>{timeCounter(userObject.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onHideBoard} className={styles.hide}>
        Hide LeaderBoard
      </button>
    </aside>
  );
}

export default LeaderBoard;
