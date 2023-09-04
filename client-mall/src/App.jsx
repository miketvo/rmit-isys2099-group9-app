import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Toaster} from "react-hot-toast"

// Page Routing
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

// NavBar Component
import NavBar from "./components/NavBar/NavBar";

// Page
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SellerDashboardPage from "./pages/seller.jsx";
import { useState } from "react";
import DetailProductPage from "./pages/products/[id]";


function App() {
  const firstLogin = localStorage.getItem("userInfo")
  const [isLoggedIn, setIsLoggedIn] = useState(firstLogin ? true : false)

  return (
    <Router>
      <div className="">
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
          {/* Authentication an Authorization */}
          <Route exact path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />
          <Route exact path="/register" element={<RegisterPage/>} />

          <Route exact path="/" element={<PrivateRouter />}>
            <Route exact path="/" element={<HomePage />} />
            <Route
              exact
              path="/seller"
              element={<SellerDashboardPage />}
            />
            <Route exact path="/products/:id" element={<DetailProductPage />} />

            <Route exact path="/:page" element={<PageRender />} />
            <Route exact path="/:page/:id" element={<PageRender />} />
            <Route exact path="/:page/:id/:subPage" element={<PageRender />} />
            <Route
              exact
              path="/:page/:id/:subPage/:subId"
              element={<PageRender />}
            />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;