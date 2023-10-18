import { FormEventHandler, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../stores/auth";
import useInputChangeHandler from "../../hooks/useInputChangeHandler";
import LogoLg from "../../assets/the-touch-logo-lg.png";
import { useInputValidator } from "../../hooks/useInputValidator";
import Input from "../../components/input/Input";

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
  const onLogin: FormEventHandler = (e) => {
    e.preventDefault();
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
        <form className="auth__card-container" onSubmit={onLogin}>
          <h1 className="auth__title">Hello Journalist!</h1>
          <h3 className="auth__sub-title">Please login to continue</h3>
          <div className="auth__input-container">
            <Input
              name="email"
              label="Email"
              value={data?.email!}
              errors={errors}
              onInputChangeHandler={onInputChangeHandler}
              removeErrors={removeErrors}
            />
          </div>
          <div className="auth__input-container">
            <Input
              name="password"
              label="Password"
              value={data?.password!}
              errors={errors}
              onInputChangeHandler={onInputChangeHandler}
              removeErrors={removeErrors}
              isPassword
            />
          </div>
          <>
            <p className="auth__forgot-password-button">Forgot Password?</p>
            <div className={`auth__button-container `} onClick={onLogin}>
              <button className="auth__button">LOGIN</button>
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
        </form>
        <img className="auth__page-image" src={LogoLg} alt="" />
      </div>
    </>
  );
};

export default Login;
