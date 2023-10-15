import { useDispatch } from "react-redux";
import { login } from "../../../store/session";
import * as sessionActions from "../../../store/session";
import "./DemoUser.css";

const DemoUser = ({ className, string }) => {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    // Dispatch regular login with demo user's credentials
    return dispatch(sessionActions.login("demo1@aa.io", "password"));
  };

  return (
    <button onClick={handleClick} className={`demo ${className}`}>
      {string}
    </button>
  );
};

export default DemoUser;
