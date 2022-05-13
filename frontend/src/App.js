import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Upload from './pages/Upload/Upload'
import Home from './pages/home/Home'
import Single from './pages/single/Single'
import List from './pages/list/List'
import New from './pages/new/New'
import { productInputs, userInputs } from "./formSource";
import Goals from './pages/goals/Goals'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { useSelector } from "react-redux";


function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Router>
        
           
      <div className="home">
      <Sidebar />
      <div className="homeContainer">
          <Navbar />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/home' element={<Home />} />
            <Route path='/goals' element={<Goals />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Routes>
        </div></div>
      </Router>
    
      <ToastContainer />
    </>
  )
}

export default App
