import Head from 'next/head'
import { GetServerSideProps } from 'next';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompleteChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChellengeBox';
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesProvider } from '../contexts/ChallengesContext';

import styles from '../styles/pages/Home.module.css';

interface homeProps {
  level:number;
  currentExperiencience:number;
  challengesCompleted:number
}

export default function Home(props: homeProps) {
  console.log(props);

  return (
    <ChallengesProvider 
      level={props.level}
      currentExperiencience={props.currentExperiencience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>

          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    level,
    currentExperiencience,
    challengesCompleted
  } = ctx.req.cookies;


  return {
    props: {
      level: Number(level),
      currentExperiencience: Number(currentExperiencience),
      challengesCompleted: Number(challengesCompleted)
    }
  }
}

