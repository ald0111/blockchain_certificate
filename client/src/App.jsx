import { EthProvider } from "./contexts/EthContext";
import { MyContext } from "./contexts/MyContext";
import Login from "./components/Login";
import CertificateViewer, {
  loader as certificateLoader,
} from "./components/CertificateViewer";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Certificate from "./components/Certificate";
import UploadCertificate from "./components/UploadCertificate";
import Register from "./components/Register";
import LandingPage from "./components/LandingPage";
import Logout from "./components/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
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
    path: "/certificate/",
    element: <Certificate />,
  },
  {
    path: "/certificate/upload",
    element: <UploadCertificate />,
  },
  {
    path: "/certificate/:id",
    loader: certificateLoader,
    element: <CertificateViewer />,
  },
]);

function App() {
  return (
    <MyContext>
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
    </MyContext>
  );
}

export default App;
