import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookSvg from "./../assets/book.svg";

export default function BooksList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVICE_API_BASE_URL = import.meta.env.VITE_SERVICE_API_BASE_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(`${SERVICE_API_BASE_URL}/books`);
        const result = await response.json();

        if (result.success) {
          setBooks(result.data);
        } else {
          throw new Error(result.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="row row--grid">
        {books.map((book, index) => (
          <Book key={index} book={book} />
        ))}
      </div>
      <button className="main-load" type="button">
        Load more
      </button>
    </>
  );
}

function Book({ book }) {
  const SERVICE_BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
  const bookImgPath = book?.images?.[0]?.fileUrl
    ? SERVICE_BASE_URL + book.images[0].fileUrl
    : BookSvg;

  return (
    <div className="col-6 col-sm-4 col-lg-2">
      <div className="thumbnail">
        <div className="thumbnail-cover">
          <img src={bookImgPath} alt={book.title} />
          <Link to={`/book/${book.id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -2 24 24">
              <path d="M5 18v2H3v-2H0V0h11a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5zM3 2H2v14h1V2zm2 0v14h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5zm1 2h5v2H6V4zm0 3h5v2H6V7z"></path>
            </svg>
          </Link>
        </div>
        <div className="thumbnail-title">
          <h3>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </h3>
          <span>
            <a href="artist.html">{book.authors?.[0]?.name}</a>
          </span>
        </div>
      </div>
    </div>
  );
}
