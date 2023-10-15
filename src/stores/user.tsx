import { FC, createContext, useContext } from "react";
import { userAPI } from "../api";
// import { useNavigate } from "react-router-dom";
// import { MessageContext } from "./message";
import { LoadingContext } from "./loading";

export interface IUser {
  email: string;
  name: string;
  course: string;
  position: string;
}

interface IUSerByPosition {
  name: string;
  key: string;
}
export interface IAuthContext {
  getAllByRole: (position: string) => Promise<IUSerByPosition[]>;
}

export const AuthContext = createContext<IAuthContext>(
  null as unknown as IAuthContext
);

const AuthContextProvider: FC<{ children: any }> = ({ children }) => {
  //   const messageContext = useContext(MessageContext);
  const loadingContext = useContext(LoadingContext);

  const getAllByRole = async (role: string): Promise<IUSerByPosition[]> => {
    try {
      loadingContext.setIsLoading(true);
      const res = await userAPI.getAllByPosition(role);
      return res.map((item: any) => ({
        name: `${item.profile.firstName} ${item.profile.lastName}`,
        key: item.profile.email,
      }));
    } catch (error) {
      return [] as IUSerByPosition[];
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getAllByRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
