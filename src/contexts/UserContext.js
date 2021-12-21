import { createContext, useState } from 'react';

const UserContext = createContext(null);

const initVal = {
  loggedIn: !!localStorage.getItem('user.token'),
  token: localStorage.getItem('user.token'),
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initVal);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
