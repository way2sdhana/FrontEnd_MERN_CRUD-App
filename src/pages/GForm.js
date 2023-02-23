import React, { useState } from 'react';
// import axios from 'axios';
import Container from "react-bootstrap/Container";

function GForm(){

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmpassword: ""
    // pid: "",
    // mobilenumber: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    // console.log(e.target.name , e.target.value);
    const { name, value } = e.target;

    setValues((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });

  };

  const validateForm = () => {
    let err = {}
    let formIsValid = true;

    if (values.fname === "") {
      formIsValid = false;
      err.fname = "Firstname required"
    }

    if (values.lname === "") {
      formIsValid = false;
      err.lname = "lastname required"
    }

    if (values.email === "") {
      err.email = "email required"
    } else {
      let regex = /^\S+@\S+\.\S+$/;
      if (regex.test(values.email) === false) {
        formIsValid = false;
        err.email = "Please enter valid email";
      }
    }

    // let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\]).{8,32}$/;
    // let regex = /^[A-Za-z0-9]\w{7,14}$/;
    let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (values.password === "") {
      formIsValid = false;
      err.password = "password required"
    } else {
      if (regex.test(values.password) === false) {
        formIsValid = false;
        err.password = "Enter a valid password";
        // err.password = "Please enter strong password(must be 8 characters including 1 uppercase, 1 special character and alphanumeric characters)";
      } else {
        if (values.confirmpassword === "") {
          formIsValid = false;
          err.confirmpassword = "confirm password required"
        // } else if(!values.password.match(values.confirmpassword)) {
        } else if(!(values.password === values.confirmpassword)) {
          formIsValid = false;
          err.confirmpassword = "password doesn't match"
        }
      }
    }


    // if (values.mobilenumber === "") {
    //   err.mobilenumber = "mobilenumber required"
    // } else {
    //   let regex = /^\d{10}$/;
    //   let regex = /^[0-9]\w{1,5}$/;
    //   if (regex.test(values.mobilenumber) === false) {
    //     formIsValid = false;
    //     err.mobilenumber = "Please enter valid mobile number";
    //   }
    // }

    // if (values.pid === "") {
    //   formIsValid = false;
    //   err.pid = "personnel id required"
    // } else {
    //   let regex = /^\d[0-9]{1,5}$/;
    //   if (regex.test(values.pid) === false) {
    //     formIsValid = false;
    //     err.pid = "Please enter valid numbered id (length within '5')";
    //   }
    // }

    setErrors({ ...err })
    return formIsValid;

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    if (validateForm()) {
      console.log("valid input received");
      fetchData(values);
    }
  }

  const fetchData = () => {
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(values)
    };

  
    fetch("http://localhost:4444/register", requestOptions)
    .then((res) => {
      console.log(res);
    })
    .then((data) => {
      alert("Successfully record inserted");
      window.location.reload(true);
    })
    .catch((e) => {
      alert("error => " + e);
    });
  }

//   const fetchData = async (data) =>{
//     await axios.post('http://localhost:4444/register', data)
//     .then((response)=>{
//         alert("Record registered successfully");
//     },
//     (error)=>{
//         alert("Error received while fetching " + error.response.data.message);
//         window.location.reload(true);
//     });
// }

  // const fetchData =  () => {
  //    fetch("http://localhost:4444/register", {
  //     method: "POST",
  //     body: JSON.stringify(values),
  //     headers: {'Content-Type' : 'application/json'}
  //   });
  // }



  return (
    <Container fluid className='buttn'>
      <form className="form" onSubmit={handleSubmit} >
      <div className="header">
        <h2>Create Account:</h2>
      </div>
        {/* <div className="form-control">
          <label>Personnel ID</label>
          <input type="text" name="pid" placeholder="Enter a id" onChange={handleChange} value={values.pid} maxlength="5" size="5" />
          <div className='art'>{errors.pid}</div>
        </div> */}
        <div className="form-control">
          <label>Firstname</label>
          <input type="text" name="fname" placeholder="Enter your firstname" onChange={handleChange} value={values.fname} />
          <div className='art'>{errors.fname}</div>
        </div>
        <div className="form-control">
          <label>Lastname</label>
          <input type="text" name="lname" placeholder="Enter your lastname" onChange={handleChange} value={values.lname} />
          <div className='art'>{errors.lname}</div>
        </div>
        <div className="form-control">
          <label>Email</label>
          <input type="text" name="email" placeholder="Enter your email" onChange={handleChange} value={values.email} />
          <div className='art'>{errors.email}</div>
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={handleChange} value={values.password} />
          <div className='art'>{errors.password}</div>
        </div>
        <div className="form-control">
          <label>Confirm Password</label>
          <input type="password" name="confirmpassword" placeholder="Enter your Conf. pass." onChange={handleChange} value={values.confirmpassword} />
          <div className='art'>{errors.confirmpassword}</div>
        </div>
        {/* <div className="form-control">
          <label>Mobile Number</label>
          <input type="tel" name="mobilenumber" placeholder="Enter your mobilenumber" onChange={handleChange} value={values.mobilenumber} />
          <div className='art'>{errors.mobilenumber}</div>
        </div> */}
        <div className="form-control">
          <input type="submit" className='memo' />
        </div>

        {/* <div className="form-control">
          <label>lname</label>
          <input type="text" name="lname" placeholder="Enter your lname" onChange={()=>navigate('/contact')}  />
          <div className='art'>{errors.lname}</div>
        </div> */}
      </form>
    </Container>
  );

}
export default GForm;