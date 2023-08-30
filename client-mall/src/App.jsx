// import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import styles

// Page Routing
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

// NavBar Component
// import NavBar from "./components/NavBar/NavBar";

// Page
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import SellerDashboardPage from "./pages/sellerDashboard.jsx";

function App() {
  return (
    <Router>
      <div className="">
        {/* <NavBar /> */}
        <Routes>
          {/* Authentication an Authorization */}
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/register" element={<RegisterPage />} />

          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/seller-dashboard"
            element={<SellerDashboardPage />}
          />

          <Route exact path="/" element={<PrivateRouter />}>
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
      </div>
    </Router>
  );
}

export default App;
