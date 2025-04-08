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
  togglePlayer?: () => void;
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
      ...playerState,
      coverSrc,
      title,
      artist,
      audioSrc,
      tracks,
      currentTrackIndex: trackIndex,
    };

    setPlayerState(newState);
    localStorage.setItem("bookShelfPlayerState", JSON.stringify(newState));
  }

  function nextTrack() {
    const { tracks, currentTrackIndex } = playerState;
    if (!tracks || currentTrackIndex >= tracks.length - 1) return;

    const newIndex = currentTrackIndex + 1;
    const { name, fileUrl } = tracks[newIndex];

    const updatedState = {
      ...playerState,
      title: name,
      audioSrc: fileUrl,
      currentTrackIndex: newIndex,
      isActive: true,
    };

    setPlayerState(updatedState);
    localStorage.setItem("bookShelfPlayerState", JSON.stringify(updatedState));
  }
  function prevTrack() {
    const { tracks, currentTrackIndex } = playerState;
    if (!tracks || currentTrackIndex <= 0) return;

    const newIndex = currentTrackIndex - 1;
    const { name, fileUrl } = tracks[newIndex];

    const updatedState = {
      ...playerState,
      title: name,
      audioSrc: fileUrl,
      currentTrackIndex: newIndex,
    };

    setPlayerState(updatedState);
    localStorage.setItem("bookShelfPlayerState", JSON.stringify(updatedState));
  }

  function togglePlayer() {
    setPlayerState((prev) => {
      const updated = { ...prev, isActive: !prev.isActive };
      localStorage.setItem("bookShelfPlayerState", JSON.stringify(updated));
      return updated;
    });
  }

  return (
    <PlayerContext.Provider
      value={{
        ...playerState,
        playAudio,
        nextTrack,
        prevTrack,
        togglePlayer,
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
