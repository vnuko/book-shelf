import { NavLink } from "react-router-dom";

interface NavItemProps {
  link: string;
  icon: JSX.Element;
  label: string;
}

function NavItem({ link, icon, label }: NavItemProps) {
  return (
    <li className="sidebar-nav-item">
      <NavLink
        to={link}
        className={({ isActive }) =>
          `sidebar-nav-link ${isActive ? "sidebar-nav-link--active" : ""}`
        }
      >
        {icon} <span>{label}</span>
      </NavLink>
    </li>
  );
}

function Sidebar({ isActive }: { isActive: boolean }) {
  return (
    <div className={`sidebar ${isActive ? "sidebar-active" : ""}`}>
      <div className="sidebar-logo">
        <img src="/logo.svg" alt="logo" />
      </div>

      <ul className="sidebar-nav">
        <NavItem
          link="/"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24">
              <path d="M11.932 9.482a2.003 2.003 0 0 1-2.45 2.45L6.464 14.95a1 1 0 1 1-1.414-1.414l3.018-3.018a2.003 2.003 0 0 1 2.45-2.45l3.018-3.018a1 1 0 0 1 1.414 1.414l-3.018 3.018zM10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
            </svg>
          }
          label="Discover"
        />
        <NavItem
          link="/authors"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -1.5 24 24">
              <path d="M3.534 11.07a1 1 0 1 1 .733 1.86A3.579 3.579 0 0 0 2 16.26V18a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1.647a3.658 3.658 0 0 0-2.356-3.419 1 1 0 1 1 .712-1.868A5.658 5.658 0 0 1 14 16.353V18a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3v-1.74a5.579 5.579 0 0 1 3.534-5.19zM7 1a4 4 0 0 1 4 4v2a4 4 0 1 1-8 0V5a4 4 0 0 1 4-4zm0 2a2 2 0 0 0-2 2v2a2 2 0 1 0 4 0V5a2 2 0 0 0-2-2zm9 17a1 1 0 0 1 0-2h1a1 1 0 0 0 1-1v-1.838a3.387 3.387 0 0 0-2.316-3.213 1 1 0 1 1 .632-1.898A5.387 5.387 0 0 1 20 15.162V17a3 3 0 0 1-3 3h-1zM13 2a1 1 0 0 1 0-2 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 1 1 0 0 1 0-2 2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"></path>
            </svg>
          }
          label="Authors"
        />
        <NavItem
          link="/books"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-5 -2 24 24">
              <path d="M5 18v2H3v-2H0V0h11a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5zM3 2H2v14h1V2zm2 0v14h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H5zm1 2h5v2H6V4zm0 3h5v2H6V7z"></path>
            </svg>
          }
          label="Books"
        />
      </ul>
    </div>
  );
}

export default Sidebar;
