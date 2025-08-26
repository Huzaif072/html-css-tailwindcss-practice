import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AuthorForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [author, setAuthor] = useState({
    first_name: '',
    family_name: '',
    date_of_birth: '',
    date_of_death: ''
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (isEdit && id) {
      fetch(`/api/author/${id}`)
        .then(res => {
          if (!res.ok) throw new Error('Failed to load author');
          return res.json();
        })
        .then(data => {
          if (data.author) {
            setAuthor({
              first_name: data.author.first_name || '',
              family_name: data.author.family_name || '',
              date_of_birth: data.author.date_of_birth ? data.author.date_of_birth.split('T')[0] : '',
              date_of_death: data.author.date_of_death ? data.author.date_of_death.split('T')[0] : ''
            });
          }
          setLoading(false);
        })
        .catch(err => {
          setErrors([{ msg: err.message }]);
          setLoading(false);
        });
    }
  }, [isEdit, id]);

  const handleChange = e => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    
    const url = isEdit
      ? `/api/author/${id}/update`
      : '/api/author/create';
      
    const method = isEdit ? 'PUT' : 'POST'; // Changed to PUT for update

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(author)
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          navigate('/authors');
        } else {
          setErrors(data.errors || [{ msg: data.message || 'Submission failed' }]);
        }
      })
      .catch(err => {
        setErrors([{ msg: 'Network error: ' + err.message }]);
      });
  };

  if (loading) return <div>Loading author data...</div>;

  return (
    <div>
      <h1>{isEdit ? 'Edit Author' : 'Create New Author'}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="first_name">First Name:</label>
          <input
            id="first_name"
            className="form-control"
            type="text"
            name="first_name"
            placeholder="First name"
            required
            value={author.first_name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="family_name">Family Name:</label>
          <input
            id="family_name"
            className="form-control"
            type="text"
            name="family_name"
            placeholder="Family name"
            required
            value={author.family_name}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date_of_birth">Date of Birth:</label>
          <input
            id="date_of_birth"
            className="form-control"
            type="date"
            name="date_of_birth"
            value={author.date_of_birth}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="date_of_death">Date of Death:</label>
          <input
            id="date_of_death"
            className="form-control"
            type="date"
            name="date_of_death"
            value={author.date_of_death}
            onChange={handleChange}
          />
        </div>
        
        <button className="btn btn-primary" type="submit">
          {isEdit ? 'Update Author' : 'Create Author'}
        </button>
        {' '}
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/authors')}>
          Cancel
        </button>
      </form>
      
      {errors.length > 0 && (
        <div style={{ color: 'red', marginTop: '1em' }}>
          <h4>Errors:</h4>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default AuthorForm;