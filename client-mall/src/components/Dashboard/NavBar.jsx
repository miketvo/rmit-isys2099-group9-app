import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import LazadaImg from "../../images/lazada.jpg"

// import {BiCategoryAlt} from "react-icons/bi"
import {FaBoxesPacking, FaClipboardUser} from "react-icons/fa6"

import {IoHome} from "react-icons/io5"
import { IconSetting } from '../../utils/IconSetting'

const NavBar = () => {


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

    </Fragment>

  );
};

export default NavBar;