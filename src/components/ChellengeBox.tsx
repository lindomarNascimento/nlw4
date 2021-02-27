import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChellengeBox.module.css';

export function ChallengeBox() {
    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChallengesContext)
    const { resetCountdwon } = useContext(CountdownContext)

    function handleChallengeSucceded() {
        completeChallenge()
        resetCountdwon()
    } 

    function handleChallengeFailed() {
        resetChallenge()
        resetCountdwon()
    }


    return (
        <div className={styles.chellengeBoxContainer}>
            { activeChallenge ? (
                <div className={styles.challengeActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                        <img src={`icons/${activeChallenge.type}.svg`}/>
                        <strong>Novo desafio</strong>

                        <p>{activeChallenge.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={handleChallengeFailed}
                        >
                            Falhei
                        </button>
                        <button 
                            type="button"
                            className={styles.challengeSuccededButton}
                            onClick={handleChallengeSucceded}
                            >
                                Completei
                        </button>
                    </footer>
                </div>
            ) : (
                    <div className={styles.chellengeNotActive}>
                        <strong>Finalize um ciclo para receber um desafio</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level Up" />
                            Avance de level complemtando desafios
                        </p>
                    </div>
                )}


        </div>
    )
}