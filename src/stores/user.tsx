import { FC, createContext, useState, useEffect } from "react";
import { HttpMethod, authAPI, userAPI } from "../api";
import { useNavigate } from "react-router-dom";

export interface IUser {
  email: string;
  name: string;
  course: string;
  position: string;
}

export interface IAuthContext {
  user?: IUser | null;
  loading: boolean;
  responseMessage: string;
  login: (body: unknown) => void;
  register: (body: unknown) => void;
  setupProfile: (body: any) => void;
}

export const AuthContext = createContext<IAuthContext>(
  null as unknown as IAuthContext
);

const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await authAPI.call(HttpMethod.GET, `/user`);

      if (response.statusCode >= 400 || !response) {
        console.log("here1", response);
        localStorage.removeItem("accessToken");
        navigate("/auth/login");
      }
      if (response?.profile === null) {
        console.log("here", response);
        setUser(response.profile);
        navigate("/user/setup-profile");
      }
    } catch (error) {
      localStorage.removeItem("accessToken");
      navigate("/auth/login");
    }
  };

  const login = async (body: any) => {
    try {
      setLoading(true);
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
      } else {
        setResponseMessage(response.message);
        setTimeout(() => {
          setResponseMessage("");
        }, 2000);
      }
    } catch (error: any) {
      setResponseMessage("Server Error");
      setTimeout(() => {
        setResponseMessage("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const setupProfile = async (body: any) => {
    try {
      setLoading(true);
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
        setResponseMessage(response.message);
        setTimeout(() => {
          setResponseMessage("");
        }, 2000);
      }
    } catch (error) {
      setResponseMessage("Server Error");
      setTimeout(() => {
        setResponseMessage("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const register = async (body: any) => {
    try {
      setLoading(true);
      const data = await authAPI.register(body);
      if (!data.error) {
        localStorage.setItem("accessToken", data.payload.access_token);
        navigate("/user/setup-profile");
      } else {
        setTimeout(() => {
          setResponseMessage("");
        }, 2000);
        setResponseMessage(data.message);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, responseMessage, login, register, setupProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
