import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Misc from './views/Misc';
import LoginForm from './components/forms/LoginForm'
import SignUpForm from './components/forms/SignUpForm'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Misc/>}></Route>
        <Route path='/login' element={<LoginForm/>}></Route>
        <Route path='/signup' element={<SignUpForm/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
