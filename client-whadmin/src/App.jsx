// import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast"

// Page Routing
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

// Page
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import Layout from "./components/Layout";
 
function App() {
  return (
    <Router>
      <div className="">
      <Layout>
        <Routes>
          {/* Authentication an Authorization */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/" element={<PrivateRouter/>}>
            <Route exact path="/:page" element={<PageRender />} />
            <Route exact path="/:page/:id" element={<PageRender />} />
            <Route
              exact
              path="/:page/:id/:subPage"
              element={<PageRender />}
            />
            <Route
              exact
              path="/:page/:id/:subPage/:subId"
              element={<PageRender />}
            />
          </Route>
        </Routes>
      </Layout>
      <Toaster />
      </div>
    </Router>
  );
}

export default App;
