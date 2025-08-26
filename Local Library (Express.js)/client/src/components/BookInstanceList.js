import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BookInstanceList() {
  const [bookInstances, setBookInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/bookinstances')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load book instances');
        return res.json();
      })
      .then(data => {
        setBookInstances(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div>Loading book instances...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Book Instance List</h1>
        <Link to="/bookinstances/create" className="btn btn-primary">
          Create New Book Instance
        </Link>
      </div>

      {bookInstances.length > 0 ? (
        <div className="row">
          {bookInstances.map(instance => (
            <div key={instance._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">ID: {instance._id}</h6>
                  
                  <h5 className="card-title">
                    {instance.book ? (
                      <Link to={`/books/${instance.book._id}`}>
                        {instance.book.title}
                      </Link>
                    ) : 'Unknown Book'}
                  </h5>
                  
                  <p className="card-text">
                    <strong>Imprint:</strong> {instance.imprint}
                  </p>
                  
                  <p className="card-text">
                    <strong>Status: </strong>
                    <span className={
                      instance.status === 'Available' ? 'text-success' :
                      instance.status === 'Maintenance' ? 'text-danger' : 'text-warning'
                    }>
                      {instance.status}
                    </span>
                  </p>
                  
                  {instance.due_back && (
                    <p className="card-text">
                      <strong>Due back:</strong> {formatDate(instance.due_back)}
                    </p>
                  )}
                </div>
                <div className="card-footer">
                  <Link to={`/bookinstances/${instance._id}`} className="btn btn-sm btn-outline-primary">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h3>No book instances found</h3>
          <p>There are no book instances in the library yet.</p>
          <Link to="/bookinstances/create" className="btn btn-primary">
            Create First Book Instance
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookInstanceList;