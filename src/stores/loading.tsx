import { createContext, FC, useState } from "react";

interface ILoadingContext {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoadingContext = createContext(null as unknown as ILoadingContext);

export const LoadingContextProvider: FC<{ children: any }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, .8)",
            zIndex: "10",
          }}
        >
          <div className="lds-dual-ring" />
        </div>
      ) : null}
      {children}
    </LoadingContext.Provider>
  );
};
