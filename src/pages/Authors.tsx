import { useEffect, useState } from "react";

import AuthorsList from "../components/AuthorsList";
import Breadcrumb from "../components/Breadcrumb";
import SearchFilter from "../components/SearchFilter";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const SERVICE_API_BASE_URL = import.meta.env.VITE_SERVICE_API_BASE_URL;

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        let url = `${SERVICE_API_BASE_URL}/authors`;

        if (query) {
          url = `${SERVICE_API_BASE_URL}/authors/search?query=${encodeURIComponent(
            query
          )}`;
        }

        const response = await fetch(url);
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

    const handler = setTimeout(
      () => {
        fetchAuthors();
      },
      query ? 500 : 1
    );

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <>
      <div className="row row--grid">
        <Breadcrumb
          items={[{ name: "Discover", url: "/" }, { name: "Authors" }]}
        />
        <div className="col-12">
          <div className="main-title main-title--page">
            <h1>Authors</h1>
          </div>
        </div>
        <div className="col-12" data-select2-id="9">
          <SearchFilter
            searchPlaceholder="Search for authors..."
            query={query}
            setQuery={setQuery}
          />
        </div>
      </div>
      <AuthorsList authors={authors} loading={loading} error={error} />
    </>
  );
}

export default Authors;
