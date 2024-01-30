import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Add a CSS file and import it here

function Home() {
  const [books, setBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((response) => {
        const data = response.data.books;
        setBooks(data);
      })
      .catch(() => {
        console.error("Error fetching books");
      });
  }, []);

  useEffect(() => {
    const filteredBooks = books.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSearchedBooks(filteredBooks);
  }, [searchInput, books]);

  return (
    <>
      <nav className="navbar">
        <div className="logo">
          <div><img src="./logo.svg" alt="" /></div>
            <span id='book'>Books</span>
        </div>
        <div className='search-b'>
          <input
            type="text"
            placeholder="Search Books"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <div className='search'><img src="./search.png" alt="" id='search' /></div>
        </div>
        <div>
          <Link to="/register">
            <button className="register-button">
              Register
            </button>
          </Link>
        </div>
      </nav>

      <div className="book-grid">
        {searchedBooks.map((item) => (
          <div key={item.id} className="book-card">
            <div>
              <img className="book-image" src={item.imageLinks.smallThumbnail} alt={item.title} />
            </div>
            
            <div className='title'>
              <h3 className="book-title">{item.title}</h3>
              <p className="book-rating">⭐{item.averageRating ? item.averageRating : '3'} Free</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
