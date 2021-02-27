import { useRouter } from 'next/router';
import { useCallback } from 'react';
import styles from '../styles/components/SideBar.module.css';

export const SideBar: React.FC = () => {
  const router = useRouter();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      router.push('/login');
    },
    [router],
  );

  return (
    <div className={styles.sideBar}>
      <span>
        <img src="/icons/LogoIcon.svg" alt="MoveIt" />
      </span>
      <button type="button" onClick={handleSubmit}>
        <img src="/icons/home.svg" alt="MoveIt" />
      </button>
      <span> </span>
    </div>
  );
};
