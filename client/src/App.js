import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import HomeScreen from "./screens/HomeScreen"

function App() {
  return (
    <div className='App'>
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
