import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext';
import './index.css';
import App from './App';

render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
