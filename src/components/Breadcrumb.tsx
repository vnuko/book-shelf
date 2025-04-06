import { Link } from "react-router-dom";

interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="col-12">
      <ul className="breadcrumb">
        {items.map((item, index) => (
          <li
            key={index}
            className={`breadcrumb-item ${
              index === items.length - 1 ? "breadcrumb-item--active" : ""
            }`}
          >
            {item.url ? <Link to={item.url}>{item.name}</Link> : item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Breadcrumb;
