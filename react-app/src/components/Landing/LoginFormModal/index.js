// // LoginFormModal/index.js
// import React, { useState } from "react";
// import { login } from "../../../store/session";
// import { useDispatch } from "react-redux";
// import { useModal } from "../../../context/Modal";

// function LoginFormModal() {
//   const dispatch = useDispatch();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState([]);
//   const { closeModal } = useModal();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = await dispatch(login(email, password));
//     if (data) {
//       setErrors(data);
//     } else {
//       closeModal();
//     }
//   };

//   return (
//     <div className="login-form-container">
//       <h1>Log In</h1>
//       <form onSubmit={handleSubmit}>
//         {errors.length > 0 && (
//           <ul className="error-list">
//             {errors.map((error, idx) => (
//               <li key={idx} className="error">{error}</li>
//             ))}
//           </ul>
//         )}
//         <label>
//           Email
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             placeholder="Email"
//           />
//         </label>
//         <label>
//           Password
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Password"
//           />
//         </label>
//         <button type="submit">Log In</button>
//       </form>
//     </div>
//   );
// }

// export default LoginFormModal;
