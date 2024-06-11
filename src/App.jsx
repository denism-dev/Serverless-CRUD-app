import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Create from './components/Create'
import Update from './components/Update'
import Read from './components/Read'
import 'bootstrap/dist/css/bootstrap.min.css'


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/create' element={<Create />}></Route>
          <Route path='/update/:id' element={<Update />}></Route>
          <Route path='/read/:id' element={<Read />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App