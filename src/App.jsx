import Products from './components/Products'
import './App.css'
import NavBar from './components/NavBar'
import Cart from './components/Cart'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {


  return (
    <Router>
<NavBar />
<Routes>
    <Route path = "/" element={<Products />} />
    <Route path="/cart" element={<Cart />} />
</Routes>

     </Router>
  )
}

export default App
