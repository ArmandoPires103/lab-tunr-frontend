import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

function SongEditForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [song, setSong] = useState({
    name: "",
    artist: "",
    album: "",
    time: "",
    is_favorite: false,
  });

  useEffect(() => {
    fetch(`${API}/songs/${id}`)
      .then((res) => res.json())
      .then((data) => setSong(data))
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${API}/songs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    })
      .then(() => navigate(`/songs/${id}`))
      .catch((error) => console.error(error));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSong({ ...song, [name]: value });
  };

  return (
    <div>
      <h2>Edit Song</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={song.name}
          onChange={handleInputChange}
        />
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={song.artist}
          onChange={handleInputChange}
        />
        <label htmlFor="album">Album:</label>
        <input
          type="text"
          id="album"
          name="album"
          value={song.album}
          onChange={handleInputChange}
        />
        <label htmlFor="time">Time:</label>
        <input
          type="text"
          id="time"
          name="time"
          value={song.time}
          onChange={handleInputChange}
        />
        <label htmlFor="is_favorite">Is Favorite:</label>
        <input
          type="checkbox"
          id="is_favorite"
          name="is_favorite"
          checked={song.is_favorite}
          onChange={(e) =>
            setSong({ ...song, is_favorite: e.target.checked })
          }
        />
        <button type="submit">Submit</button>
        <Link to={`/songs/${id}`}>Cancel</Link>
      </form>
    </div>
  );
}

export default SongEditForm;
