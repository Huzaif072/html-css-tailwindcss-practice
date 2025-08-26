import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BookInstanceForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookInstance, setBookInstance] = useState({
    book: '',
    imprint: '',
    due_back: '',
    status: 'Maintenance'
  });
  const [books, setBooks] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch books for the dropdown
    fetch('/api/books')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch books');
        return res.json();
      })
      .then(data => {
        setBooks(data);
        
        // If editing, fetch the book instance data
        if (isEdit && id) {
          return fetch(`/api/bookinstance/${id}`)
            .then(res => {
              if (!res.ok) throw new Error('Failed to fetch book instance');
              return res.json();
            })
            .then(instanceData => {
              setBookInstance({
                book: instanceData.book?._id || '',
                imprint: instanceData.imprint || '',
                due_back: instanceData.due_back ? instanceData.due_back.split('T')[0] : '',
                status: instanceData.status || 'Maintenance'
              });
            });
        }
      })
      .catch(err => {
        setErrors([{ msg: err.message }]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [isEdit, id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setBookInstance(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    
    const url = isEdit ? `/api/bookinstance/${id}/update` : '/api/bookinstance/create';
    const method = isEdit ? 'PUT' : 'POST'; // Use PUT for updates

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookInstance)
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          navigate('/bookinstances');
        } else {
          setErrors(data.errors || [{ msg: data.message || 'Submission failed' }]);
        }
      })
      .catch(err => {
        setErrors([{ msg: 'Network error: ' + err.message }]);
      });
  };

  if (loading) return <div>Loading form data...</div>;

  return (
    <div>
      <h1>{isEdit ? 'Edit Book Instance' : 'Create New Book Instance'}</h1>
      
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="mb-3">
          <label htmlFor="book" className="form-label">Book:</label>
          <select
            id="book"
            className="form-control"
            name="book"
            required
            value={bookInstance.book}
            onChange={handleChange}
          >
            <option value="">-- Select a Book --</option>
            {books.map(book => (
              <option key={book._id} value={book._id}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="imprint" className="form-label">Imprint:</label>
          <input
            id="imprint"
            className="form-control"
            type="text"
            name="imprint"
            placeholder="Publisher and date information"
            required
            value={bookInstance.imprint}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status:</label>
          <select
            id="status"
            className="form-control"
            name="status"
            required
            value={bookInstance.status}
            onChange={handleChange}
          >
            <option value="">-- Select Status --</option>
            {['Maintenance', 'Available', 'Loaned', 'Reserved'].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="due_back" className="form-label">Due Back Date (if not available):</label>
          <input
            id="due_back"
            className="form-control"
            type="date"
            name="due_back"
            value={bookInstance.due_back}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {isEdit ? 'Update Book Instance' : 'Create Book Instance'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/bookinstances')}>
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

export default BookInstanceForm;