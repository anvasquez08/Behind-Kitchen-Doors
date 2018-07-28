import React from 'react';
import history from '../History.jsx';
import {Navbar, NavbarBrand} from 'reactstrap';
import {withRouter} from 'react-router-dom';

const Nav = (props) => {
  return (
        <Navbar color="faded" dark className="navbar-header">
          <NavbarBrand className="ml-auto" onClick={() => history.push({pathname: '/results'})}>Behind the Glass</NavbarBrand>
			    <ul className="navbar-nav ml-auto" >
					  <a className="nav-item nav-link" onClick={() => history.push({pathname: '/bookmarks'})}>Bookmarks</a>
				    <a className="nav-item nav-link" onClick={() => history.push({pathname: '/login'})}>Login / Signup</a>		
			    </ul>
        </Navbar>
    );
  }

export default withRouter(Nav)
