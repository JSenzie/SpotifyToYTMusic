import SearchPage from "./components/SearchPage"
import About from "./components/About"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Axios from "axios"
Axios.defaults.baseURL = "https://django-server-production-514c.up.railway.app"

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
