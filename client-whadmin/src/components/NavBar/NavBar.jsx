import { Link, useNavigate } from 'react-router-dom';
import { Fragment } from 'react';
import {toast} from 'react-hot-toast'
import LazadaImg from "../../images/lazada.jpg"

import {FaUserCircle} from "react-icons/fa"
import {FaBoxesPacking} from "react-icons/fa6"

import { IconSetting } from '../../utils/IconSettings'
import { deleteDataAPI } from '../../../../client-mall/src/api/apiRequest';

const NavBar = () => {
    const navigate = useNavigate()
    const handleLogOut = async() => {
        const userData = JSON.parse(localStorage.getItem("userInfo"))?.username
        try {
            const response = await deleteDataAPI("auth/logout", {username: userData});
            if (response.status === 200 || response.status === 201) {
                localStorage.removeItem("userInfo")
                toast.success(`Log Out Successfully`);
                navigate("/login")
            }
        } catch (error) {
          // localStorage.setItem("userInfo", userData)
            toast.error(error);
        }
    }


    return (
        <Fragment>
            <div className="navbar navbar_vertical">
                <div className="navbar-logo">
                    <Link to="/warehouse">
                        <img src={LazadaImg} alt="" style={{width: "55px"}}/>
                    </Link>
                </div>
                <div className="navbar_vertical_content mt-4">
                    <ul className="navbar-nav flex-column mb-3">
                        <li className="nav_item">
                            <Link to="/warehouse">
                                {IconSetting(<FaBoxesPacking/>, 'white', "30px", "nav_icon")}
                                <span className="nav_text text-white">Warehouse</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>

            <div className="navbar navbar-expand-lg navbar-light top_navbar">
                <div className="container-fluid">
                    <div className="navbar_spacer" style={{width: "30px"}}></div>

                    <div className="navbar_user d-flex">
                        <div className="d-flex me-4" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="nav-link" >
                                {IconSetting(<FaUserCircle />, "black", "30px")}
                            </span>     
                        </div>  
                        <div className="dropdown-menu avatar-menu" aria-labelledby="navbarDropdown" style={{left: "unset", right: "25px", top: "50px"}}>
                            <Link className="dropdown-item" to={`/profile`} >My Profile</Link>
                            <span className="dropdown-item" style={{cursor: "pointer"}} onClick={handleLogOut}>Log Out</span>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>

    )
}

export default NavBar;