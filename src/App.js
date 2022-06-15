import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';

//components
import Main from './pages/Main';
import Main2 from './pages/Main2';
import SignUp from './pages/SignUp';
import Detail from './pages/Detail';
import Add from './pages/Add';

function App() {

  return (

    <Routes>
      <Route exact path="/"  element={<Main />} />
      <Route exact path="/asdf"  element={<Main2 />} />
      <Route exact path="/signup" element={<SignUp />} />
      <Route exact path="/detail/:postId"element={<Detail />} />
      <Route exact path="/detail" element={<Detail />} />
      <Route exact path="/post" element={<Add />} />
      <Route path='*' element={<div>Not Found</div>}></Route>
    </Routes>
  
  )
}


export default App
