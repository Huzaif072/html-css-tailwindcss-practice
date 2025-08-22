import React from "react";
import { Link, useLocation } from "react-router-dom";

function Layout({ children, title }) {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <nav
        className="bg-light border-end"
        style={{ width: "200px", minHeight: "100vh", paddingTop: "1rem" }}
      >
        <div className="px-3 mb-4">
          <h4>{title || "Local Library"}</h4>
        </div>
        <ul className="nav flex-column px-3">
          <li className="nav-item mb-2">
            <Link
              to="/"
              className={`nav-link ${isActive("/") ? "active" : ""}`}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </Link>
          </li>
          <hr />
          <li className="nav-item mb-2">
            <Link
              to="/books"
              className={`nav-link ${isActive("/books") ? "active" : ""}`}
            >
              All Books
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/authors"
              className={`nav-link ${isActive("/authors") ? "active" : ""}`}
            >
              All Authors
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/genres"
              className={`nav-link ${isActive("/genres") ? "active" : ""}`}
            >
              All Genres
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link
              to="/bookinstances"
              className={`nav-link ${isActive("/bookinstances") ? "active" : ""}`}
            >
              All Book Instances
            </Link>
          </li>
          <hr />
          <li className="nav-item mb-2">
            <Link to="/authors/create" className="nav-link text-success">
              Create New Author
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/genres/create" className="nav-link text-success">
              Create New Genre
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/books/create" className="nav-link text-success">
              Create New Book
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/bookinstances/create" className="nav-link text-success">
              Create New Book Instance
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main content area */}
      <main
        className="flex-grow-1 p-4 overflow-auto"
        style={{ maxWidth: "calc(100vw - 200px)", minHeight: "100vh" }}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
