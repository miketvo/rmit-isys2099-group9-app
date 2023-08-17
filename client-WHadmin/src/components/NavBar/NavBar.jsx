import {FaShoppingCart} from 'react-icons/fa'
import { IconSetting } from '../../utils/IconSettings'
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <>
        <div className="navbar navbar-expand-lg navbar-light top_navbar">
            <div className="container">
                <div className="navbar-logo">
                    <Link to="/">
                        Logo
                    </Link>
                </div>
                <div className="navbar_search">
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <div className="navbar_user d-flex">
                    <div className="mx-2">
                        {IconSetting(<FaShoppingCart/>, 'black', '16px')}
                        <span className="ms-2">Cart</span>
                    </div>
                    <div className="mx-2">
                        <Link to="/login">Login / Register</Link>
                    </div>
                </div>
            </div>
        </div>

        <div className="navbar navbar-expand-lg navbar-light bottom_navbar">
            <div className="container justify-content-start">
                <div className="navbar-categories pe-4 py-3">
                    Categories
                </div>
                <div className="navbar_option d-flex">
                    <div className="px-4 py-3">
                        <Link to="/">Home</Link>
                    </div>
                    <div className="px-4 py-3">
                        <Link to="/">Product</Link>
                    </div>
                    <div className="px-4 py-3">
                        <Link to="/">My Order</Link>
                    </div>
                </div>
                
            </div>
        </div>
    </>

  )
}

export default NavBar;