import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';

function AppRouter() {
  return (
    <Router>
      <Link to='/home'>Home</Link>
      <Link to='/products'>About</Link>

      <Routes>
        <Route path='/home' element={<Home/>} />
        <Route path='/products' element={<Catalogue/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
