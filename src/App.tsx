import { routes } from "./router";
import AuthContextProvider from "./stores/user";
import { useRoutes } from "react-router-dom";

function App() {
  const appRoutes = useRoutes(routes);

  return <AuthContextProvider>{appRoutes}</AuthContextProvider>;
}

export default App;
