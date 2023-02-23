import React, { useState } from "react"
import axios from "axios"
import {Navbar, Button } from "react-bootstrap";
import {Link} from "react-router-dom"

const ShowRec = () => {
  const [users, setUsers] = useState([])

  const fetchData = e => {
    const query = e.target.value;
    // console.log(query);
    axios.post(`http://localhost:4444/user/showbymail`, { email:query})
    .then(response => {
        console.log("response okay"+response);
        return response
      })
      .then(data => {
        // console.log(data.data);
        setUsers(data.data)
      })
  }

  return (
    <div className="mt-3">
      <label> Search by email: </label>
      <input type='text' onChange={fetchData} label="Search User" />
      {users.email && (
        <>
          <h2 style={{padding:'10px'}}>Record of "{users.fname}"</h2>
          <ul>
            <li key={users.id}>First Name: {users.fname}</li>
            <li>Last Name: {users.lname}</li>
            <li>Email: {users.email}</li>
            <li>Password: {users.password}</li>
          </ul>
        </>
      )} <br/> <br/>

      <div className='text-center'>
        <Navbar className='bg-dark'>
          <Navbar.Brand className='text-white ms-2'>
            Showing data from Dhana's database
          </Navbar.Brand>
        </Navbar>
        <h1 className='mt-5'>Click below button to see available records</h1>
        <Link to="showall/" style={{display:'inline-block', textDecoration:'none'}}><Button className='ms-auto me-auto d-block mt-5 fs-2'>view details</Button></Link>
      </div>
      {/* {users.length > 0 && (
        <ul>
          {users.map(user => (
            <li key={user.id}>
                First Name: {user.fname} <br/>
                Last Name: {user.lname} <br/>
                Email: {user.email} <br/>
                Password: {user.password}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  )
}

export default ShowRec;
