import { useState } from "react";

function Logo() {
  return (
    <div className="header-logo">
      <a href="index.html">
        <img src="/logo.svg" alt="logo" />
      </a>
    </div>
  );
}

function SearchForm({
  isActive,
  onClose,
}: {
  isActive: boolean;
  onClose: () => void;
}) {
  return (
    <form
      className={`header-search ${isActive ? "header-search--active" : ""}`}
    >
      <input type="text" placeholder="Artist, track or podcast" />
      <button type="button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"></path>
        </svg>
      </button>
      <button type="button" className="close" onClick={onClose}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"></path>
        </svg>
      </button>
    </form>
  );
}

function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const [isSearchActive, setIsSearchActive] = useState(false);

  function toggleSearch() {
    setIsSearchActive((prev) => !prev);
  }

  return (
    <header className="header">
      <div className="header-content">
        <Logo />
        <SearchForm isActive={isSearchActive} onClose={toggleSearch} />
        <div className="header-actions">
          <div className="header-action header-action--search">
            <button
              className="header-action-btn"
              type="button"
              onClick={toggleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2.5 -2.5 24 24">
                <path d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm6.32-1.094l3.58 3.58a1 1 0 1 1-1.415 1.413l-3.58-3.58a8 8 0 1 1 1.414-1.414z"></path>
              </svg>
            </button>
          </div>
          <button
            className="header-btn"
            type="button"
            onClick={onToggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -7 24 24">
              <path d="M1 0h5a1 1 0 1 1 0 2H1a1 1 0 1 1 0-2zm7 8h5a1 1 0 0 1 0 2H8a1 1 0 1 1 0-2zM1 4h12a1 1 0 0 1 0 2H1a1 1 0 1 1 0-2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
