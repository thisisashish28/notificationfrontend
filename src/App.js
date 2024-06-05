import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import AppRoutes from './AppRoutes';
import Notifications from './components/Notifications/Notifications';

function App() {
  return (
    <div>
      <Notifications />
      <AppRoutes />
    </div>
  );
}

export default App;
