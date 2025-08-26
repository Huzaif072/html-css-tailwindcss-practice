import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function AuthorDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState(null);
  const [authorBooks, setAuthorBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/author/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load author');
        return res.json();
      })
      .then(data => {
        setAuthor(data.author);
        setAuthorBooks(data.books || []);
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
    fetch(`/api/author/${id}/delete`, {
      method: 'DELETE', 
    })
      .then(res => {
        if (res.ok) {
          navigate('/authors');
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!author) return <div>Author not found.</div>;

  return (
    <div>
      <h1>Delete Author: {author.first_name} {author.family_name}</h1>
      <p>
        {author.date_of_birth ? new Date(author.date_of_birth).toLocaleDateString() : 'Unknown'} - 
        {author.date_of_death ? new Date(author.date_of_death).toLocaleDateString() : 'Present'}
      </p>

      {authorBooks.length > 0 ? (
        <>
          <p><strong>Delete the following books before attempting to delete this author.</strong></p>
          <div style={{ marginLeft: 20, marginTop: 20 }}>
            <h4>Books</h4>
            <ul>
              {authorBooks.map(book => (
                <li key={book._id}>
                  <Link to={`/books/${book._id}`}>{book.title}</Link>
                  {book.summary && <p>{book.summary}</p>}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <>
          <p>Do you really want to delete this Author?</p>
          <form onSubmit={handleDelete}>
            <button className="btn btn-primary" type="submit" disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete Author'}
            </button>
            {' '}
            <Link to={`/authors/${author._id}`} className="btn btn-secondary">Cancel</Link>
          </form>
        </>
      )}
    </div>
  );
}

export default AuthorDelete;