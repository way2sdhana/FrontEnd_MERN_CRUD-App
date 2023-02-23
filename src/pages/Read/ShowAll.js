import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import { useParams } from 'react-router-dom';
import '../css/ShowAll.css'

const ShowAll = () => {

    const [users, setUsers] = useState([])

    // const {id} = useParams();
    // const names=id;
 
    const fetchData = async() =>{
    await axios.get(`http://localhost:4444/user/showall`)
     .then(response =>{
         return response.data
     })
     .then(data =>{
         setUsers(data)
     })
    }
 
    useEffect(() =>{
     fetchData()
    // eslint-disable-next-line
    }, [])
     
  return (
    <div className='text-center'>
      <h1 className='text-center bg-dark text-white pt-2 pb-3'>Registered Profiles</h1>
      <Container>
        <Row className='rr'>
          {users.map((detail, id) => (
            <Col lg='4' key={id}>
              <div className='bor-mar bg-info abcd'>
                <div className='mt-3 mb-3 fs-2'><span style={{color:'white'}}>{detail.fname}'s - Profile</span></div>
                <hr/>
                <label className='mt-3'>Name:</label><span>{detail.fname} {detail.lname}</span>
                <br></br>
                <label>Email-id:</label><span>{detail.email}</span>
                <br></br>
                {/* <label>Password:</label><span>{detail.password}</span>
                <br></br> */}
                <Link to={`moreinfo/${detail._id}`} className='mb-4' style={{display:'inline-block', textDecoration:'none'}}><Button className='mt-1'>For MoreInfo</Button></Link>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default ShowAll;