import {Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <Routes>
      <Route path="/" Component={Dashboard} />
      <Route path="/login" Component={Login} />
    </Routes>
  );
}

export default App;
