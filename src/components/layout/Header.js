import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import UserContext from '../../contexts/UserContext';

const Header = () => {
  const [{ loggedIn }, setUser] = useContext(UserContext);

  const handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem('user.token');
    setUser({ loggedIn: false });
  };

  return (
    <header className="header">
      <div className="container">
        <h1>ReactBlog</h1>
        <nav>
          {loggedIn ? (
            <>
              <NavLink to="/">Blogs</NavLink>
              <NavLink to="/create">Create</NavLink>
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Signup</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
