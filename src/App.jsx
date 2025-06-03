import Products from './components/Products'
import './App.css'
import NavBar from './components/NavBar'
import Cart from './components/Cart'
import {useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {

const [search, setSearch] = useState("");
  return (
    <Router>
<NavBar search={search} setSearch={setSearch} />
<Routes>
    <Route path = "/" element={<Products search={search} />} />
    <Route path="/cart" element={<Cart search={search} />} />
</Routes>

     </Router>
  )
}

export default App
