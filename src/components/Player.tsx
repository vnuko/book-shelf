import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { usePlayer } from "../contexts/PlayerContext";

interface PlayerProps {
  coverSrc: string;
  title: string;
  artist: string;
  audioSrc: string;
  isActive: boolean;
  nextTrack?: () => void;
  prevTrack?: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

interface PlayerBookmarkProps {
  onClick: (event: React.SyntheticEvent) => void;
}

function PlayerContainer({
  coverSrc,
  title,
  artist,
  audioSrc,
  isActive,
  nextTrack,
  prevTrack,
  hasNext,
  hasPrev,
}: PlayerProps) {
  return (
    <div className={`player ${isActive ? "player--active" : ""}`}>
      {coverSrc ? (
        <div className="player-cover">
          <img src={coverSrc} alt={title} />
        </div>
      ) : null}
      <div className="player-content">
        <span className="player-track">
          <b className="player-title">{title}</b>
          <span className="player-artist">{artist}</span>
        </span>
        {audioSrc ? (
          <AudioPlayer
            src={audioSrc}
            showJumpControls={false}
            showSkipControls={true}
            layout="stacked-reverse"
            customAdditionalControls={[]}
            customVolumeControls={[]}
            autoPlayAfterSrcChange={true}
            customProgressBarSection={[
              RHAP_UI.PROGRESS_BAR,
              RHAP_UI.CURRENT_TIME,
              RHAP_UI.VOLUME,
              <a
                href="release.html"
                className="rhap_custom_playlist-btn"
                aria-label="Playlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24">
                  <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 2C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10z"></path>
                  <path d="M5.024 12.655h3.92v1.887h-3.92zM10.905 12.655h3.918v1.887h-3.918zM5.021 8.881h9.802v1.887H5.021zM5.024 5.107h5.881v1.887H5.024zM12.865 5.107h1.96v1.887h-1.96z"></path>
                </svg>
              </a>,
            ]}
            onClickNext={hasNext ? nextTrack : undefined}
            onClickPrevious={hasPrev ? prevTrack : undefined}
          />
        ) : null}
      </div>
    </div>
  );
}

function PlayerBookmark({ onClick }: PlayerBookmarkProps) {
  return (
    <button className="player-btn" type="button" onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24">
        <path d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm4.126-8.254c.213-.153.397-.348.54-.575.606-.965.365-2.27-.54-2.917L10.07 5.356A1.887 1.887 0 0 0 8.972 5C7.883 5 7 5.941 7 7.102v5.796c0 .417.116.824.334 1.17.607.965 1.832 1.222 2.737.576l4.055-2.898zm-5.2-4.616l4.055 2.898-4.056 2.897V7.13z"></path>
      </svg>
      Player
    </button>
  );
}

export default function Player() {
  const {
    coverSrc,
    title,
    artist,
    audioSrc,
    isActive,
    nextTrack,
    prevTrack,
    hasNext,
    hasPrev,
  } = usePlayer();

  return (
    <>
      <PlayerContainer
        coverSrc={coverSrc}
        title={title}
        artist={artist}
        audioSrc={audioSrc}
        isActive={isActive}
        nextTrack={nextTrack}
        prevTrack={prevTrack}
        hasNext={hasNext}
        hasPrev={hasPrev}
      />
    </>
  );
}
