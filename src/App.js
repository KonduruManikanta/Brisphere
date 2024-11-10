import { Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import BookingDetails from "./components/BookingDetails";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="routes-bg-container">
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/booking" Component={BookingDetails} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
