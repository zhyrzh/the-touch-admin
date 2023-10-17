import { FormEvent, useContext } from "react";
import useInputChangeHandler from "../../hooks/useInputChangeHandler";
import { AuthContext } from "../../stores/auth";
import LogoLg from "../../assets/the-touch-logo-lg.png";
import { useNavigate } from "react-router-dom";
import TextInput from "../../components/input/TextInput";
import { useInputValidator } from "../../hooks/useInputValidator";
import { MessageContext } from "../../stores/message";
interface IRegisterInput {
  password: string;
  confirmedPassword: string;
  email: string;
}

const Register = () => {
  const authContext = useContext(AuthContext);
  const messageContext = useContext(MessageContext);
  const navigate = useNavigate();

  const { data, onInputChangeHandler } =
    useInputChangeHandler<IRegisterInput>();

  const { errors, validateInputs, removeErrors } =
    useInputValidator<IRegisterInput>({
      password: data?.password! ? data.password : "",
      confirmedPassword: data?.confirmedPassword! ? data.confirmedPassword : "",
      email: data?.email! ? data.email : "",
    });

  const onRegisterHandler = async (event: FormEvent) => {
    event.preventDefault();
    const errorCount = validateInputs();

    if (errorCount === 0) {
      if (data?.password! !== data?.confirmedPassword!) {
        messageContext.onAddMessage("Passwords don't match");
        return;
      }
      authContext.register({
        password: data?.password,
        email: data?.email,
      });
    }
  };

  const passwordConditions = [
    {
      description: "At least 8 haracters",
      condition: data?.password?.length! >= 8,
    },
    {
      description: "With capital letter",
      condition: /[A-Z]/.test(data?.password!),
    },
    {
      description: "With special character",
      condition: /[^A-Za-z0-9]/.test(data?.password!),
    },
    {
      description: "With numeric character",
      condition: /[0-9]/.test(data?.password!),
    },
  ];

  return (
    <>
      <form onSubmit={onRegisterHandler} className="auth">
        <div className="auth__card-container">
          <h1 className="auth__title">Apply as Journalist</h1>
          <h3 className="auth__sub-title">
            Fill up details to create your account
          </h3>
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
            placeholder="Password"
            value={data?.password!}
            type="password"
            errors={errors}
            onInputChangeHandler={onInputChangeHandler}
            removeErrors={() => {
              removeErrors("password");
            }}
          />
          <TextInput
            name="confirmedPassword"
            placeholder="Confirm Password"
            value={data?.confirmedPassword!}
            type="password"
            errors={errors}
            onInputChangeHandler={onInputChangeHandler}
            removeErrors={() => {
              removeErrors("confirmedPassword");
            }}
          />
          <div className="auth__condition-text-container">
            {passwordConditions.map(({ condition, description }) => (
              <p
                className={`auth__condition-text ${
                  condition
                    ? "auth__condition-text--green"
                    : "auth__condition-text--red"
                }`}
                key={description}
              >
                {description}
              </p>
            ))}
          </div>
          <>
            <div className={`auth__button-container `}>
              <button className="auth__button" type="submit">
                SUBMIT
              </button>
            </div>
            <div
              className={`auth__button-container `}
              onClick={() => navigate("/auth/login")}
            >
              <button className="auth__button" type="submit">
                BACK TO LOGIN
              </button>
            </div>
          </>
        </div>
        <img className="auth__page-image" src={LogoLg} alt="" />
      </form>
    </>
  );
};

export default Register;
