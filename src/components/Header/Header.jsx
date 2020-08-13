import React from "react";
import { Link } from "react-router-dom";
import './Header.css';

function Header() {
  return (
    <div className="navbar navbar-expand-sm bg-dark navbar-dark">
      <Link className="navbar-brand" to="/">
        {/* <Icon.Calendar2 className="mr-2" /> */}
        My BookShop
      </Link>

      <ul className="ml-3 navbar-nav ">
        <li className="nav-item">
          <Link className="nav-link" to="/books">
            Books
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/authors">
            Authors
          </Link>
        </li>

      </ul>
    </div>
  );
}

export default Header;
