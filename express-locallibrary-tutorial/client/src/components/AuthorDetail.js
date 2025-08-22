import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/author/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load author');
        return res.json();
      })
      .then(data => {
        setAuthor(data.author);
        setBooks(data.books || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{color: 'red'}}>{error}</div>;
  if (!author) return <div>Author not found.</div>;

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <h1>{author.first_name} {author.family_name}</h1>
      <p>
        Born: {formatDate(author.date_of_birth)} | 
        Died: {formatDate(author.date_of_death)}
      </p>

      <h3>Books by this Author</h3>
      {books.length === 0 ? (
        <p>This author has no books.</p>
      ) : (
        <ul>
          {books.map(book => (
            <li key={book._id}>
              <Link to={`/books/${book._id}`}>{book.title}</Link>
              {book.summary && <p>{book.summary}</p>}
            </li>
          ))}
        </ul>
      )}

      <div style={{marginTop: '20px'}}>
        <Link to={`/authors/${author._id}/update`} className="btn btn-secondary">Edit Author</Link>
        {' '}
        <Link to={`/authors/${author._id}/delete`} className="btn btn-danger">Delete Author</Link>
        {' '}
        <Link to="/authors" className="btn btn-outline-secondary">Back to Authors</Link>
      </div>
    </div>
  );
}

export default AuthorDetail;