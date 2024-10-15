import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "src/styles/global.scss";
import "src/styles/variable.scss";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
