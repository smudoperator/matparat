import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Import pages
import Home from './pages/Home';
import Dinners from './pages/Dinners';
import CreateDinnerPlan from './pages/CreateDinnerPlan';
import AddDinner from './pages/AddDinner';
import EditDinner from './pages/EditDinner';
import DinnerPlanPage from './pages/DinnerPlanPage';

function App() {
  return (
    <Router basename="/matparat">
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dinners" element={<Dinners />} />
          <Route path="/Dinners/edit/:id" element={<EditDinner />} />
          <Route path="/AddDinner" element={<AddDinner />} />
          <Route path="/CreateDinnerPlan" element={<CreateDinnerPlan />} />
          <Route path="/DinnerPlan" element={<DinnerPlanPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
