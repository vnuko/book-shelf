import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import BookSvg from "./../assets/book.svg";

export default function BooksOverview({ authorId }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVICE_API_BASE_URL = import.meta.env.VITE_SERVICE_API_BASE_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        let response;
        if (authorId) {
          response = await fetch(`${SERVICE_API_BASE_URL}/authors/${authorId}`);
          const result = await response.json();
          if (result.success) {
            setBooks(result.data && result.data.books ? result.data.books : []);
          } else {
            throw new Error(result.message);
          }
        } else {
          response = await fetch(`${SERVICE_API_BASE_URL}/books`);
          const result = await response.json();
          if (result.success) {
            setBooks(result.data);
          } else {
            throw new Error(result.message);
          }
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
    <section className="row row--grid">
      <div className="col-12">
        <div className="main-title">
          <h2>Books</h2>
          <a href="books.html" className="main-link">
            See all{" "}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
            </svg>
          </a>
        </div>
      </div>
      {books.map((book, index) => (
        <Book key={index} book={book} />
      ))}
    </section>
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
        <Link to={`/book/${book.id}`}>
          <div className="thumbnail-cover">
            <img src={bookImgPath} alt={book.title} />
            <span className="thumbnail-stat">
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M49.6 262C62.4 159.4 149.9 80 256 80s193.6 79.4 206.4 182c-9.4-3.9-19.6-6-30.4-6c-26.5 0-48 21.5-48 48l0 128c0 26.5 21.5 48 48 48c44.2 0 80-35.8 80-80l0-32 0-32 0-48C512 146.6 397.4 32 256 32S0 146.6 0 288l0 48 0 32 0 32c0 44.2 35.8 80 80 80c26.5 0 48-21.5 48-48l0-128c0-26.5-21.5-48-48-48c-10.8 0-21 2.1-30.4 6zM48 336c0-17.7 14.3-32 32-32l0 128c-17.7 0-32-14.3-32-32l0-32 0-32zm416 0l0 32 0 32c0 17.7-14.3 32-32 32l0-128c17.7 0 32 14.3 32 32z" />
                </svg>
                {book.audioCount}
              </span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M320 480L64 480c-17.7 0-32-14.3-32-32L32 64c0-17.7 14.3-32 32-32l128 0 0 112c0 26.5 21.5 48 48 48l112 0 0 256c0 17.7-14.3 32-32 32zM240 160c-8.8 0-16-7.2-16-16l0-111.5c2.8 .7 5.4 2.1 7.4 4.2L347.3 152.6c2.1 2.1 3.5 4.6 4.2 7.4L240 160zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-284.1c0-12.7-5.1-24.9-14.1-33.9L254.1 14.1c-9-9-21.2-14.1-33.9-14.1L64 0zm48 256c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-160 0zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-160 0zm0 64c-8.8 0-16 7.2-16 16s7.2 16 16 16l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-160 0z" />
                </svg>
                {book.documentsCount}
              </span>
            </span>
          </div>
        </Link>
        <div className="thumbnail-title">
          <h3>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </h3>
          <span>
            {book.authors?.map((author, index) => (
              <>
                <Link to={`/author/${author.id}`}>{author.name}</Link>
                {index < book.authors.length - 1 && ", "}
              </>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
