import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../../store/session";
import "./profilebutton.css";

function ProfileButton() {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout()).then(() => {
      history.push("/SeeYouSoon");
    });
  };

  // Logging the user information for debugging purposes
  console.log("User Information: ", sessionUser);

  return (
    <div className="profile-wrapper">
      <div className="userIcon" onClick={openMenu}>
        {sessionUser?.profile_picture_url ? (
          <div
            className="profileImage"
            style={{
              backgroundImage: `url(${sessionUser.profile_picture_url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        ) : (
          <div className="profileImage">
            <i className="fa-solid fa-user" style={{ fontSize: "25px", opacity: "0.6" }} />
          </div>
        )}
      </div>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* Displaying the user's username or a placeholder if it's not available */}
          {/* Displaying a greeting with the user's username */}
          <li>Hello, {sessionUser?.username ?? 'User'}!</li>
          {/* Logout Button */}
          <li className="logoutButton" onClick={logout}>Log Out</li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
