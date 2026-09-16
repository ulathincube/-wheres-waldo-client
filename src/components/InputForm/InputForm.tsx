import styles from './InputForm.module.css';
import { createPortal } from 'react-dom';

const container: HTMLElement | null = document.getElementById('modal');

function InputForm() {
  if (!container) return;
  return createPortal(
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <h3 className={styles.title}>Save to leaderboard</h3>
        <form className={styles.form}>
          <div className={styles.group}>
            <label className={styles.label} htmlFor='username'>
              Username
            </label>
            <input
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

export default InputForm;
