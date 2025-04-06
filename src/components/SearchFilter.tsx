function SearchFilter({ searchPlaceholder = "Search...", query, setQuery }) {
  function handleSearch(e) {
    setQuery();
  }

  return (
    <div className="main-filter">
      <form action="#" className="main-filter-search">
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path>
        </svg>
      </form>

      {/* <div className="main-filter-wrap">
        <select
          className="main-select select2-hidden-accessible"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            handleFilterChange();
          }}
        >
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          className="main-select select2-hidden-accessible"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            handleFilterChange();
          }}
        >
          {typeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div> */}

      {/* <div className="slider-radio">
        {sortOptions.map((option) => (
          <label key={option.value} className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value={option.value}
              checked={sort === option.value}
              onChange={(e) => {
                setSort(e.target.value);
                handleFilterChange();
              }}
            />
            {option.label}
          </label>
        ))}
      </div> */}
    </div>
  );
}

export default SearchFilter;
