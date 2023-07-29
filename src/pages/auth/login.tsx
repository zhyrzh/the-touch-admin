import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../stores/user";
import useInputChangeHandler from "../../hooks/useInputChangeHandler";

const Login = () => {
  const [error, setError] = useState<string>("");
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, onInputChangeHandler } = useInputChangeHandler<{
    email: string;
    password: string;
  }>();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateInput = (): boolean => {
    if (!data?.email || !data?.password) {
      setError("All fields are required!");
      setTimeout(() => {
        setError("");
      }, 2000);
      return false;
    }
    return true;
  };

  // HTTP Request to login
  const onLogin = () => {
    const isValidated = validateInput();
    if (isValidated) {
      authContext.login({
        email: data?.email,
        password: data?.password,
      });
    }
  };

  return (
    <>
      {error ? (
        <div className="modal modal__error">
          <h1 className="modal__title">{error}</h1>
        </div>
      ) : null}
      {authContext.responseMessage ? (
        <div className="modal modal__error">
          <h1 className="modal__title">{authContext.responseMessage}</h1>
        </div>
      ) : null}
      <div className="login">
        <h1 className="login__title">Hello Journalist!</h1>
        <h3 className="login__sub-title">Please login to continue</h3>
        <div className="login__input-container">
          <input
            value={data?.email}
            placeholder="Email"
            type="text"
            className="login__input"
            name="email"
            onChange={onInputChangeHandler}
          />
        </div>
        <div className="login__input-container">
          <input
            value={data?.password}
            placeholder="Password"
            type="text"
            className="login__input"
            name="password"
            onChange={onInputChangeHandler}
          />
        </div>
        <>
          <div className={`login__button-container `} onClick={onLogin}>
            <button className="login__button" disabled={authContext.loading}>
              LOGIN
            </button>
          </div>
          <div className="login__button-container">
            <button
              className="login__button"
              onClick={() => navigate("/auth/register")}
            >
              APPLY AS JOURNALIST
            </button>
          </div>
        </>
      </div>
    </>
  );
};

export default Login;
