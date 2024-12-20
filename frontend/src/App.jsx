import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Home from "./Page/Home";
import CreatePage from "./Page/CreatePage";
import Layout from "./Layout";
import UpdatePage from "./Page/UpdatePage";
import LoginPage from "./Page/LoginPage";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Layout />}>
        <Route index path="/" element={<Home />} />
        <Route path="create" element={<CreatePage />} />
        <Route path="update/:id" element={<UpdatePage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
