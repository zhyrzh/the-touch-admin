import { routes } from "./router";
import MessageContextProvider from "./stores/message";
import AuthContextProvider from "./stores/user";
import { useRoutes } from "react-router-dom";

function App() {
  const appRoutes = useRoutes(routes);

  return (
    <MessageContextProvider>
      <AuthContextProvider>{appRoutes}</AuthContextProvider>
    </MessageContextProvider>
  );
}

export default App;
