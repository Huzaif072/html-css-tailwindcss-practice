import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BookInstanceDetail() {
  const { id } = useParams();
  const [bookInstance, setBookInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/bookinstance/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load book instance');
        return res.json();
      })
      .then(data => {
        setBookInstance(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading book instance details...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!bookInstance) return <div>Book instance not found.</div>;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <h1>Book Instance Details</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Instance ID: {bookInstance._id}</h5>
          
          <div className="mb-3">
            <strong>Book: </strong>
            {bookInstance.book ? (
              <Link to={`/books/${bookInstance.book._id}`}>
                {bookInstance.book.title}
              </Link>
            ) : 'Unknown Book'}
          </div>
          
          <div className="mb-3">
            <strong>Imprint:</strong> {bookInstance.imprint}
          </div>
          
          <div className="mb-3">
            <strong>Status: </strong>
            <span className={
              bookInstance.status === 'Available' ? 'text-success' :
              bookInstance.status === 'Maintenance' ? 'text-danger' : 'text-warning'
            }>
              {bookInstance.status}
            </span>
          </div>
          
          {bookInstance.due_back && (
            <div className="mb-3">
              <strong>Due back:</strong> {formatDate(bookInstance.due_back)}
            </div>
          )}
        </div>
      </div>

      <div className="btn-group">
        <Link to={`/bookinstances/${bookInstance._id}/update`} className="btn btn-secondary">
          Edit Book Instance
        </Link>
        <Link to={`/bookinstances/${bookInstance._id}/delete`} className="btn btn-danger">
          Delete Book Instance
        </Link>
        <Link to="/bookinstances" className="btn btn-outline-secondary">
          Back to Book Instances
        </Link>
      </div>
    </div>
  );
}

export default BookInstanceDetail;