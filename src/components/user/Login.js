import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';

const ADMIN_USER = 'admin_user';
const NORMAL_USER = 'normal_user';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [_, setUser] = useContext(UserContext);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!username || !password) {
      alert('Please complete all field!');
      return;
    }

    const config = {
      url: 'https://rohanpahwa71.pythonanywhere.com/blog/api-token-auth/',
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const res = await fetch(config.url, config);
      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem('user.token', data.token);
        setUser({ loggedIn: true, token: data.token });
      } else {
        alert(data.msg || data.detail || 'Invalid Login Creds!');
      }
    } catch (e) {
      console.log(e);
      alert('An unknown error occured!');
    }
  };

  return (
    <main className="main">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h2 className="fTitle">
          <span>Login</span>
        </h2>
        <div className="fCtrlRow">
          <label htmlFor="username" className="fLabel">
            Enter your Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="fCtrl"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="fCtrlRow">
          <label htmlFor="password" className="fLabel">
            Enter your Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="fCtrl"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="fSubmitRow">
          <button type="submit">Login</button>
        </div>
      </form>
    </main>
  );
};

export default Login;
