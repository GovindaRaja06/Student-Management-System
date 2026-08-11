
import './App.css';
import Delete from './components/Delete';
import Edit from './components/Edit';
import Addstd from './components/Addstd';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Addmark from './components/Addmark';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addstudent' element={<Addstd />} />
        <Route path='/editstudent' element={<Edit />} />
        <Route path='/deletestudent' element={<Delete />} />
        <Route path='/studentMark' element={<Addmark/>}/>
      </Routes>
    </div>
  );
}

export default App;
