import React from 'react';
import {Link} from 'react-router-dom';

import { useActions } from '../hooks/use-actions'; 
import { useTypedSelector } from '../hooks/use-typed-selector';


const Nav: React.FC = () => {   
  const { logout } = useActions(); 
  const {auth: {isAuthenticated}} = useTypedSelector( state => state); 
  
  let menu;
  if (!isAuthenticated) {
      menu = (
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item active">
                  <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item active">
                  <Link to="/register" className="nav-link">Register</Link>
              </li>
          </ul>
      )
  } else {
      menu = (
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item active">
                  <Link to="/login" className="nav-link" onClick={()=>logout()}>Logout</Link>
              </li>
          </ul>
      )
  }

  return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
          <div className="container-fluid">
              <Link to="/" className="navbar-brand">My Diary</Link>
              <div>
                  {menu}
              </div>
          </div>
      </nav>
  );
}

export default Nav;
