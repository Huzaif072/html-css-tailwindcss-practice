import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/authors')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load authors');
        return res.json();
      })
      .then(data => {
        setAuthors(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatLifespan = (author) => {
    const birth = author.date_of_birth ? new Date(author.date_of_birth).getFullYear() : '?';
    const death = author.date_of_death ? new Date(author.date_of_death).getFullYear() : 'Present';
    return `${birth} - ${death}`;
  };

  if (loading) return <div>Loading authors...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

  return (
    <div>
      <h1>Author List</h1>
      <Link to="/authors/create" className="btn btn-primary mb-3">
        Create New Author
      </Link>
      
      {authors.length > 0 ? (
        <div className="list-group">
          {authors.map(author => (
            <div key={author._id} className="list-group-item">
              <Link to={`/authors/${author._id}`} style={{textDecoration: 'none'}}>
                <h5 className="mb-1">{author.first_name} {author.family_name}</h5>
              </Link>
              <small className="text-muted">{formatLifespan(author)}</small>
            </div>
          ))}
        </div>
      ) : (
        <p>No authors found.</p>
      )}
    </div>
  );
}

export default AuthorList;