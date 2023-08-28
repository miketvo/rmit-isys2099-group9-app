// import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

// Page Routing
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";



// Page
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import HomePage from './components/HomePage/HomePage'
import Layout from "./components/Layout";
 
function App() {
  const isAuth = localStorage.getItem("firstLogin");

  // useEffect(() => {
  //   fetch("http://localhost:3000/product")
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  //     .catch(err => console.error(err));
  // }, []);

  return (
    <Router>
      <div className="">
      <Layout>
        <Routes>
          {/* Authentication an Authorization */}
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/register" element={isAuth ? <Navigate to="/" /> : <RegisterPage />} />

          <Route exact path="/" element={<PrivateRouter auth={isAuth}/>}>
            <Route exact path="/" element={<HomePage/>} />
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
      </div>
    </Router>
  );
}

export default App;
