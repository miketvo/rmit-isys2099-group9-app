import LoginComponent from "../components/Login/Login";
import PropTypes from "prop-types";

const LoginPage = ({ setIsLoggedIn }) => {
  return <LoginComponent setIsLoggedIn={setIsLoggedIn} />;
};

LoginPage.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired, // setIsLoggedIn should be a function and is required.
};

export default LoginPage;
