import { Provider } from "react-redux";
import { store } from "./app/store";
import UsersPage from "./pages/UsersPage";

export default function App() {
  return (
    <Provider store={store}>
      <UsersPage />
    </Provider>
  );
}
