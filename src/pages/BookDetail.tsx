import Breadcrumb from "../components/Breadcrumb";
import trackCover from "../assets/track-item-cover.svg";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import BookSvg from "./../assets/book.svg";
import { usePlayer } from "../contexts/PlayerContext";

interface Track {
  title: string;
  artist: string;
  img: string;
  url: string;
  duration: string;
}

interface Document {
  title: string;
  artist: string;
  url: string;
  duration: string;
}

interface AlbumProps {
  cover: string;
  tracks: Track[];
  documents: Document[];
  price: number;
  trackCount: number;
  listeners: number;
}

function BookDetail() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVICE_API_BASE_URL = import.meta.env.VITE_SERVICE_API_BASE_URL;

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`${SERVICE_API_BASE_URL}/books/${bookId}`);
        const result = await response.json();

        if (result.success) {
          setBook(result.data);
        } else {
          setError("Failed to load book details.");
        }
      } catch (err) {
        setError("An error occurred while fetching book details.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [bookId]);

  if (loading) return <p>Loading author details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="row row--grid">
      <Breadcrumb
        items={[
          { name: "Discover", url: "/" },
          { name: "Books", url: "/books" },
          { name: book?.title || "" },
        ]}
      />

      <div className="col-12">
        <div className="main-title main-title--page">
          <h3>{book?.title}</h3>
          <h3>{book?.readerAgeGroup}</h3>
        </div>
      </div>

      <BookPlaylist book={book} />
      <ArticleComponent book={book} />
    </div>
  );
}

function BookPlaylist({ book }) {
  const SERVICE_BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
  const bookImgPath = book?.images?.[0]?.fileUrl
    ? SERVICE_BASE_URL + book.images[0].fileUrl
    : BookSvg;

  return (
    <div className="publication">
      <div className="publication-content">
        <div className="publication-cover">
          <img src={bookImgPath} alt={book.title} />
        </div>
        <div className="publication-stat">
          <span>{book.audioCount} tracks</span>
          <span>{book.documentsCount} documents</span>
        </div>
      </div>
      <div className="publication-list-container">
        {book.audio && book.audio.length > 0 && (
          <>
            <h2>Audio</h2>
            <div className="publication-list">
              <TrackList book={book} />
            </div>
          </>
        )}
        {book.documents && book.documents.length > 0 && (
          <>
            <h2>Documents</h2>
            <div className="publication-list">
              <DocumentsList book={book} />
            </div>
          </>
        )}
        {!book.audio && !book.documents && <h2>No Books Available</h2>}
      </div>
    </div>
  );
}

function TrackList({ book }) {
  const SERVICE_API_BASE_URL = import.meta.env.VITE_SERVICE_API_BASE_URL;
  const tracks: [] = book.audio;

  return (
    <ul className="main-list main-list--playlist main-list--dashbox">
      {tracks.map((track, index) => (
        <TrackItem
          key={index}
          index={index}
          tracks={tracks}
          bookTitle={book.title}
          bookfileUrl={`${SERVICE_API_BASE_URL}/api/books/${book.id}`}
          authors={book.authors ?? []}
          coverSrc={book?.images?.[0] || undefined}
        />
      ))}
    </ul>
  );
}

function TrackItem({
  index,
  tracks,
  bookTitle,
  bookfileUrl,
  authors,
  coverSrc,
}) {
  const SERVICE_BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
  const { playAudio } = usePlayer();
  const fullTitle = `${bookTitle} - ${tracks[index].name}`;
  const fullcoverSrc = coverSrc?.fileUrl
    ? `${SERVICE_BASE_URL}${coverSrc.fileUrl}`
    : "";
  const fullAudioSrc = tracks[index].fileUrl
    ? `${SERVICE_BASE_URL}${tracks[index].fileUrl}`
    : "";

  let authorsString = "";
  authors?.map((author, index) => {
    authorsString += author.name + (index < authors.length - 1 ? ", " : "");
  });

  return (
    <li className="single-item">
      <a
        href="#"
        className="single-item-cover"
        onClick={(e) => {
          e.preventDefault();
          playAudio(
            fullcoverSrc,
            tracks[index].name,
            authorsString,
            fullAudioSrc,
            tracks.map((track) => ({
              ...track,
              fileUrl: `${SERVICE_BASE_URL}${track.fileUrl}`,
            })),
            index
          );
        }}
      >
        <img src={trackCover} alt={tracks[index].name} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M16,2a3,3,0,0,0-3,3V19a3,3,0,0,0,6,0V5A3,3,0,0,0,16,2Zm1,17a1,1,0,0,1-2,0V5a1,1,0,0,1,2,0ZM8,2A3,3,0,0,0,5,5V19a3,3,0,0,0,6,0V5A3,3,0,0,0,8,2ZM9,19a1,1,0,0,1-2,0V5A1,1,0,0,1,9,5Z"></path>
        </svg>
      </a>
      <div className="single-item-title">
        <h4>
          <a href="#">{fullTitle}</a>
        </h4>
        <span>
          {authors?.map((author, index) => (
            <React.Fragment key={index}>
              <Link key={index} to={`/author/${author.id}`}>
                {author.name}
              </Link>
              {index < authors.length - 1 && ", "}
            </React.Fragment>
          ))}
        </span>
      </div>
      <span className="single-item-time">
        {formatDuration(tracks[index].duration)}
      </span>
      <a href="#" className="single-item-export">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Zm-9.71,1.71a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l4-4a1,1,0,0,0-1.42-1.42L13,12.59V3a1,1,0,0,0-2,0v9.59l-2.29-2.3a1,1,0,1,0-1.42,1.42Z"></path>
        </svg>
      </a>
    </li>
  );
}

function DocumentsList({ book }) {
  const SERVICE_API_BASE_URL = import.meta.env.VITE_SERVICE_API_BASE_URL;
  const documents: [] = book.documents;

  return (
    <ul className="main-list main-list--playlist main-list--dashbox">
      {documents.map((document, index) => (
        <DocumentItem
          key={index}
          document={document}
          bookTitle={book.title}
          bookfileUrl={`${SERVICE_API_BASE_URL}/api/books/${book.id}`}
          authors={book.authors ?? []}
          coverSrc={book?.images?.[0] || undefined}
        />
      ))}
    </ul>
  );
}

function DocumentItem({ document, bookTitle, bookfileUrl, authors, coverSrc }) {
  const SERVICE_BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;

  const fullTitle = `${bookTitle} - ${document.name}`;
  const fullcoverSrc = coverSrc?.fileUrl
    ? `${SERVICE_BASE_URL}${coverSrc.fileUrl}`
    : "";
  const fullDocumentSrc = document?.fileUrl
    ? `${SERVICE_BASE_URL}${document.fileUrl}`
    : "";

  return (
    <li className="single-item">
      <a
        href="#"
        className="single-item-cover"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        <img src={trackCover} alt={document.name} />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M18.54,9,8.88,3.46a3.42,3.42,0,0,0-5.13,3V17.58A3.42,3.42,0,0,0,7.17,21a3.43,3.43,0,0,0,1.71-.46L18.54,15a3.42,3.42,0,0,0,0-5.92Zm-1,4.19L7.88,18.81a1.44,1.44,0,0,1-1.42,0,1.42,1.42,0,0,1-.71-1.23V6.42a1.42,1.42,0,0,1,.71-1.23A1.51,1.51,0,0,1,7.17,5a1.54,1.54,0,0,1,.71.19l9.66,5.58a1.42,1.42,0,0,1,0,2.46Z"></path>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M16,2a3,3,0,0,0-3,3V19a3,3,0,0,0,6,0V5A3,3,0,0,0,16,2Zm1,17a1,1,0,0,1-2,0V5a1,1,0,0,1,2,0ZM8,2A3,3,0,0,0,5,5V19a3,3,0,0,0,6,0V5A3,3,0,0,0,8,2ZM9,19a1,1,0,0,1-2,0V5A1,1,0,0,1,9,5Z"></path>
        </svg>
      </a>
      <div className="single-item-title">
        <h4>
          <a href="#">{fullTitle}</a>
        </h4>
        <span>
          {authors?.map((author, index) => (
            <React.Fragment key={index}>
              <Link key={index} to={`/author/${author.id}`}>
                {author.name}
              </Link>
              {index < authors.length - 1 && ", "}
            </React.Fragment>
          ))}
        </span>
      </div>
      <span className="single-item-time">{bytesToMB(document.fileSize)}</span>
      <a href="#" className="single-item-export">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21,14a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V15a1,1,0,0,0-2,0v4a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V15A1,1,0,0,0,21,14Zm-9.71,1.71a1,1,0,0,0,.33.21.94.94,0,0,0,.76,0,1,1,0,0,0,.33-.21l4-4a1,1,0,0,0-1.42-1.42L13,12.59V3a1,1,0,0,0-2,0v9.59l-2.29-2.3a1,1,0,1,0-1.42,1.42Z"></path>
        </svg>
      </a>
    </li>
  );
}

function ArticleComponent({ book }) {
  return (
    <div className="col-12">
      <div className="detail-text">
        <div className="detail-text-content">
          <h4>About {book.title}</h4>
          <p>{book.description}</p>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;

export const bytesToMB = (bytes) => {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

export const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  // Format to 00:00:00
  return [hrs, mins, secs]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");
};
