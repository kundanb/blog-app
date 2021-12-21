import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';

const ADMIN_USER = 'admin_user';
const NORMAL_USER = 'normal_user';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [userType, setUserType] = useState('');

  const [user, setUser] = useContext(UserContext);

  const handleSubmit = e => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !username ||
      !password ||
      !phone ||
      !userType
    ) {
      alert('Please complete all fields!');
      return;
    }

    fetch('https://rohanpahwa71.pythonanywhere.com/blog/users/', {
      method: 'POST',
      body: JSON.stringify({
        user: { username, password },
        first_name: firstName,
        last_name: lastName,
        phone,
        user_type: userType,
      }),
      headers: { 'Content-Type': 'application/json' },
    }).then(res => {
      const jsonRes = res.json();

      jsonRes.then(data => {
        if (res.status === 200) {
          localStorage.setItem('user.token', data.Token);
          setUser({ loggedIn: true, token: data.Token });
        } else {
          alert(data.msg || data.detail);
        }
      });
    });
  };

  return (
    <main className="main">
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h2 className="fTitle">
          <span>Signup</span>
        </h2>

        <div className="fCtrlRow">
          <label htmlFor="firstName" className="fLabel">
            Enter your First Name
          </label>
          <input
            type="text"
            name="first_name"
            id="firstName"
            className="fCtrl"
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className="fCtrlRow">
          <label htmlFor="lastName" className="fLabel">
            Enter your Last Name
          </label>
          <input
            type="text"
            name="last_name"
            id="lastName"
            className="fCtrl"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <div className="fCtrlRow">
          <label htmlFor="username" className="fLabel">
            Create a Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="fCtrl"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="fCtrlRow">
          <label htmlFor="password" className="fLabel">
            Create a Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="fCtrl"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="fCtrlRow">
          <label htmlFor="phone" className="fLabel">
            Enter your Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            className="fCtrl"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
        </div>

        <div className="fCtrlRow fRadioGrpRow">
          <p className="fLabel">Choose a User Type</p>
          <div className="fCtrlGrp fRadioGrp">
            <input
              type="radio"
              name="user_type"
              id="adminUser"
              className="fRadio"
              value={ADMIN_USER}
              onChange={e => setUserType(e.target.value)}
              checked={userType === ADMIN_USER}
            />
            <label htmlFor="adminUser" className="fLabel">
              Admin
            </label>

            <input
              type="radio"
              name="user_type"
              id="normalUser"
              className="fRadio"
              value={NORMAL_USER}
              onChange={e => setUserType(e.target.value)}
              checked={userType === NORMAL_USER}
            />
            <label htmlFor="normalUser" className="fLabel">
              Normal
            </label>
          </div>
        </div>

        <div className="fSubmitRow">
          <button type="submit">Signup</button>
        </div>
      </form>
    </main>
  );
};

export default Signup;
