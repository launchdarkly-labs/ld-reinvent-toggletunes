import { createContext, useState } from "react";
import { PlaylistInterface } from "./typesInterface";

const AIGeneratedPlaylistContext = createContext({aiPlaylists: [],setAIPlaylists: ()=>{}});

export default AIGeneratedPlaylistContext;

export const AIGeneratedPlaylistProvider = ({ children }: { children: any }) => {
  const [aiPlaylists, setAIPlaylists] = useState<PlaylistInterface[]>([]);

  return (
    
    <AIGeneratedPlaylistContext.Provider
      value={{
        // @ts-ignore
        aiPlaylists,
        // @ts-ignore
        setAIPlaylists,
      }}
    >
      {children}
    </AIGeneratedPlaylistContext.Provider>
  );
};
