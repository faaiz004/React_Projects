import Landing from "./components/Landing";
import Signup from "./components/Signup";
import Edit from "./components/Edit";
import "./App.css";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./components/Context";
function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element = {<Dashboard/>} />
            <Route path = "/dashboard/:id" element = {<Edit/>}/>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
