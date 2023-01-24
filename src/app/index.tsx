import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/home"
import { Authorization } from "../pages/authorization"

export function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authorization" element={<Authorization />} />
      </Routes>
    )
  }
