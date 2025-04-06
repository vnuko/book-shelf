import { Link } from "react-router-dom";
import AuthorSvg from "./../assets/author.svg";

export default function AuthorsList({ authors, loading, error }) {
  if (authors.length === 0) return <p>No authors found.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="row row--grid">
        {authors.map((author, index) => (
          <Author key={index} author={author} />
        ))}
      </div>
      <button className="main-load" type="button">
        Load more
      </button>
    </>
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
