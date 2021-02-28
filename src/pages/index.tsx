import Head from 'next/head';
import React from 'react';
import { GetServerSideProps } from 'next';
import {
  ChallengeBox,
  CompletedChallenges,
  Countdown,
  ExperienceBar,
  Profile,
  SideBar,
} from '../components';
import { ChallengesProvider, CountdownProvider } from '../contexts';
import styles from '../styles/pages/Home.module.css';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  // eslint-disable-next-line react/no-unused-prop-types
  user: string;
}

const Home: React.FC<HomeProps> = (props: HomeProps) => {
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.containerTotal}>
        <SideBar />

        <div className={styles.container}>
          <Head>
            <title>Início | move.it</title>
          </Head>

          <ExperienceBar />

          <CountdownProvider>
            <section>
              <div>
                <Profile />
                <CompletedChallenges />
                <Countdown />
              </div>
              <div>
                <ChallengeBox />
              </div>
            </section>
          </CountdownProvider>
        </div>
      </div>
    </ChallengesProvider>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    level,
    currentExperience,
    challengesCompleted,
    user,
  } = ctx.req.cookies;

  if (user === undefined) {
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};

export default Home;
