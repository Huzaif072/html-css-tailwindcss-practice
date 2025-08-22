import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ErrorPage from './components/ErrorPage';

// Book Components
import BookList from './components/BookList';
import BookDetail from './components/BookDetail';
import BookForm from './components/BookForm';
import BookDelete from './components/BookDelete';

// Author Components
import AuthorList from './components/AuthorList';
import AuthorDetail from './components/AuthorDetail';
import AuthorForm from './components/AuthorForm';
import AuthorDelete from './components/AuthorDelete';

// Genre Components (you'll need to create these)
import GenreList from './components/GenreList';
import GenreDetail from './components/GenreDetail';
import GenreForm from './components/GenreForm';
import GenreDelete from './components/GenreDelete';

// BookInstance Components (you'll need to create these)
import BookInstanceList from './components/BookInstanceList';
import BookInstanceDetail from './components/BookInstanceDetail';
import BookInstanceForm from './components/BookInstanceForm';
import BookInstanceDelete from './components/BookInstanceDelete';

import './App.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Book Routes */}
          <Route path="/books" element={<BookList />} />
          <Route path="/books/create" element={<BookForm />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/:id/update" element={<BookForm isEdit={true} />} />
          <Route path="/books/:id/delete" element={<BookDelete />} />

          {/* Author Routes */}
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors/create" element={<AuthorForm />} />
          <Route path="/authors/:id" element={<AuthorDetail />} />
          <Route path="/authors/:id/update" element={<AuthorForm isEdit={true} />} />
          <Route path="/authors/:id/delete" element={<AuthorDelete />} />

          {/* Genre Routes */}
          <Route path="/genres" element={<GenreList />} />
          <Route path="/genres/create" element={<GenreForm />} />
          <Route path="/genres/:id" element={<GenreDetail />} />
          <Route path="/genres/:id/update" element={<GenreForm isEdit={true} />} />
          <Route path="/genres/:id/delete" element={<GenreDelete />} />

          {/* BookInstance Routes */}
          <Route path="/bookinstances" element={<BookInstanceList />} />
          <Route path="/bookinstances/create" element={<BookInstanceForm />} />
          <Route path="/bookinstances/:id" element={<BookInstanceDetail />} />
          <Route path="/bookinstances/:id/update" element={<BookInstanceForm isEdit={true} />} />
          <Route path="/bookinstances/:id/delete" element={<BookInstanceDelete />} />

          {/* 404 Error Route */}
          <Route path="*" element={<ErrorPage message="Page not found" status="404" />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;