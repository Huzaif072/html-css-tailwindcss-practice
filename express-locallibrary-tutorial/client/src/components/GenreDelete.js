import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function GenreDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [genre, setGenre] = useState(null);
  const [genreBooks, setGenreBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
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

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleting(true);
    fetch(`/api/genre/${id}/delete`, {
      method: 'DELETE', // Changed from POST to DELETE
    })
      .then(res => {
        if (res.ok) {
          navigate('/genres');
        } else {
          return res.json().then(data => {
            throw new Error(data.message || 'Delete failed');
          });
        }
      })
      .catch(err => {
        setError(err.message);
        setDeleting(false);
      });
  };

  if (loading) return <div>Loading genre details...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;
  if (!genre) return <div>Genre not found.</div>;

  return (
    <div>
      <h1>Delete Genre: {genre.name}</h1>

      {genreBooks.length > 0 ? (
        <>
          <div className="alert alert-warning">
            <strong>Cannot delete this genre!</strong>
            <p>Delete the following books before attempting to delete this genre.</p>
          </div>

          <div className="mt-4">
            <h4>Books in this Genre</h4>
            <div className="list-group">
              {genreBooks.map((book) => (
                <div key={book._id} className="list-group-item">
                  <h6 className="mb-1">
                    <Link to={`/books/${book._id}`}>{book.title}</Link>
                  </h6>
                  <p className="mb-1">{book.summary}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4">
            <Link to={`/genres/${genre._id}`} className="btn btn-secondary">
              Back to Genre
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="alert alert-danger">
            <p><strong>Warning:</strong> Do you really want to delete this Genre?</p>
            <p>This action cannot be undone.</p>
          </div>

          <form onSubmit={handleDelete}>
            <button 
              className="btn btn-danger me-2" 
              type="submit" 
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Genre'}
            </button>
            <Link to={`/genres/${genre._id}`} className="btn btn-secondary">
              Cancel
            </Link>
          </form>
        </>
      )}
    </div>
  );
}

export default GenreDelete;