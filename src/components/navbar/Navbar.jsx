import styles from "./Navbar.module.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";


import { BsArrowRight } from "react-icons/bs";
import { FaBars, FaTimes } from "react-icons/fa";

import { useState, useEffect, useContext } from "react";
import useClickOutside from "../../customHooks/ClickOutside";

import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ BurgerColour }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isNavOpen, setisNavOpen] = useState(false);
  let domNode = useClickOutside(() => {
    setisNavOpen(false);
  });

  const MenuLink = ({ url, path }) => {
    return (
      <li className={styles.navlink}>
        <NavLink
          to={`/${url}`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {`${path}`}
        </NavLink>
      </li>
    );
  };

  const handleProfileRedirect = () => {
    if (currentUser) {
      if (currentUser.role === 'manager') {
        navigate('/profile');
      } else {
        navigate('/userProfile');
      }
    }
  };

  return (
    <div className={styles.navbar_container}>
      <nav>
        {/* LOGO */}
        <div className={styles.brand_logo}>
          <Link to="/">SmatRentalPro</Link>
        </div>

        {/* NAV-BURGER */}
        <div
          className={styles.mobile_menu}
          style={{ color: BurgerColour }}
          onClick={() => setisNavOpen(!isNavOpen)}
        >
          <FaBars />
        </div>

        {/* NAV */}
        <ul
          className={`${isNavOpen ? styles.ul_active : undefined} ${
            styles.navbar_ul
          }`}
          ref={domNode}
        >
          <div
            className={styles.mobile_close}
            onClick={() => setisNavOpen(!isNavOpen)}
          >
            <FaTimes />
          </div>
          <MenuLink url="" path="Home" />
          {/* <MenuLink url="buy" path="Buy" /> */}
          <MenuLink url="rent" path="Rent" />
          <MenuLink url="profile" path="Profile" />
          <MenuLink url="search" path="Search" />
          <MenuLink url="about" path="About" />
        </ul>

        {currentUser ? (
          <div className="user">
            <img
              src={currentUser.avatar || "/noavatar.jpg"}
              alt=""
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                marginRight: "20px",
              }}
            />
            <span style={{ color: BurgerColour }}>{currentUser.username}</span>
            <span onClick={handleProfileRedirect} className={styles.profile} style={{ cursor: 'pointer' }}>
              <span style={{ color: BurgerColour }}>Profile</span>
              <BsArrowRight style={{ color: BurgerColour }} />
            </span>
          </div>
        ) : (
          <>
            {/* Login */}
            <Link to="/login" className={styles.login_container}>
              <span style={{ color: BurgerColour }}>Login</span>
              <BsArrowRight style={{ color: BurgerColour }} />
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

Navbar.defaultProps = {
  BurgerColour: "rgb(26, 55, 58)",
};

export default Navbar;
