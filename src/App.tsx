import { BrowserRouter, Route, Routes } from "react-router"
import HomePage from "./pages/home"
import ResultPage from "./pages/result"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
