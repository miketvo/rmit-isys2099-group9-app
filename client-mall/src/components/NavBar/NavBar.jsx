import { Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { toast } from "react-hot-toast";


import {MdDashboard} from "react-icons/md";

import { FaCircleUser } from "react-icons/fa6";
import {IconSetting} from "../../utils/IconSetting"

import { deleteDataAPI} from "../../api/apiRequest";


const NavBar = ({isLoggedIn, setIsLoggedIn}) => {
  // const userRole = JSON.parse(localStorage.getItem("userInfo"))?.role

  const handleLogOut = async() => {
    try {
      const username = JSON.parse(localStorage.getItem("userInfo")).username

      const response = await deleteDataAPI("auth/logout", {username: username});
      if (response.data) {
        localStorage.removeItem("userInfo")
        toast.success(`Log Out Successfully`);
        setIsLoggedIn(false);
      }
      
    } catch (error) {
      toast.error(error);
    }
  }

  return (
    <>
      <nav className="navbar horizontal_navbar navbar-expand-lg navbar-light bg-light">
        <div className="container px-4 px-lg-5">
          <Link to="/" className="navbar-brand" href="#!">
            Logo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
            <ul className="navbar-nav mb-2 mb-lg-0 ms-lg-4">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>      
            </ul>

            

            <div className="d-flex">
              <Link to="/dashboard" className="btn btn-outline-dark"> 
                <span>   
                  {IconSetting(<MdDashboard/>, "", "", "me-3")}
                  Dashboard
                </span>
              </Link>

              {
                isLoggedIn ? (
                  <div className="navbar_user d-flex align-items-center ms-4">
                        <div className="d-flex" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="nav-link" >
                                {IconSetting(<FaCircleUser />, "black", "30px")}
                            </span>     
                        </div>  
                        <div className="dropdown-menu avatar-menu" aria-labelledby="navbarDropdown" style={{left: "unset", right: "25px", top: "50px"}}>
                            <span className="dropdown-item" onClick={handleLogOut} style={{cursor: "pointer"}}>Log Out</span>
                        </div>
                  </div>
                )
                :
                (
                  <Link to="/login" className="btn btn-outline-dark mx-2">
                    Login
                  </Link>
                )
              }
              
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired, // isLoggedIn should be a boolean and is required.
  setIsLoggedIn: PropTypes.func.isRequired, // setIsLoggedIn should be a function and is required.
};

export default NavBar;
