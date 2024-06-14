//import logo from './logo.svg';
//import './App.css';
import Navbar from './component/Navbar';
import About from './component/About';
import { Dashboard } from "./component/Dashboard";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import Signin from './component/Signin';
import Signup from './component/Signup';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 2500);
  }

  return (
    <NoteState>
      <div className="App" >
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Dashboard showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/signin" element={<Signin showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
            </Routes>
          </div>
        </Router>
      </div>
    </NoteState>

  );
}

export default App;
