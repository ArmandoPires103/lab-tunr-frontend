import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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

  const handleTextChange = (event) => {
    setSong({ ...song, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setSong({ ...song, is_favorite: !song.is_favorite });
  };

  // Update a bookmark. Redirect to show view
  const updateSong = () => {
    // console.log(`${API}/bookmarks/${id}`);

    fetch(`/songs/${id}`, {
      method: "PUT",
      body: JSON.stringify(song),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate(`/songs/${id}`))
      .catch((error) => console.error("catch", error));
  };

  // On page load, fill in the form with the bookmark data.
  useEffect(() => {
    fetch(`/songs/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setSong(data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSong();
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={song.name}
          type="text"
          onChange={handleTextChange}
        />
        <label htmlFor="artist">Artist:</label>
        <input
          id="artist"
          type="text"
          value={song.artist}
          onChange={handleTextChange}
        />
        <label htmlFor="album">Album:</label>
        <input
          id="album"
          type="text"
          name="album"
          value={song.album}
          onChange={handleTextChange}
        />
        <label htmlFor="time">Title:</label>
        <input
          id="time"
          type="text"
          name="time"
          onChange={handleTextChange}
          checked={song.time}
        />
        <label htmlFor="is_favorite">Favorote:</label>
        <input
          id="is_favorite"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={song.is_favorite}
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/songs/${id}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default SongEditForm;