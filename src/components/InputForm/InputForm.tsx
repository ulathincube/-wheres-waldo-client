import styles from './InputForm.module.css';
import { createPortal } from 'react-dom';
import { saveUser } from '../../services/user';
import { useState, type ChangeEvent } from 'react';
import { memo } from 'react';

const container: HTMLElement | null = document.getElementById('modal');

type Props = {
  onHideInputForm: () => void;
};

function InputForm({ onHideInputForm }: Props) {
  const [username, setUsername] = useState<string>('');

  function onUsernameChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  async function onSubmitHandler(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const data = await saveUser(username);
      console.log({ data });
      onHideInputForm();
    } catch (error: unknown) {
      if (error instanceof Error) throw error;
    }
  }

  if (!container) return;
  return createPortal(
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.title}>Save to leaderboard</h3>
        <form onSubmit={onSubmitHandler} className={styles.form}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor='username'>
              Username
            </label>
            <input
              value={username}
              onChange={onUsernameChange}
              required={true}
              type='text'
              name='username'
              id='username'
              className={styles.field}
            />
          </div>
          <div className={styles.group}>
            <button type='submit' className={styles.submit}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </section>,
    container,
  );
}

export default memo(InputForm);
