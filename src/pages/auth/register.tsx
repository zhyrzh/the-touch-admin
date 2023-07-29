import { FormEvent, useContext } from "react";
import useInputChangeHandler from "../../hooks/useInputChangeHandler";
import { AuthContext } from "../../stores/user";

interface IRegisterInput {
  password: string;
  confirmedPassword: string;
  email: string;
}

const Register = () => {
  const authContext = useContext(AuthContext);
  const { data, onInputChangeHandler } =
    useInputChangeHandler<IRegisterInput>();

  const onRegisterHandler = async (event: FormEvent) => {
    event.preventDefault();
    console.log("hitted");

    if (!data?.confirmedPassword || !data?.password || !data?.email) {
      console.log("error");
      return;
    }

    if (data.password !== data.confirmedPassword) {
      console.log("password do not match");
    }

    authContext.register({
      password: data.password,
      email: data.email,
    });
  };

  return (
    <div>
      {authContext.responseMessage ? (
        <div className="modal modal__error">
          <h1 className="modal__title">{authContext.responseMessage}</h1>
        </div>
      ) : null}
      <form onSubmit={onRegisterHandler}>
        <input
          onChange={onInputChangeHandler}
          type="text"
          name="email"
          value={data?.email ? data.email : ""}
        />
        <input
          onChange={onInputChangeHandler}
          type="password"
          name="password"
          value={data?.password ? data?.password : ""}
        />
        <input
          onChange={onInputChangeHandler}
          type="password"
          name="confirmedPassword"
          value={data?.confirmedPassword ? data?.confirmedPassword : ""}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
