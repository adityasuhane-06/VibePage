import { useState } from 'react'

import './App.css'
import Navbar from './component/Navbar'
import { Routes,Route } from 'react-router-dom'
import UserAuthForm from './Pages/UserAuthForm.pages'
import Login from './Pages/Login.pages'
import Editor from './Pages/editor.pages'
import HomePage from './Pages/home.page'
import SearchPage from './Pages/search.page.jsx'
import PageNotFound from './Pages/404.page'
import ProfilePage from './Pages/profile.page'
import BlogPage from './Pages/blog.page'
import { useSelector } from 'react-redux'
import ProtectedRoute from './component/ProtectedRoute'
function App() {
  const {isLoggedIN, accessToken} = useSelector((state) => state.auth.data);

  return (
    <>
    <Routes>
      <Route path='/' element={<Navbar />} >
      <Route index element={<HomePage/>}/>
      
      
      <Route path ='/signup'  element={<UserAuthForm/>} />
      <Route path ='/login' element={<Login/>} />
      <Route path ='/write' element={<Editor/>} />
      <Route  path='search/:query/' element={<SearchPage />} />
      
      <Route path='/about' element={
        <ProtectedRoute>
        <ProfilePage/>
        </ProtectedRoute>
        } />
      <Route path="user/:id" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
        
        } />
      <Route path='/blog/:blog_id' element={
        <ProtectedRoute>
        <BlogPage/>
        </ProtectedRoute>
        } />
      <Route path='*' element={<PageNotFound />} />
      </Route>
      

    </Routes>
    
    </>
  )
}

export default App
