import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom';

const LoginComponent = () => {
  const initialState = {
    username: "",
    password: ""
  };
  const [loginState, setLoginState] = useState(initialState);
  const {username, password} = loginState;

  const navigate = useNavigate();

  // Functions
  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setLoginState(prevState => ({...prevState, [name]: value}))
  }

  const handleLoginUser = (e) => {
    e.preventDefault();

    if (username === "user01" && password === "123456789") {
      console.log(loginState)
      localStorage.setItem("firstLogin", JSON.stringify({username: username, accessToken: "2937569823659816723946"}));

      navigate("/")
    }
  }

  return (
    <div className="login_wrapper container">
      <div className="login_container d-flex justify-content-center align-items-center h-100">
        <div className="login_inner_container d-flex flex-column p-5 text-center">
          <form className="mt-2 mb-5 pb-5" onSubmit={handleLoginUser}>
            <div className="form_title">
              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="mb-5">Please enter your login and password!</p>
            </div>

            <div className="form-floating mb-4">
              <input type="text" className="form-control" id="floatingInput" placeholder=''
              name='username' value={username} onChange={handleChangeInput}/>
              <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="form-floating mb-4">
              <input type="password" className="form-control" id="floatingPassword" placeholder=''
              name='password' value={password} onChange={handleChangeInput}/>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            
            <button type="submit" className="btn btn-outline-primary w-50 mt-4 px-4 ">Login</button>
          </form>

          <div className="">
            <p className="mb-0">
              Don&apos;t have an account?
              <Link to="/register" className="fw-bold ms-1">Sign Up</Link>
            </p>
          </div>
          
        </div>
      </div>

    </div>
  )
}

export default LoginComponent
