import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Search from "./pages/Search";
import { Navbar } from "./components";
import styles from "./style";
import { Toaster } from "react-hot-toast";


const App = () => (
  <Router>
     <div className="bg-primary w-full overflow-hidden">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
      </div>
     </div>
  </Router>
);

export default App;
