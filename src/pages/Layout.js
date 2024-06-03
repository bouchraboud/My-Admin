import { Outlet, Link } from "react-router-dom";
import './Layout.css'; 
const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/Home">Home</Link>
          </li>
          <li>
            <Link to="/Requests">Requests</Link>
          </li>
          <li>
            <Link to="/Product">Products</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;
