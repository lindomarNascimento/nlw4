import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';

import Challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number
}

interface challengesContextData {
    level: number;
    currentExperiencience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge,
    levelUp: () => void;
    startNewchallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

interface challengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperiencience: number;
    challengesCompleted: number
}

export const ChallengesContext = createContext({} as challengesContextData);

export function ChallengesProvider({ 
    children, 
    ...rest
}: challengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 0);
    const [currentExperiencience, setCurrentExperience] = useState(rest.currentExperiencience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level))
        Cookies.set('currentExperiencience', String(currentExperiencience))
        Cookies.set('challengesCompleted', String(challengesCompleted))

    }, [level, currentExperiencience, challengesCompleted])

    function levelUp() {
        setLevel(level + 1)
        setIsLevelUpModalOpen(true)
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false)
    }

    function startNewchallenge() {
        const randowChallengeIndex = Math.floor(Math.random() * Challenges.length)
        const challenge = Challenges[randowChallengeIndex]

        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === 'granted') {
            new Notification('Novo desafio 🎡', {
                body: `Valendo ${challenge.amount} xp!`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge

        let finalExperience = currentExperiencience + amount

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp()
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1)
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperiencience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                startNewchallenge,
                levelUp,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }} >
            {children}

            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>
    )
}
