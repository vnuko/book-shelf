import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorSvg from "./../assets/author.svg";

export default function AuthorsOverview() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVICE_API_BASE_URL = import.meta.env.VITE_SERVICE_API_BASE_URL;

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch(`${SERVICE_API_BASE_URL}/authors`);
        const result = await response.json();

        if (result.success) {
          setAuthors(result.data);
        } else {
          throw new Error(result.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="row row--grid">
      <div className="col-12">
        <div className="main-title">
          <h2>Authors</h2>
          <a href="releases.html" className="main-link">
            See all{" "}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
            </svg>
          </a>
        </div>
      </div>
      {authors.map((author: object, index) => (
        <Author key={index} author={author} />
      ))}
    </section>
  );
}

function Author({ author }) {
  const SERVICE_BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
  const authorImgPath = author?.images?.[0]?.fileUrl
    ? SERVICE_BASE_URL + author.images[0].fileUrl
    : AuthorSvg;

  return (
    <div className="col-6 col-sm-4 col-lg-2">
      <div className="thumbnail">
        <Link to={`/author/${author.id}`}>
          <div className="thumbnail-cover">
            <img src={authorImgPath} alt={author.name} />
            <span className="thumbnail-stat">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M64 0C28.7 0 0 28.7 0 64L0 448s0 0 0 0c0 35.3 28.7 64 64 64l368 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-16 0 0-66.7c18.6-6.6 32-24.4 32-45.3l0-320c0-26.5-21.5-48-48-48L64 0zM384 416l0 64L64 480c-17.7 0-32-14.3-32-32s14.3-32 32-32l320 0zM64 384c-11.7 0-22.6 3.1-32 8.6L32 64c0-17.7 14.3-32 32-32l32 0 0 352-32 0zm64 0l0-352 272 0c8.8 0 16 7.2 16 16l0 320c0 8.8-7.2 16-16 16l-272 0zm48-240c0 8.8 7.2 16 16 16l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-160 0c-8.8 0-16 7.2-16 16zm0 96c0 8.8 7.2 16 16 16l160 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-160 0c-8.8 0-16 7.2-16 16z" />
              </svg>
              {author.bookCount}
            </span>
          </div>
        </Link>
        <div className="thumbnail-title">
          <h3>
            <Link to={`/author/${author.id}`}>{author.name}</Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
