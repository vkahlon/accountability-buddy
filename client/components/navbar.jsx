import React from 'react';
export default function Navbar(props) {
  let isSigned = <a className="nav-link mr-4" href="#sign-in"><span data-toggle="collapse" data-target="#navbarSupportedContent">Sign In</span></a>;
  let featurePages = null;
  if (props.token) {
    isSigned = <a onClick={props.onSignOut} className="nav-link mr-4" href="#">Sign Out</a>;
    featurePages = <ul className="navbar-nav mr-auto" data-toggle="collapse" data-target="#navbarSupportedContent">
      <li className="nav-item active">
        <a className="nav-link" href="#calculator"><span>Calculator</span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#meals"><span>Add Meal</span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#exercises"><span>Add Exercise</span></a>
      </li>
      <li className="nav-item active">
        <a className="nav-link" href="#codex"><span>Codex</span></a>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle text-light" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Edit
        </a>
        <div className="dropdown-menu bg-dark" aria-labelledby="navbarDropdown">
          <a className="dropdown-item bg-dark text-light" href="#edit-meal"><span>Meal</span></a>
          <a className="dropdown-item bg-dark text-light" href="#edit-exercise"><span>Exercise</span></a>
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
      <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ transition: 'height 0.01s' }}>
          {featurePages}
          <ul className="navbar-nav d-flex justify-content-end">
            <li className="nav-item active d-flex justify-content-end">
              {isSigned}
            <a className="nav-link" href="#register"><span data-toggle="collapse" data-target="#navbarSupportedContent">Register</span></a>
            </li>
          </ul>
        </div>
      </nav>
  );
}
