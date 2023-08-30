import React from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  const location = useLocation();
  const { pathname } = location;

  const pathNamePart = pathname.split("/");

  const isLoginPage = pathNamePart[1] === "login";
  const isRegisterPage = pathNamePart[1] === "register";

  return (
    <React.Fragment>
      {!isLoginPage && !isRegisterPage && <NavBar />}
      <div className="" style={{ paddingLeft: "var(--verticalNavBarWidth)" }}>
        {children}
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Layout;
