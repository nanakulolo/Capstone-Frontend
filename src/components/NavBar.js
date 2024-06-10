import React, { useState } from 'react'

const NavBar = ({ genres, onSelectGenre, onSearchMovie }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    onSearchMovie(searchTerm)
  }

  return (
    <div className="nav-bar">
      <div className="nav-bar-left">
        {genres.map((genre) => (
          <button key={genre} onClick={() => onSelectGenre(genre)}>
            {genre}
          </button>
        ))}
      </div>
      <div className="nav-bar-right">
        <form onSubmit={handleSearchSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search fiction..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  )
}

export default NavBar
