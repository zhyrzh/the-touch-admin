import { FC, createContext, useContext, useState } from "react";
import { userAPI } from "../api";
// import { useNavigate } from "react-router-dom";
import { MessageContext } from "./message";
import { LoadingContext } from "./loading";

interface IJournalist {
  email: string;
  course: string;
  position: string;
  name: string;
  img: string;
}

interface IUSerByPosition {
  key: string;
  label: string;
}
export interface IUserContext {
  journalists: IJournalist[];
  getAllByRole: (position: string) => Promise<IUSerByPosition[]>;
  acceptJournalist: (id: string) => any;
  getHomePageJournalist: () => any;
}

export const UserContext = createContext<IUserContext>(
  null as unknown as IUserContext
);

const UserContextProvider: FC<{ children: any }> = ({ children }) => {
  const messageContext = useContext(MessageContext);
  const loadingContext = useContext(LoadingContext);
  const [journalists, setJournalists] = useState<IJournalist[]>([]);

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

  const acceptJournalist = async (id: string) => {
    try {
      loadingContext.setIsLoading(true);
      const data = await userAPI.acceptJournalist(id);
      if (data !== undefined) {
        getHomePageJournalist();
      }
    } catch (error: any) {
      messageContext.onAddMessage(
        "Something went wrong when accepting the article!"
      );
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  const getHomePageJournalist = async () => {
    try {
      loadingContext.setIsLoading(true);
      const data = await userAPI.getAll();
      setJournalists(data as IJournalist[]);
    } catch (error) {
    } finally {
      loadingContext.setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        journalists,
        getAllByRole,
        acceptJournalist,
        getHomePageJournalist,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
