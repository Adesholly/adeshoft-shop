import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import HomeScreen from "./screens/HomeScreen"

function App() {
  return (
    <div className='App antialiasing text-gray-700'>
     <Navbar />
     <main>
      <div className="">
        <HomeScreen />
      </div>
     </main>
    <Footer />
    </div>
  )
}

export default App
