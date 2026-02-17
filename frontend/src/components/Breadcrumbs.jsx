import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();

  const segments = location.pathname
    .split("/")
    .filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" style={{ marginBottom: "16px" }}>
      <ol style={{ display: "flex", listStyle: "none", padding: 0 }}>
        <li>
          <Link to="/">Inicio</Link>
          <span aria-hidden="true"> / </span>
        </li>

        {segments.map((segment, index) => {
          const path = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <li key={path}>
              {isLast ? (
                <span aria-current="page">{format(segment)}</span>
              ) : (
                <>
                  <Link to={path}>{format(segment)}</Link>
                  <span aria-hidden="true"> / </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function format(text) {
  return text
    .replace("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}
