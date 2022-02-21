import React from 'react';
export default class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Accountability Buddy</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#calculator" style={{ color: '#007BFF' }}>Calculator</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#meals" style={{ color: '#007BFF' }}>Meals</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link" href="#exercises" style={{ color: '#007BFF' }}>Exercises</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
