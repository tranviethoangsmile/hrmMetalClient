import { useRef, useState } from "react";
import axios from "axios";
import Alert from "../components/alert/Alert";
function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [alert, setAlert] = useState(false);

  const handleLogin = async () => {
    const user = {
      user_name: usernameRef.current.value,
      password: passwordRef.current.value,
    };
    await axios
      .post("http://localhost:3030/login", {
        ...user,
      })
      .then((result) => {
        if (result?.data.success) {
          const user = JSON.stringify(result?.data.data);
          const token = result?.data.token;
          sessionStorage.setItem("user", user);
          sessionStorage.setItem("token", token);
          window.location.assign("/home");
        } else {
          setAlert(true)
          usernameRef.current.value = '';
          passwordRef.current.value = '';
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      {alert ? <Alert message={'username or password wrong!!!'} type={'warning'}/>: ''}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">HRM METAL</h1>
                    </div>
                    {/* <form className="user"> */}
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-user"
                        placeholder="Enter user name..."
                        ref={usernameRef}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="password"
                        className="form-control form-control-user"
                        placeholder="Password"
                        ref={passwordRef}
                      />
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox small">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customCheck"
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customCheck"
                        >
                          Remember Me
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={handleLogin}
                      className="btn btn-primary btn-user btn-block"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
