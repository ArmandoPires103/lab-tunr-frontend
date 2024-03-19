import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

function SongDetails() {
  const [song, setSong] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/songs/${id}`)
      .then((res) => res.json())
      .then((data) => setSong(data))
      .catch((error) => console.error(error));
  }, [id]);

  const deleteSong = () => {
    fetch(`${API}/songs/${id}`, {
      method: "DELETE",
    })
      .then(() => navigate("/songs"))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>{song.name}</h2>
      <p>Artist: {song.artist}</p>
      <p>Album: {song.album}</p>
      <p>Time: {song.time}</p>
      <p>Is Favorite: {song.is_favorite ? "Yes" : "No"}</p>
      <button onClick={deleteSong}>Delete</button>
      <Link to={`/songs/${id}/edit`}>Edit</Link>
      <br />
      <Link to="/songs">Back to Songs</Link>
    </div>
  );
}

export default SongDetails;