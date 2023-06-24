import { FC, createContext, useState, useEffect } from "react";
import { authAPI } from "../api";
import { useNavigate } from "react-router-dom";

export interface IUser {
  email: string;
  name: string;
  course: string;
  position: string;
}

export interface IAuthContext {
  user: IUser | null;
  login: (body: unknown) => void;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContext>(
  null as unknown as IAuthContext
);

const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>({
    email: "",
    name: "",
    course: "",
    position: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (body: any) => {
    setLoading(true);
    const response: any = await authAPI.login(body);
    if (response.payload?.access_token) {
      localStorage.setItem("accessToken", response.payload.access_token);
      setUser(response.payload.profile);
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
