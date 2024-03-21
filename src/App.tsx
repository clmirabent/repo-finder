import './App.css'
import { Routes, Route } from "react-router";
import { BrowserRouter } from 'react-router-dom';


import RepositoryList from './pages/RepositoryList'
import MainDashboard from './pages/MainDashboard';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainDashboard />} />
        <Route path='/repositories' element={<RepositoryList />} />
      </Routes>
    </BrowserRouter>
  )
}



export default App
