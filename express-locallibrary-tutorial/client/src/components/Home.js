import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [stats, setStats] = useState({
    books: 0,
    authors: 0,
    genres: 0,
    bookInstances: 0,
    availableInstances: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Fetch library statistics
        const response = await fetch('/api/');
        if (!response.ok) {
          throw new Error('Failed to fetch library statistics');
        }
        const data = await response.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading library statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Welcome Header */}
      <div className="jumbotron bg-primary text-white p-5 rounded mb-4">
        <h1 className="display-4">Welcome to Local Library</h1>
        <p className="lead">
          Manage your library's collection of books, authors, and more.
        </p>
        <hr className="my-4" />
        <p>Get started by browsing our collection or adding new items.</p>
      </div>

      {/* Statistics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card bg-success text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{stats.books}</h4>
                  <p className="card-text">Books</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-book fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-info text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{stats.authors}</h4>
                  <p className="card-text">Authors</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-user fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-warning text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{stats.genres}</h4>
                  <p className="card-text">Genres</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-tags fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card bg-secondary text-white">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <div>
                  <h4 className="card-title">{stats.bookInstances}</h4>
                  <p className="card-text">Copies</p>
                </div>
                <div className="align-self-center">
                  <i className="fas fa-copy fa-2x"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Available Books Card */}
      <div className="row mb-4">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <i className="fas fa-check-circle text-success me-2"></i>
                Available Books
              </h5>
              <h2 className="text-success">{stats.availableInstances}</h2>
              <p className="card-text">Book copies currently available for borrowing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-3 mb-2">
                  <Link to="/books" className="btn btn-outline-primary btn-block w-100">
                    <i className="fas fa-book me-2"></i>
                    View All Books
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/authors" className="btn btn-outline-info btn-block w-100">
                    <i className="fas fa-user me-2"></i>
                    View All Authors
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/genres" className="btn btn-outline-warning btn-block w-100">
                    <i className="fas fa-tags me-2"></i>
                    View All Genres
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/bookinstances" className="btn btn-outline-secondary btn-block w-100">
                    <i className="fas fa-copy me-2"></i>
                    View All Copies
                  </Link>
                </div>
              </div>
              
              <hr />
              
              <div className="row">
                <div className="col-md-3 mb-2">
                  <Link to="/books/create" className="btn btn-success btn-block w-100">
                    <i className="fas fa-plus me-2"></i>
                    Add New Book
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/authors/create" className="btn btn-success btn-block w-100">
                    <i className="fas fa-user-plus me-2"></i>
                    Add New Author
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/genres/create" className="btn btn-success btn-block w-100">
                    <i className="fas fa-plus me-2"></i>
                    Add New Genre
                  </Link>
                </div>
                <div className="col-md-3 mb-2">
                  <Link to="/bookinstances/create" className="btn btn-success btn-block w-100">
                    <i className="fas fa-plus me-2"></i>
                    Add New Copy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;