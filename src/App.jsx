import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Book from './Book';
import BookForm from './BookForm';
import Magazine from './Magazine';
import MagazineForm from './MagazineForm';
import './App.css';

function App() {
  // ── Books state ────────────────────────────────────────────────
  const [books, setBooks]                   = useState([]);
  const [bookToUpdate, setBookToUpdate]     = useState(null);

  // ── Magazines state ────────────────────────────────────────────
  const [magazines, setMagazines]               = useState([]);
  const [magazineToUpdate, setMagazineToUpdate] = useState(null);

  // ── Simple client-side routing via hash ────────────────────────
  const [route, setRoute] = useState(window.location.hash || '#/books');

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ── Fetch books on mount ───────────────────────────────────────
  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error('Error fetching books:', err));
  }, []);

  // ── Fetch magazines on mount ───────────────────────────────────
  useEffect(() => {
    fetch('/api/magazines')
      .then((res) => res.json())
      .then((data) => setMagazines(data))
      .catch((err) => console.error('Error fetching magazines:', err));
  }, []);

  // ════════════════════════════════════════════════════════════════
  // BOOK CRUD handlers
  // ════════════════════════════════════════════════════════════════

  const addBook = (book) => {
    fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book),
    })
      .then((res) => res.json())
      .then((newBook) => setBooks([...books, newBook]))
      .catch((err) => console.error('Error adding book:', err));
  };

  const deleteBook = (id) => {
    fetch(`/api/books/${id}`, { method: 'DELETE' })
      .then(() => setBooks(books.filter((b) => b.id !== id)))
      .catch((err) => console.error('Error deleting book:', err));
  };

  const updateBook = (updatedBook) => {
    fetch(`/api/books/${updatedBook.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((saved) =>
        setBooks(books.map((b) => (b.id === saved.id ? saved : b)))
      )
      .catch((err) => console.error('Error updating book:', err));
    setBookToUpdate(null);
  };

  // ════════════════════════════════════════════════════════════════
  // MAGAZINE CRUD handlers
  // ════════════════════════════════════════════════════════════════

  const addMagazine = (magazine) => {
    fetch('/api/magazines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(magazine),
    })
      .then((res) => res.json())
      .then((newMag) => setMagazines([...magazines, newMag]))
      .catch((err) => console.error('Error adding magazine:', err));
  };

  const deleteMagazine = (id) => {
    fetch(`/api/magazines/${id}`, { method: 'DELETE' })
      .then(() => setMagazines(magazines.filter((m) => m.id !== id)))
      .catch((err) => console.error('Error deleting magazine:', err));
  };

  const updateMagazine = (updatedMagazine) => {
    fetch(`/api/magazines/${updatedMagazine.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMagazine),
    })
      .then((res) => res.json())
      .then((saved) =>
        setMagazines(magazines.map((m) => (m.id === saved.id ? saved : m)))
      )
      .catch((err) => console.error('Error updating magazine:', err));
    setMagazineToUpdate(null);
  };

  // ════════════════════════════════════════════════════════════════
  // Routing
  // ════════════════════════════════════════════════════════════════

  const renderRoute = () => {
    switch (route) {
      case '#/books':
        return (
          <>
            <h1>Books</h1>
            {bookToUpdate && (
              <BookForm
                bookToUpdate={bookToUpdate}
                onUpdate={updateBook}
                onAdd={addBook}
              />
            )}
            {books.map((book) => (
              <Book
                key={book.id}
                book={book}
                onDelete={deleteBook}
                onUpdate={(b) => setBookToUpdate(b)}
              />
            ))}
          </>
        );

      case '#/add-book':
        return (
          <>
            <h1>Add Book</h1>
            <BookForm onAdd={addBook} />
          </>
        );

      case '#/magazines':
        return (
          <>
            <h1>Magazines</h1>
            {magazineToUpdate && (
              <MagazineForm
                magazineToUpdate={magazineToUpdate}
                onUpdate={updateMagazine}
                onAdd={addMagazine}
              />
            )}
            {magazines.map((mag) => (
              <Magazine
                key={mag.id}
                magazine={mag}
                onDelete={deleteMagazine}
                onUpdate={(m) => setMagazineToUpdate(m)}
              />
            ))}
          </>
        );

      case '#/add-magazine':
        return (
          <>
            <h1>Add Magazine</h1>
            <MagazineForm onAdd={addMagazine} />
          </>
        );

      default:
        return <h1>Page Not Found</h1>;
    }
  };

  return (
    <>
      <Navbar />
      <main>{renderRoute()}</main>
    </>
  );
}

export default App;
