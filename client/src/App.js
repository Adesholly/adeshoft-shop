import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"

function App() {
  return (
    <div className='App antialiasing text-gray-700'>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path='/' exact element={<HomeScreen />} />
            <Route path='/:id' element={<ProductScreen />} />
            <Route path='/cart' element={<CartScreen />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
