import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Authentication from "./Authentication/Authentication";
import Home from "./Home/Home";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Authentication/*" element={<Authentication />}></Route>

          <Route
            path="/"
            element={<Navigate to="/Authentication/login" replace />}
          />
          <Route path="/*" element={<Home />}></Route>
          <Route
            path="/Authentication"
            element={<Navigate to="/Authentication/login" replace />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
