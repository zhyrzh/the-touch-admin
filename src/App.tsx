import { routes } from "./router";
import { LoadingContextProvider } from "./stores/loading";
import MessageContextProvider from "./stores/message";
import AuthContextProvider from "./stores/auth";
import UserContextProvider from "./stores/user";
import { useRoutes } from "react-router-dom";
import ArticleContextProvider from "./stores/articles";

function App() {
  const appRoutes = useRoutes(routes);

  return (
    <LoadingContextProvider>
      <MessageContextProvider>
        <AuthContextProvider>
          <UserContextProvider>
            <ArticleContextProvider>{appRoutes}</ArticleContextProvider>
          </UserContextProvider>
        </AuthContextProvider>
      </MessageContextProvider>
    </LoadingContextProvider>
  );
}

export default App;
