import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './views/Home';
import NewAuthor from './views/NewAuthor'
import Edit from './views/Edit'

const App = () => {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" default />
          <Route element={<NewAuthor />} path="/authors/add" />
          <Route element={<Edit />} path="/authors/edit/:_id" />
        </Routes>
      </BrowserRouter>
    </div>
  ) 
}
export default App;