import styles from '../styles/components/Profile.module.css';

export const Profile: React.FC = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/renatodth.png" alt="Renato Castro" />
      <div>
       <strong>Renato Castro</strong>
        <p>
         <img src="icons/level.svg" alt="Level" />
         Level 1
        </p> 
      </div>
    </div>
  )
}