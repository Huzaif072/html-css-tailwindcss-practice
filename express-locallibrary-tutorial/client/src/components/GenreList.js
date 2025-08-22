import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function GenreList() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/genres')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load genres');
        return res.json();
      })
      .then(data => {
        setGenres(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading genres...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Genre List</h1>
        <Link to="/genres/create" className="btn btn-primary">
          Create New Genre
        </Link>
      </div>

      {genres.length > 0 ? (
        <div className="row">
          {genres.map((genre) => (
            <div key={genre._id} className="col-md-6 col-lg-4 mb-3">
              <div className="card h-100">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">
                    <Link to={`/genres/${genre._id}`} style={{textDecoration: 'none'}}>
                      {genre.name}
                    </Link>
                  </h5>
                  <div className="mt-auto">
                    <Link to={`/genres/${genre._id}`} className="btn btn-sm btn-outline-primary">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h3>No genres found</h3>
          <p>There are no genres in the library yet.</p>
          <Link to="/genres/create" className="btn btn-primary">
            Create First Genre
          </Link>
        </div>
      )}
    </div>
  );
}

export default GenreList;