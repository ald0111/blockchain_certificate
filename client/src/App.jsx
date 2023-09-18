import { EthProvider } from "./contexts/EthContext";
import Intro from "./components/Intro/";
import Setup from "./components/Setup";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
import Certificate, {
  loader as certificateLoader,
} from "./components/Certificate";
import Login from "./components/Login";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Register from "./components/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/certificate/:id",
    loader: certificateLoader,
    element: <Certificate />,
  },
]);

function App() {
  return (
    <EthProvider>
      {/* <div id="App">
        <div className="container">
          {/* <Intro />
          <hr />
          <Setup />
          <hr />
          <Demo />
          <hr />
          <Footer /> 
           </div>
      </div>
      */}
      <RouterProvider router={router} />
      {/* <Link to={"/login"}>Login</Link>
      <Link to={"/certificate"}>Certificate</Link> */}
      <Outlet />
    </EthProvider>
  );
}

export default App;
