import { useState } from 'react'

import './App.css'
import Navbar from './component/Navbar'
import { Routes,Route } from 'react-router-dom'
import UserAuthForm from './Pages/UserAuthForm.pages'
import Login from './Pages/Login.pages'
import Editor from './Pages/editor.pages'
import HomePage from './Pages/home.page'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Navbar />} >
      <Route index element={<HomePage/>}/>
      
      
      <Route path ='/signup' element={<UserAuthForm/>} />
      <Route path ='/login' element={<Login/>} />
      <Route path ='/write' element={<Editor/>} />
      </Route>
      

    </Routes>
    
    </>
  )
}

export default App
