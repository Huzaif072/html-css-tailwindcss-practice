import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function GenreForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetch(`/api/genre/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load genre');
          return res.json();
        })
        .then(data => {
          if (data.genre) {
            setName(data.genre.name || '');
          }
          setLoading(false);
        })
        .catch(err => {
          setErrors([{ msg: err.message }]);
          setLoading(false);
        });
    }
  }, [isEdit, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setSubmitting(true);

    const url = isEdit ? `/api/genre/${id}/update` : '/api/genre/create';
    const method = isEdit ? 'PUT' : 'POST'; // Use PUT for updates

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          navigate('/genres');
        } else {
          setErrors(data.errors || [{ msg: data.message || 'Submission failed' }]);
        }
      })
      .catch(err => {
        setErrors([{ msg: 'Network error: ' + err.message }]);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading) return <div>Loading genre data...</div>;

  return (
    <div>
      <h1>{isEdit ? 'Edit Genre' : 'Create New Genre'}</h1>
      
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Genre Name:</label>
          <input
            id="name"
            className="form-control"
            type="text"
            placeholder="Fantasy, Poetry, etc."
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="form-text">
            Genre name must be at least 3 characters long.
          </div>
        </div>

        <button 
          className="btn btn-primary me-2" 
          type="submit" 
          disabled={submitting}
        >
          {submitting ? 'Saving...' : (isEdit ? 'Update Genre' : 'Create Genre')}
        </button>
        
        <button 
          type="button" 
          className="btn btn-secondary" 
          onClick={() => navigate('/genres')}
        >
          Cancel
        </button>
      </form>

      {errors.length > 0 && (
        <div className="alert alert-danger mt-3">
          <h6>Errors:</h6>
          <ul className="mb-0">
            {errors.map((error, idx) => (
              <li key={idx}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GenreForm;