import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from "./pages/NotFound";
function App() {
  return (
    <div className="App">

    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
      <Route path="/*" element={<NotFound />} />
      <Route path="/home/*" element={<NotFound />} />
    </Routes>
    </div>
  );
}

export default App;
