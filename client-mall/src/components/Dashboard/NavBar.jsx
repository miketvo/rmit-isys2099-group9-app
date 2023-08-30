import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import LazadaImg from "../../images/lazada.jpg"

import {BiCategoryAlt} from "react-icons/bi"
import {FaUserCircle} from "react-icons/fa"
import {FaBoxesPacking, FaClipboardUser} from "react-icons/fa6"

import {IoHome} from "react-icons/io5"
import { IconSetting } from '../../utils/IconSettings'

const NavBar = () => {
    const handleLogOut = () => {
        console.log("Log out")
    }
    return (
        <Fragment>
            <div className="navbar dash_navbar_vertical">
                <div className="dash-navbar-logo">
                    <Link to="/">
                        <img src={LazadaImg} alt="" style={{width: "55px"}}/>
                    </Link>
                </div>
                <div className="dash_navbar_vertical_content mt-4">
                    <ul className="navbar-nav flex-column mb-3">
                        <li className="dash_nav_item">
                            <Link to="/">
                                {IconSetting(<IoHome/>, 'white', "30px", "nav_icon")}
                                <span className="nav_text text-white">Home</span>
                            </Link>
                        </li>
                        <li className="dash_nav_item">
                            <Link to="/seller-dashboard">
                                {IconSetting(<FaBoxesPacking/>, 'white', "30px", "nav_icon")}
                                <span className="nav_text text-white">Products</span>
                            </Link>
                        </li>
                        <li className="dash_nav_item">
                            <Link to=""> {/* TODO: Insert link here */}
                                {IconSetting(<FaClipboardUser/>, 'white', "30px", "nav_icon")}
                                <span className="nav_text text-white">Account</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>

            <div className="navbar navbar-expand-lg navbar-light dash_top_navbar">
                <div className="container-fluid">
                    
                    <div className="navbar_breadcrumb" aria-label="breadcrumb" style={{paddingLeft: "var(--verticalNavBarWidth)"}}>
                        <ol className="breadcrumb m-0">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active" aria-current="page">Library</li>
                        </ol>
                    </div>
                    
                    
                    <div className="navbar_user d-flex">
                        <div className="d-flex me-4" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span className="nav-link" >
                                {IconSetting(<FaUserCircle />, "black", "30px")}
                            </span>     
                        </div>  
                        <div className="dropdown-menu avatar-menu" aria-labelledby="navbarDropdown" style={{left: "unset", right: "25px", top: "50px"}}>
                            <Link className="dropdown-item" to={`/profile`} >My Profile</Link>
                            <span className="dropdown-item" onClick={handleLogOut}>Log Out</span>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>

    )
}

export default NavBar;