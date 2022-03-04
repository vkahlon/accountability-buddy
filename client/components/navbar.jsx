import React from 'react';
export default function Navbar(props) {
  let featurePages = null;
  if (props.user) {
    featurePages = <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#calculator" style={{ color: '#007BFF' }}>Calculator</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#meals" style={{ color: '#007BFF' }}>Meals</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#exercises" style={{ color: '#007BFF' }}>Exercises</a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#codex" style={{ color: '#007BFF' }}>Codex</a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" style={{ color: '#007BFF' }} role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Edit
        </a>
        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
          <a className="dropdown-item bg-dark" style={{ color: '#007BFF' }} href="#edit-meal">Meal</a>
          <a className="dropdown-item bg-dark" style={{ color: '#007BFF' }} href="#edit-exercise">Exercises</a>
        </div>
      </li>
    </ul>;
  }
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Accountability Buddy</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {featurePages}
          <ul className="navbar-nav d-flex justify-content-end">
            <li className="nav-item active d-flex justify-content-end">
              <a className="nav-link mr-4" href="#sign-in" style={{ color: '#007BFF' }}>Sign In</a>
              <a className="nav-link" href="#register" style={{ color: '#007BFF' }}>Register</a>
            </li>
          </ul>
        </div>
      </nav>
  );
}
