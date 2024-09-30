import { createContext, useState } from "react";
import { AIPlaylistInterface } from "./typesInterface";

const AIGeneratedPlaylistContext = createContext();

export default AIGeneratedPlaylistContext;

export const AIGeneratedPlaylistProvider = ({ children }: { children: any }) => {
  const [aiPlaylists, setAIPlaylists] = useState<AIPlaylistInterface[]>([]);

  return (
    <AIGeneratedPlaylistContext.Provider
      value={{
        aiPlaylists,
        setAIPlaylists,
      }}
    >
      {children}
    </AIGeneratedPlaylistContext.Provider>
  );
};
