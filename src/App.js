import { useContext, useEffect } from 'react';
import UserContext from './contexts/UserContext';
import Layout from './components/layout/Layout';
import GuestRouter from './routers/GuestRouter';
import UserRouter from './routers/UserRouter';

const App = () => {
  const [user, setUser] = useContext(UserContext);

  const fetchUsers = async () => {
    const config = {
      url: 'https://rohanpahwa71.pythonanywhere.com/blog/users/',
      method: 'GET',
      headers: { Authorization: 'Token ' + user.token },
    };

    try {
      const res = await fetch(config.url, config);
      const data = await res.json();

      if (data.length === 1 && data[0].user_type === 'normal_user') {
        setUser({ ...user, data: data[0] });
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log(e);
      alert('Cannot fetch user details!');
    }
  };

  useEffect(() => {
    if (user.loggedIn) fetchUsers();
  }, [user.loggedIn]);

  return (
    <Layout>
      {user.loggedIn ? (
        user.data ? (
          <UserRouter />
        ) : (
          <div className="pageLoader">Loading...</div>
        )
      ) : (
        <GuestRouter />
      )}
    </Layout>
  );
};

export default App;
