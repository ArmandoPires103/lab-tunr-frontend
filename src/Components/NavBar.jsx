import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/songs">Songs</Link></li>
      </ul>
    </nav>
  );
}

export default NavBar;