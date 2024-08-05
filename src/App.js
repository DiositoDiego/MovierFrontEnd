import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginForm from './components/forms/LoginForm'
import SignUpForm from './components/forms/SignUpForm'
import Navbar from './components/navigation/MoviesNavbar';
import Movies from './views/Movies';
import Movie from './views/Movie';
import CompleteLoginForm from './components/forms/CompleteLoginForm';
import { PageNotFund } from './views/common/PageNotFund';
import { CreateMovie } from './views/admin/CreateMovie';
import Logout from './components/forms/Logout';
import { MoviesList } from './views/admin/MoviesList';
import { EditMovie } from './views/admin/EditMovie';
import WatchedMovies from './views/WatchedMovies';
import ForbiddenPage from './views/common/ForbiddenPage';
import ProtectedRoute from './components/security/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate to="/login" />}></Route>
        <Route path='/login' element={<LoginForm />}></Route>
        <Route path='/signup' element={<SignUpForm />}></Route>
        <Route path='/complete-login' element={<CompleteLoginForm />}></Route>
        <Route path='/logout' element={<Logout />}></Route>
        <Route path='/movies'>
          <Route index element={<ProtectedRoute element={Movies} allowedRoles={["Usuario", "Administrador"]} />}></Route>
          <Route path='m/:id' element={<ProtectedRoute element={Movie} allowedRoles={["Usuario", "Administrador"]} />}></Route>
          <Route path='watched' element={<ProtectedRoute element={WatchedMovies} allowedRoles={["Usuario", "Administrador"]} />}></Route>
        </Route>
        <Route path='/create-movie' element={<ProtectedRoute element={CreateMovie} allowedRoles={"Administrador"} />}></Route>
        <Route path='/list-movies' element={<ProtectedRoute element={MoviesList} allowedRoles={"Administrador"} />}></Route>
        <Route path='/edit-movie' element={<ProtectedRoute element={EditMovie} allowedRoles={"Administrador"} />}></Route>
        <Route path='/forbidden' element={<ForbiddenPage />}></Route>
        <Route path='*' element={<PageNotFund />}></Route>
      </Routes>
    </div>
  );
}

export default App;
