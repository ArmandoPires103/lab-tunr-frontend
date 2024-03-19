import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_BASE_URL;

function Songs() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch(`${API}/songs`)
      .then((res) => res.json())
      .then((data) => setSongs(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="Songs">
      <section>
        <h2>Songs</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Artist</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr key={song.id}>
                <td>
                  <Link to={`/songs/${song.id}`}>{song.name}</Link>
                </td>
                <td>{song.artist}</td>
                <td>{song.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <Link to="/songs/new">Add New Song</Link>
    </div>
  );
}

export default Songs;

