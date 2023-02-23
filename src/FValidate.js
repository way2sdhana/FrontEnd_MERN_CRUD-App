import React, { useState } from 'react';

function FValidate(){

  const [values, setValues] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmpassword: "",
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

    if (values.password === "") {
      err.password = "password required"
    }
    //  else {
      // let regex = /^.(?=.{8,})(?=.\d)(?=.[a-z])(?=.[A-Z])(?=.[@#$%&]).$/;
      // if (regex.test(values.password) === false) {
      //   formIsValid = false;
      //   err.password = "Please enter strong password(must be 8 characters including 1 uppercase, 1 special character and alphanumeric characters)";
      // }
    // }

    if (values.confirmpassword === "") {
      formIsValid = false;
      err.confirmpassword = "confirm password required"
    }

    // if (values.mobilenumber === "") {
    //   err.mobilenumber = "mobilenumber required"
    // } else {
    //   let regex = /^\d{10}$/;
    //   if (regex.test(values.mobilenumber) === false) {
    //     formIsValid = false;
    //     err.mobilenumber = "Please enter strong password(must be 8 characters including 1 uppercase, 1 special character and alphanumeric characters)";
    //   }
    // }

    setErrors({ ...err })
    return formIsValid;

  }

  const handleSubmit = (e) => {
    console.log(values);
    e.preventDefault();
    if (validateForm()) {
      console.log("valid input received");
      fetchData(values);
    }
  }

  const fetchData =  () => {
     fetch("http://localhost:4444/register", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }



  return (
    <div className='container'>
      <div className="header">
        <h2>Create Account</h2>
      </div>
      <form className="form" onSubmit={handleSubmit} >
        <div className="form-control">
          <label>Firstname</label>
          <input type="text" name="fname" placeholder="Enter your firstname" onChange={handleChange} value={values.fname} /> <div className='art'>{errors.fname}</div>
        </div>
        <div className="form-control">
          <label>Lastname</label>
          <input type="text" name="lname" placeholder="Enter your lastname" onChange={handleChange} value={values.lname} /> <div className='art'>{errors.lname}</div>
        </div>
        <div className="form-control">
          <label>Email</label>
          <input type="text" name="email" placeholder="Enter your email" onChange={handleChange} value={values.email} /><div className='art'>{errors.email}</div>
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="text" name="password" placeholder="Enter your password" onChange={handleChange} value={values.password} /><div className='art'>{errors.password}</div>
        </div>
        <div className="form-control">
          <label>Confirm Password</label>
          <input type="text" name="confirmpassword" placeholder="Enter your Conf. pass." onChange={handleChange} value={values.confirmpassword} /><div className='art'>{errors.confirmpassword}</div>
        </div>
        {/* <div className="form-control">
          <label>Mobile Number</label>
          <input type="tel" name="mobilenumber" placeholder="Enter your mobilenumber" onChange={handleChange} value={values.mobilenumber} /><div className='art'>{errors.mobilenumber}</div>
        </div> */}
        <div className="form-control">
          <input type="submit" className='memo' />
        </div>



        {/* <div className="form-control">
          <label>lname</label>
          <input type="text" name="lname" placeholder="Enter your lname" onChange={()=>navigate()}  /> <div className='art'>{errors.lname}</div>
        </div> */}
      </form>
    </div>
  );

}
export default FValidate;