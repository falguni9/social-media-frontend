import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Social Media App</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/newsfeed">News Feed</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/messaging">Messaging</Link>
          </li>
          {/* Add more navigation links for other pages */}
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
