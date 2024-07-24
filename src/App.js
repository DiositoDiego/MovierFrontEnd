import logo from './logo.svg';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Misc from './views/Misc';
import LoginForm from './components/forms/LoginForm'
import SignUpForm from './components/forms/SignUpForm'
import Navbar from './components/navigation/MoviesNavbar';
import Movies from './views/Movies';
import Movie from './views/Movie';
import CompleteLoginForm from './components/forms/CompleteLoginForm';
import { PageNotFund } from './views/common/PageNotFund';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
        <Route path='/signup' element={<SignUpForm />}></Route>
        <Route path='/complete-login' element={<CompleteLoginForm />}></Route>
        <Route path='/movies' element={<Navbar />}>
          <Route index element={<Movies />}></Route>
          <Route path='m/:id' element={<Movie />}></Route>
        </Route>
        <Route path='*' element={<PageNotFund />}></Route>
      </Routes>
    </div>
  );
}

export default App;
