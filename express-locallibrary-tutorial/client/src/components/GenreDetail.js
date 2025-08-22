import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function GenreDetail() {
  const { id } = useParams();
  const [genre, setGenre] = useState(null);
  const [genreBooks, setGenreBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/genre/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load genre');
        return res.json();
      })
      .then(data => {
        setGenre(data.genre);
        setGenreBooks(data.books || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading genre details...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;
  if (!genre) return <div>Genre not found.</div>;

  return (
    <div>
      <h1>Genre: {genre.name}</h1>

      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">Books in this Genre</h5>
          {genreBooks.length > 0 ? (
            <div className="row">
              {genreBooks.map((book) => (
                <div key={book._id} className="col-md-6 col-lg-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body">
                      <h6 className="card-title">
                        <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                          {book.title}
                        </Link>
                      </h6>
                      <p className="card-text text-truncate">{book.summary}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">This genre has no books.</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Link to={`/genres/${genre._id}/update`} className="btn btn-secondary me-2">
          Edit Genre
        </Link>
        <Link to={`/genres/${genre._id}/delete`} className="btn btn-danger me-2">
          Delete Genre
        </Link>
        <Link to="/genres" className="btn btn-outline-secondary">
          Back to Genres
        </Link>
      </div>
    </div>
  );
}

export default GenreDetail;