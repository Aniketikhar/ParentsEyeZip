// import React, { useState } from "react";
// import axios from "axios";
// import "./Signup.css";
// import logoimg from "./images/new_logo.png";
// import { Link } from "react-router-dom";

// const Signupp = () => {
//   const [formData, setFormData] = useState({
//     childName: "",
//     rollno: "",
//     dateOfBirth: "",
//     gender: "",
//     email: "",
//     phone: "",
//     password: "",
//     // pickupPoint: "",
//     motherName: "",
//     fatherName: "",
//     class: "",
//     section: "",
//     schoolName:"",
//     childAge:""
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleClick = () => {
//     console.log("button of signup has been clicked");
//     axios
//       .post(
//         "https://schoolmanagement-4-6cq9.onrender.com/parent/register",
//         formData
//       )
//       .then((response) => {
//         console.log(response.data);
//         // Handle successful registration
//       })
//       .catch((error) => {
//         console.error("There was an error registering!", error);
//       });
//   };

//   return (
//     <div className="login-fix">
//       <div className="yellow-back">
//         <div className="logo-login">
//           <img src={logoimg} alt="" />
//         </div>
//       </div>
//       <div className="white-back">
//         <div className="login-form">
//           <div className="wrapper rounded bg-white formmm">
//             <div className="login-heading">
//               <h2>Registration</h2>
//             </div>
//             <form>
//               <div className="form">
//                 <div className="row">
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <div data-mdb-input-init className="form-outline">
//                       <label className="form-label" htmlFor="childName">
//                         Child's Name
//                       </label>
//                       <input
//                         type="text"
//                         id="childName"
//                         name="childName"
//                         className="form-control form-control-lg"
//                         value={formData.childName}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6 mb-4">
//                     <div data-mdb-input-init className="form-outline">
//                       <label className="form-label" htmlFor="rollno">
//                         Roll No.
//                       </label>
//                       <input
//                         type="text"
//                         id="rollno"
//                         name="rollno"
//                         className="form-control form-control-lg"
//                         value={formData.rollno}
//                         onChange={handleChange}
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label>Birthday</label>
//                     <input
//                       type="date"
//                       name="dateOfBirth"
//                       className="form-control"
//                       value={formData.dateOfBirth}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label>Gender</label>
//                     <div className="d-flex align-items-center mt-2">
//                       <label className="option">
//                         <input
//                           type="radio"
//                           name="gender"
//                           value="male"
//                           checked={formData.gender === "male"}
//                           onChange={handleChange}
//                         />
//                         Male
//                         <span className="checkmark"></span>
//                       </label>
//                       <label className="option ms-4">
//                         <input
//                           type="radio"
//                           name="gender"
//                           value="female"
//                           checked={formData.gender === "female"}
//                           onChange={handleChange}
//                         />
//                         Female
//                         <span className="checkmark"></span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label>Email</label>
//                     <input
//                       type="email"
//                       name="email"
//                       className="form-control"
//                       value={formData.email}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label>Phone Number</label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       className="form-control"
//                       value={formData.phone}
//                       onChange={handleChange}
//                       required
//                       autoComplete="phone"
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div
//                     data-mdb-input-init
//                     className="form-outline mb-4 col-md-6 mt-md-0 mt-3"
//                   >
//                     <label>Password</label>
//                     <input
//                       type="password"
//                       name="password"
//                       className="form-control"
//                       placeholder="password"
//                       autoComplete="current-password"
//                       value={formData.password}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   {/* <div className="col-md-6 mt-md-0 mt-3">
//                     <label htmlFor="pickupPoint">Pickup List</label>
//                     <input
//                       id="pickupPoint"
//                       name="pickupPoint"
//                       type="text"
//                       className="form-control"
//                       value={formData.pickupPoint}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div> */}
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label htmlFor="mothername">Mother Name</label>
//                     <input
//                       type="text"
//                       id="mothername"
//                       name="motherName"
//                       className="form-control"
//                       value={formData.motherName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label htmlFor="fathername">Father Name</label>
//                     <input
//                       id="fathername"
//                       name="fatherName"
//                       type="text"
//                       className="form-control"
//                       value={formData.fatherName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label htmlFor="class">Class</label>
//                     <input
//                       id="classname"
//                       name="class"
//                       type="text"
//                       className="form-control"
//                       value={formData.class}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label htmlFor="section">Section</label>
//                     <input
//                       id="section"
//                       name="section"
//                       type="text"
//                       className="form-control"
//                       value={formData.section}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
                  
//                 </div>
//                 <div className="row">
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label htmlFor="childAge">childAge</label>
//                     <input
//                       id="childAge"
//                       name="childAge"
//                       type="number"
//                       className="form-control"
//                       value={formData.childAge}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6 mt-md-0 mt-3">
//                     <label htmlFor="schoolName">schoolName</label>
//                     <input
//                       id="schoolName"
//                       name="schoolName"
//                       type="text"
//                       className="form-control"
//                       value={formData.schoolName}
//                       onChange={handleChange}
//                       required
//                     />
//                   </div>
                  
//                 </div>
//                 <div className="button-col mybutton">
//                   <button
//                     type="button"
//                     data-mdb-button-init
//                     data-mdb-ripple-init
//                     className="btn btn-block mb-4"
//                     onClick={handleClick}
//                   >
//                     Register
//                   </button>
//                 </div>
//                 <div className="text-center">
//                   <p>
//                     Already a member? <Link to="/">Login</Link>
//                   </p>
//                 </div>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signupp;
// //https://schoolmanagement-4ofb.onrender.com/parent/register

import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import logoimg from "./images/new_logo.png";
import { Link } from "react-router-dom";

const Signupp = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    schoolName: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = () => {
    console.log("Button of signup has been clicked");
    axios
      .post(
        "https://schoolmanagement-10.onrender.com/school/register",
        formData
      )
      .then((response) => {
        console.log(response.data);
        alert('Registration successful! Please log in.');
        // Handle successful registration
      })
      .catch((error) => {
        alert('fail to registers');
        console.error("There was an error registering!", error);
      });
  };

  return (
    <div className="login-fix">
      <div className="yellow-back">
        <div className="logo-login">
          <img src={logoimg} alt="" />
        </div>
      </div>
      <div className="white-back">
        <div className="login-formm">
          <div className="wrapper rounded bg-white formmm form1">
            <div className="login-heading">
              <h2>Registration</h2>
            </div>
            <form>
              <div className="form">
                <div className="row">
                  <div >
                    <div data-mdb-input-init className="form-outline">
                      {/* <label className="form-label" htmlFor="username">
                        Username
                      </label> */}
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter Your Username"
                        className="form-control form-control-lg"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div >
                    <div data-mdb-input-init className="form-outline">
                      {/* <label className="form-label" htmlFor="password">
                        Password
                      </label> */}
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Your Password"
                        className="form-control form-control-lg"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        autoComplete="current-password"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div >
                    <div data-mdb-input-init className="form-outline">
                      {/* <label className="form-label" htmlFor="schoolName">
                        School Name
                      </label> */}
                      <input
                        type="text"
                        id="schoolName"
                        name="schoolName"
                        placeholder="Enter your School Name"
                        className="form-control form-control-lg"
                        value={formData.schoolName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="button-col mybutton">
                  <button
                    type="button"
                    data-mdb-button-init
                    data-mdb-ripple-init
                    className="btn btn-block mb-4"
                    onClick={handleClick}
                  >
                    Register
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    Already a member? <Link to="/login">Login</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signupp;
