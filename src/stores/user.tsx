import { FC, createContext, useState, useEffect, useContext } from "react";
import { authAPI, userAPI } from "../api";
import { useNavigate } from "react-router-dom";
import { MessageContext } from "./message";
import { LoadingContext } from "./loading";

export interface IUser {
  email: string;
  name: string;
  course: string;
  position: string;
}

export interface IAuthContext {
  user?: IUser | null;
  login: (body: unknown) => void;
  register: (body: unknown) => void;
  setupProfile: (body: any) => void;
}

export const AuthContext = createContext<IAuthContext>(
  null as unknown as IAuthContext
);

const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const messageContext = useContext(MessageContext);
  const loadingContext = useContext(LoadingContext);
  const navigate = useNavigate();

  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response: any = (await authAPI.getProfile()) as any;

      if (response.profile === null) {
        navigate("/user/setup-profile");
        setUser(null);
      } else {
        setUser(response.profile);
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
      navigate("/auth/login");
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const login = async (body: any) => {
    try {
      loadingContext.setIsLoading(true);
      const response: any = await authAPI.login(body);
      if (response?.payload) {
        localStorage.setItem("accessToken", response.payload.access_token);
        setUser(response.payload.profile);
        // navigate("/");
        if (response.payload.profile === null) {
          navigate("/user/setup-profile");
        } else {
          navigate("/");
        }
      }
    } catch (error: any) {
      messageContext.onAddMessage(error.message);
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const setupProfile = async (body: any) => {
    try {
      loadingContext.setIsLoading(true);
      const response = await userAPI.setupProfile(body);
      if (response?.payload) {
        // localStorage.setItem("accessToken", response.payload.access_token);
        navigate("/");
        if (response.payload.profile === null) {
          navigate("/register");
        } else {
          setUser(response.payload.profile);
          navigate("/");
        }
      } else {
        messageContext.onAddMessage(response.message);
      }
    } catch (error: any) {
      messageContext.onAddMessage(error.message);
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const register = async (body: any) => {
    try {
      loadingContext.setIsLoading(true);
      const data = await authAPI.register(body);
      if (!data.error) {
        localStorage.setItem("accessToken", data.payload.access_token);
        setUser(data.payload.profile);
        navigate("/user/setup-profile");
      } else {
        messageContext.onAddMessage(data.message);
      }
    } catch (error: any) {
      messageContext.onAddMessage(error.message);
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, setupProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
