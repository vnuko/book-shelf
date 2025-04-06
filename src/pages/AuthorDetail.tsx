import { useParams } from "react-router-dom";
import BooksOverview from "../components/BooksOverview";
import Breadcrumb from "../components/Breadcrumb";
import { useEffect, useState } from "react";
import AuthorSvg from "./../assets/author.svg";

export default function AuthorDetail() {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVICE_API_BASE_URL = import.meta.env.VITE_SERVICE_API_BASE_URL;

  useEffect(() => {
    async function fetchAuthor() {
      try {
        const response = await fetch(
          `${SERVICE_API_BASE_URL}/authors/${authorId}`
        );
        const result = await response.json();

        if (result.success) {
          setAuthor(result.data);
        } else {
          setError("Failed to load author details.");
        }
      } catch (err) {
        setError("An error occurred while fetching author details.");
      } finally {
        setLoading(false);
      }
    }

    fetchAuthor();
  }, [authorId]);

  if (loading) return <p>Loading author details...</p>;
  if (error) return <p>{error}</p>;

  const SERVICE_BASE_URL = import.meta.env.VITE_SERVICE_BASE_URL;
  const authorImgPath = author?.images?.[0]?.fileUrl
    ? SERVICE_BASE_URL + author.images[0].fileUrl
    : AuthorSvg;

  return (
    <>
      <Breadcrumb
        items={[
          { name: "Discover", url: "/" },
          { name: "Authors", url: "/authors" },
          { name: author?.name || "" },
        ]}
      />
      <div className="row row--grid">
        <div className="col-12">
          <div className="detail-text detail-text--page">
            <div className="detail-text-content">
              <div className="detail-text-artist">
                <img src={authorImgPath} alt={author?.name} />
                <div>
                  <h1>{author?.name}</h1>
                  <span>
                    Date of Birth: {author?.dob}, Nationality:{" "}
                    {author?.nationality}
                  </span>
                  <p>{author?.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BooksOverview />
    </>
  );
}
