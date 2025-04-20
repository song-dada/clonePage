import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './nav/Navbar'
import Index from './pages/Index'
import GuestBook from './pages/GuestBook';
function App() {
  return (
    <div className="App">
      <Router basename='/clonePage'>
        <Navbar/>
        <Routes>
          <Route path='/pagehome' element={<Index/>}/>
          <Route path='/guestbook' element={<GuestBook/>}/>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
