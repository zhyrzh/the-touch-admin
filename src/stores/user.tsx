import { FC, createContext, useContext } from "react";
import { userAPI } from "../api";
// import { useNavigate } from "react-router-dom";
// import { MessageContext } from "./message";
import { LoadingContext } from "./loading";

interface IUSerByPosition {
  key: string;
  label: string;
}
export interface IUserContext {
  getAllByRole: (position: string) => Promise<IUSerByPosition[]>;
}

export const UserContext = createContext<IUserContext>(
  null as unknown as IUserContext
);

const UserContextProvider: FC<{ children: any }> = ({ children }) => {
  //   const messageContext = useContext(MessageContext);
  const loadingContext = useContext(LoadingContext);

  const getAllByRole = async (role: string): Promise<IUSerByPosition[]> => {
    try {
      loadingContext.setIsLoading(true);
      const res = await userAPI.getAllByPosition(role);
      return res.map((item: any) => ({
        label: `${item.profile.firstName} ${item.profile.lastName}`,
        key: item.profile.email,
      }));
    } catch (error) {
      return [] as IUSerByPosition[];
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        getAllByRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
