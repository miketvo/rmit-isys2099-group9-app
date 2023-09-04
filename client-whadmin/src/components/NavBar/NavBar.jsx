import { Link } from 'react-router-dom';
import { Fragment } from 'react';
import LazadaImg from "../../images/lazada.jpg"

import {BiCategoryAlt} from "react-icons/bi"
import {FaBoxesPacking, FaClipboardUser} from "react-icons/fa6"

import {IoHome} from "react-icons/io5"
import { IconSetting } from '../../utils/IconSettings'

const NavBar = () => {
    return (
        <Fragment>
            <div className="navbar navbar_vertical">
                <div className="navbar-logo">
                    <Link to="/">
                        <img src={LazadaImg} alt="" style={{width: "55px"}}/>
                    </Link>
                </div>
                <div className="navbar_vertical_content mt-4">
                    <ul className="navbar-nav flex-column mb-3">
                        <li className="nav_item">
                            <Link to="/">
                                {IconSetting(<IoHome/>, 'white', "30px", "nav_icon")}
                                <span className="nav_text text-white">Home</span>
                            </Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/warehouse">
                                {IconSetting(<FaBoxesPacking/>, 'white', "30px", "nav_icon")}
                                <span className="nav_text text-white">Warehouse</span>
                            </Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/category">
                                {IconSetting(<BiCategoryAlt/>, 'white', "30px", "nav_icon")}
                                <span className="nav_text text-white">Category</span>
                            </Link>
                        </li>
                        <li className="nav_item">
                            <Link to="/order">
                                {IconSetting(<FaClipboardUser/>, 'white', "30px", "nav_icon")}
                                <span className="nav_text text-white">Seller/Buyer</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </Fragment>

    )
}

export default NavBar;