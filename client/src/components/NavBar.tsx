import { NavLink, NavLinkProps } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";

export default function NavBar() {
  const { isAuth, user } = useAppSelector((state) => state.user);

  const navLinkClass: NavLinkProps["className"] = ({ isActive }) =>
    isActive ? "active" : "inactive";

  return (
    <nav className='nav'>
      <NavLink className={navLinkClass} to='/home'>
        Home
      </NavLink>

      {isAuth ? (
        <div>
          <NavLink className={navLinkClass} to='/my-profile'>
            {user?.username}
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? "active logout" : "inactive")}
            to='/logout'>
            Logout
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink className={navLinkClass} to='/login'>
            Login
          </NavLink>
          <NavLink className={navLinkClass} to='/register'>
            Register
          </NavLink>
        </div>
      )}
    </nav>
  );
}
