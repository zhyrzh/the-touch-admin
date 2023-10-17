import { routes } from "./router";
import { LoadingContextProvider } from "./stores/loading";
import MessageContextProvider from "./stores/message";
import AuthContextProvider from "./stores/auth";
import UserContextProvider from "./stores/user";
import { useRoutes } from "react-router-dom";

function App() {
  const appRoutes = useRoutes(routes);

  return (
    <LoadingContextProvider>
      <MessageContextProvider>
        <AuthContextProvider>
          <UserContextProvider>{appRoutes}</UserContextProvider>
        </AuthContextProvider>
      </MessageContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
