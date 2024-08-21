import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Dinners from './pages/Dinners';
import CreateDinnerPlan from './pages/CreateDinnerPlan';
import AddDinner from './pages/AddDinner';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dinners" element={<Dinners />} />
          <Route path="/AddDinner" element={<AddDinner />} />
          <Route path="/CreateDinnerPlan" element={<CreateDinnerPlan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
