import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from "axios"
import { RiDeleteBin5Line } from 'react-icons/ri';
import '../css/MoreInfo.css';

export const MoreInfo = () => {
  // console.log(props.id);

  // for form values
  const [values, setValues] = useState({});
  // const [tempvalues, setTempvalues] = useState({});

  // for form errors
  const [errors, setErrors] = useState({});

  //for form updates
  const handleChange = (e) => {
    values[e.target.name]=e.target.value;
    setValues(values);
  }

  // read data from database

    const [users, setUsers] = useState([]);
  
    const {id} = useParams();
    const profile_id = id;
  
    const fetchData = () => {
      // console.log("my id from show all is "+id);
      axios.post(`http://localhost:4444/user/showbyid`, { _id:profile_id})
      .then(response => {
        console.log("response okay");
        return response
      })
      .then(data => {
        // console.log(data.data);
        setUsers(data.data)
      })
    }
    
    // const fetchData = () =>{
    //   fetch(`http://localhost:4444/user/showall?pid=${profile}`)
    //   .then(response =>{
    //     return response.json()
    //   })
    //   .then(data =>{
    //     console.log(data)
    //     setUsers(data)
    //   })
    // }
  
    useEffect(() => {
      fetchData()
      // eslint-disable-next-line
    }, [])

    const handleSubmit = (e) => {
      // console.log(values);
      e.preventDefault();
      if(validateForm()){
        console.log("valid input received");
        fetchUpdate(values)
      }
  }

    const fetchUpdate = async (data) =>{
      console.log(data);
      data._id=profile_id;
      await axios.post('http://localhost:4444/user/reset', data)
      .then((response)=>{
          alert("Record updated successfully");
          window.location.reload(true);
      },
      (error)=>{
        console.log('error received while update'+error.response.data.message);
          // alert(error.response.data.message);
          window.location.reload(true);
      });
  }

    const validateForm = () => {
      let err = {};
      let formIsValid = true;

      if (values.fname === "") {
        formIsValid = false;
        err.fname = "firstname required"
        // console.log(err.fname);
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
          } else if(!values.password.match(values.confirmpassword)) {
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
    
      setErrors({ ...err })
      return formIsValid;
  
    }

    
    const deleteThis = () => {
      // const deleteThis = async () => {
      // alert('deleted this profile' + users._id);
      // const data = {_id: profile_id};
      // console.log("my deleted obj-id " + profile_id);
      console.log("Deleted record name \'" + users.fname + "\'");
      // await axios.post('http://localhost:4444/user/delete', {_id: profile_id})
      axios.delete('http://localhost:4444/user/delete', {fname: users.fname})
      // axios.post(`http://localhost:4444/user/delete/:${profile_id}`)
      .then((response) => {
        alert("Record deleted successfully");
        // return response;
          // window.location.reload(true);
      })
      .catch(() => {
        alert("error received while fetching...");
      })
    }

const handleDelete = () => {
  // console.log(values);
  if(true){
    // console.log("Record deletion started");
    deleteThis()
  }
}

/*

const deleteThis = async (data) =>{
  data._id = profile_id;
  console.log(data);
  await axios.post('http://localhost:4444/user/delete', data)
  .then((response)=>{
      alert("Record updated successfully");
      // window.location.reload(true);
  },
  (error)=>{
    // console.log('error received while update'+error.response.data.message);
      alert('error received while dalete');
      // window.location.reload(true);
  });
}

*/


    return (
        <div className='heiHov'>
        <h1 className='text-center bg-dark text-white pt-2 pb-3'>Detailed-Profile:</h1>
        
        <Container className='overAut'>
          {users._id && (
            <Container key={id}>
              <Row className='justify-content-md-center'>
                <Col xs md="auto" lg="5">
                  {/* <h1 className='text-center bg-users tablet mt-3'>{users.name}</h1> */}
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th colSpan={2}>Profile : {users.fname} <RiDeleteBin5Line onClick={handleDelete} className='delIco' /></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>First-name:</td><td>{users.fname}</td>
                      </tr>
                      <tr>
                        <td>Last-name:</td><td>{users.lname}</td>
                      </tr>
                      <tr>
                        <td>Email:</td><td>{users.email}</td>
                      </tr>
                      <tr>
                        {/* <td>Password:</td><td>{users.password}</td> */}
                        <td>Password:</td><td>********</td>
                      </tr>
                      {/* <tr>
                        <td>Location:</td><td>{users.location}</td>
                      </tr> */}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          )}
        </Container>

        {/* form code for update */}
        <Container fluid className='buttn'>
        {users._id && (
      <form className="form" onChange={validateForm} onSubmit={handleSubmit} key={id}>
      <div className="header">
        <h2>Edit Details:</h2>
      </div>
      {/* <div className="form-control">
          <label>Personnel ID</label>
          <input type="text" name="pid" value={users.pid} maxlength="5" size="5" onChange={handleChange} disabled/>
        </div> */}
        <div className="form-control">
          <label>Firstname</label>
          <input type="text" name="fname" placeholder="Enter your firstname" onChange={handleChange}/>
          <div className='art'>{errors.fname}</div>
        </div>
        <div className="form-control">
          <label>Lastname</label>
          <input type="text" name="lname" placeholder="Enter your lastname" onChange={handleChange}/>
          <div className='art'>{errors.lname}</div>
        </div>
        <div className="form-control">
          <label>Email</label>
          <input type="text" name="email" placeholder="Enter your email" onChange={handleChange}/>
          <div className='art'>{errors.email}</div>
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" name="password" placeholder="Enter your password" onChange={handleChange}/>
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
          <div className='buttn' style={{marginTop:'10px'}}>
          <input type="submit" className='memo' />
        </div>

        <br/>

        {/* <div className="form-control">
          <label>lname</label>
          <input type="text" name="lname" placeholder="Enter your lname" onChange={()=>navigate('/contact')}  />
          <div className='art'>{errors.lname}</div>
        </div> */}
      </form>
      )}
    </Container>
      </div>
    )
}
