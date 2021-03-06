import { createContext, ReactNode, useState, useContext, useEffect } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    resetCountdwon: () => void;
    startCountdown:() => void;
}

interface countdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData)

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children  }: countdownProviderProps) {
    const { startNewchallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60)
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60);

    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    function resetCountdwon() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setHasFinished(false);
        setTime(25 * 60)
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        } else if (isActive && time == 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewchallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider  value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            resetCountdwon,
            startCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}