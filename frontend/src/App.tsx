import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import ListEmployee from './components/ListEmployee';
import ListCareer from './components/ListCareer';
import ListSkill from './components/ListSkill'
import { ToastContainer } from "react-toastify";
function App() {
  return (
    
    <div className='app'>
      <ToastContainer position="top-center"/>
      <BrowserRouter>
        <Navbar />
        <Routes>
            <Route path="/" element={<ListEmployee />} />
            <Route path="/careers" element={<ListCareer />} />
            <Route path="/skills" element={<ListSkill />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
