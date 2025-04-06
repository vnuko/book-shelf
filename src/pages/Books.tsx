// import AuthorsList from "../components/AuthorsList";
import BooksList from "../components/BooksList";
import Breadcrumb from "../components/Breadcrumb";
import SearchFilter from "../components/SearchFilter";

function Books() {
  const bookCategoryOptions = [
    { label: "All artists", value: "all" },
    { label: "Legacy artists", value: "legacy" },
    { label: "Active artists", value: "active" },
  ];

  const bookTypeOptions = [
    { label: "All genres", value: "all-genres" },
    { label: "Jazz", value: "jazz" },
    { label: "Rock", value: "rock" },
  ];

  const sortOptions = [
    { label: "Featured", value: "featured" },
    { label: "Popular", value: "popular" },
    { label: "Newest", value: "newest" },
  ];

  const handleBookSearch = (query: string) => {
    console.log("Searching books for:", query);
  };

  const handleBookFilterChange = (filters: any) => {
    console.log("Book filters changed:", filters);
  };

  return (
    <>
      <div className="row row--grid">
        <Breadcrumb
          items={[{ name: "Discover", url: "/" }, { name: "Books" }]}
        />
        <div className="col-12">
          <div className="main-title main-title--page">
            <h1>Books</h1>
          </div>
        </div>
        <div className="col-12" data-select2-id="9">
          <SearchFilter
            searchPlaceholder="Search for books..."
            categoryOptions={bookCategoryOptions}
            typeOptions={bookTypeOptions}
            sortOptions={sortOptions}
            onSearch={handleBookSearch}
            onFilterChange={handleBookFilterChange}
          />
        </div>
      </div>
      <BooksList />
    </>
  );
}

export default Books;
