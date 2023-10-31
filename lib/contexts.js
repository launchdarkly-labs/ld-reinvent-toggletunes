import { createContext, useState } from "react";

const ScoreboardContext = createContext();

export default ScoreboardContext;

export const ScoreboardProvider = ({children}) => {

  }

return (
    <ScoreboardContext.Provider value ={{greenProgress, setGreenProgress, updateScore, isTimerRunning, winnerState, resetScores}}>
    {children}
    </ScoreboardContext.Provider>
)