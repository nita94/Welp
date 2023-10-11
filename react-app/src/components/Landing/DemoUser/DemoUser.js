import { useDispatch } from "react-redux"
import * as sessionActions from "../../../store/session";
import "./DemoUser.css"

const DemoUser = ({ className, string }) => {
    const dispatch = useDispatch()

    const handleClick = (e) => {
        e.preventDefault()
        return dispatch(sessionActions.login({ username: "Demo1", password: "password" }));
    }

    return (
        <span onClick={handleClick} className={`${className}`}>{string}</span>
    )
}

export default DemoUser
