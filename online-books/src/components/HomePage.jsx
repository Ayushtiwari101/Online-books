import { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

function Home() {
  const [allBooks, setAllBooks] = useState([]);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searches, setSearches] = useState('');

  useEffect(() => {
    axios
      .get("https://reactnd-books-api.udacity.com/books", {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((response) => {
        const data = response.data.books;
        setAllBooks(data);
      })
      .catch(() => {
        console.log("Status code: 404");
        console.log("Website not found");
      });
  }, []);

  useEffect(() => {
    const filtered = allBooks.filter((item) =>
      item.title.toLowerCase().includes(searches.toLowerCase())
    );
    setSearchedBooks(filtered);
  }, [searches, allBooks]);

  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'black', color: '#fff' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Kalvium Books</div>
        <div>
          <input
            type="text"
            placeholder="Search Books"
            value={searches}
            onChange={(e) => setSearches(e.target.value)}
            style={{ padding: '0.5rem', borderRadius: '0.25rem', width: '300px' }}
            // Adjust the width property as needed
          />
        </div>
        <div>
          <button style={{ background: '#fff', color: 'red', padding: '0.5rem 1rem', borderRadius: '0.25rem', cursor: 'pointer', fontWeight:'bold' }}>Register</button>
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', padding: '1rem' }}>
        {searchedBooks.map((item) => (
          <div key={item.id}>
            <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '0.25rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                <img style={{ width: '100%', borderRadius: '0.25rem' }} src={item.imageLinks.smallThumbnail} alt={item.title} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{item.title}</h3>
              <div>
                <p>⭐{item.averageRating ? item.averageRating : '3'} Free</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
