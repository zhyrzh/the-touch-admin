import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../stores/user";
import useInputChangeHandler from "../../hooks/useInputChangeHandler";
import LogoLg from "../../assets/the-touch-logo-lg.png";
import TextInput from "../../components/input/TextInput";
import { useInputValidator } from "../../hooks/useInputValidator";

const Login = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const { data, onInputChangeHandler } = useInputChangeHandler<{
    email: string;
    password: string;
  }>();

  const { errors, validateInputs, removeErrors } = useInputValidator<{
    email: string;
    password: string;
  }>({
    email: data?.email ? data.email : "",
    password: data?.password ? data.password : "",
  });

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HTTP Request to login
  const onLogin = () => {
    const errorCount = validateInputs();
    if (errorCount === 0) {
      authContext.login({
        email: data?.email! ? data.email : "",
        password: data?.password! ? data.password : "",
      });
    }
  };

  return (
    <>
      <div className="auth">
        <div className="auth__card-container">
          <h1 className="auth__title">Hello Journalist!</h1>
          <h3 className="auth__sub-title">Please login to continue</h3>
          <TextInput
            name="email"
            placeholder="Email"
            value={data?.email!}
            type="text"
            errors={errors}
            onInputChangeHandler={onInputChangeHandler}
            removeErrors={() => {
              removeErrors("email");
            }}
          />
          <TextInput
            name="password"
            placeholder="password"
            value={data?.password!}
            type="password"
            errors={errors}
            onInputChangeHandler={onInputChangeHandler}
            removeErrors={() => {
              removeErrors("password");
            }}
          />
          <>
            <p className="auth__forgot-password-button">Forgot Password?</p>
            <div className={`auth__button-container `} onClick={onLogin}>
              <button className="auth__button" disabled={authContext.loading}>
                LOGIN
              </button>
            </div>
            <div className="auth__button-container">
              <button
                className="auth__button"
                onClick={() => navigate("/auth/register")}
              >
                APPLY AS JOURNALIST
              </button>
            </div>
          </>
        </div>
        <img className="auth__page-image" src={LogoLg} alt="" />
      </div>
    </>
  );
};

export default Login;
