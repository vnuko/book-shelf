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
        <div className="thumbnail-cover">
          <img src={authorImgPath} alt={author.name} />
          <Link to={`/author/${author.id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -2 24 24">
              <path d="M3.534 10.07a1 1 0 1 1 .733 1.86A3.579 3.579 0 0 0 2 15.26V17a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.647a3.658 3.658 0 0 0-2.356-3.419 1 1 0 1 1 .712-1.868A5.658 5.658 0 0 1 14 15.353V17a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-1.74a5.579 5.579 0 0 1 3.534-5.19zM7 0a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V4a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V4a2 2 0 0 0-2-2z"></path>
            </svg>
          </Link>
        </div>
        <div className="thumbnail-title">
          <h3>
            <Link to={`/author/${author.id}`}>{author.name}</Link>
          </h3>
        </div>
      </div>
    </div>
  );
}
