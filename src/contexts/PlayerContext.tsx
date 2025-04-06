import { createContext, useContext, useState } from "react";

interface AudioTrack {
  id: number;
  fileUrl: string;
  name: string;
  fileSize: number;
  duration: number;
}

interface PlayerContextType {
  coverSrc: string;
  title: string;
  artist: string;
  audioSrc: string;
  isActive: boolean;
  tracks: AudioTrack[];
  currentTrackIndex: number;
  playAudio?: (
    coverSrc: string,
    title: string,
    artist: string,
    audioSrc: string,
    tracks: AudioTrack[],
    trackIndex: number
  ) => void;
  nextTrack?: () => void;
  prevTrack?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }) {
  const [playerState, setPlayerState] = useState<PlayerContextType>(() => {
    const savedState = localStorage.getItem("bookShelfPlayerState");
    return savedState
      ? JSON.parse(savedState)
      : {
          coverSrc: "",
          title: "",
          artist: "",
          audioSrc: "",
          isActive: false,
          tracks: [],
          currentTrackIndex: 0,
        };
  });

  function playAudio(
    coverSrc: string,
    title: string,
    artist: string,
    audioSrc: string,
    tracks: AudioTrack[],
    trackIndex: number
  ) {
    const newState: PlayerContextType = {
      coverSrc,
      title,
      artist,
      audioSrc,
      isActive: true,
      tracks,
      currentTrackIndex: trackIndex,
    };

    setPlayerState(newState);
    localStorage.setItem("bookShelfPlayerState", JSON.stringify(newState));
  }

  function nextTrack() {
    if (!playerState.tracks) return;

    if (playerState.currentTrackIndex < playerState.tracks.length - 1) {
      const newIndex = playerState.currentTrackIndex + 1;
      const nextTrack = playerState.tracks[newIndex];

      setPlayerState((prev) => ({
        ...prev,
        title: nextTrack.name,
        audioSrc: nextTrack.fileUrl,
        currentTrackIndex: newIndex,
        isActive: true,
      }));

      localStorage.setItem(
        "bookShelfPlayerState",
        JSON.stringify({
          ...playerState,
          title: nextTrack.name,
          audioSrc: nextTrack.fileUrl,
          currentTrackIndex: newIndex,
          isActive: true,
        })
      );
    }
  }

  function prevTrack() {
    if (!playerState.tracks) return;

    if (playerState.currentTrackIndex > 0) {
      const newIndex = playerState.currentTrackIndex - 1;
      const prevTrack = playerState.tracks[newIndex];

      setPlayerState((prev) => ({
        ...prev,
        title: prevTrack.name,
        audioSrc: prevTrack.fileUrl,
        currentTrackIndex: newIndex,
        isActive: true,
      }));

      localStorage.setItem(
        "bookShelfPlayerState",
        JSON.stringify({
          ...playerState,
          title: prevTrack.name,
          audioSrc: prevTrack.fileUrl,
          currentTrackIndex: newIndex,
          isActive: true,
        })
      );
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        ...playerState,
        playAudio,
        nextTrack,
        prevTrack,
        hasNext:
          (playerState.tracks || []).length > 0 &&
          playerState.currentTrackIndex < (playerState.tracks || []).length - 1,
        hasPrev:
          (playerState.tracks || []).length > 0 &&
          playerState.currentTrackIndex > 0,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
