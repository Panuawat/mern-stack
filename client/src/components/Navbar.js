import React from "react";
import { Link,useNavigate } from "react-router-dom";
import { getUser,logout } from "../services/authorize";

function Navbar() {
  const navigate = useNavigate()
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item pr-3 pt-3 pb-3">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        {
          getUser() && 
          <li className="nav-item pr-3 pt-3 pb-3">
            <Link className="nav-link" to="/create">Write an article</Link>
          </li>
        }
          
        {
          !getUser() && (
            <li className="nav-item pr-3 pt-3 pb-3">
              <Link className="nav-link" to="/login">Log in</Link>
            </li>
          )
        }
        {
          getUser() &&
          <li className="nav-item pr-3 pt-3 pb-3">
              <button className="nav-link" onClick={() => logout(() => navigate('/login'))} >Log out</button>
            </li>
        }
            
      </ul>
    </nav>
  );
}

export default Navbar;
