import React, { useState } from 'react';
import Container from "react-bootstrap/Container";
import { Button } from 'react-bootstrap';

function MyForm(){

  // const [pid,setPid] = useState('');
  // const [piderror,setPiderror] = useState('');

  const [fname,setFname] = useState('');
  const [fnameerror,setFnameerror] = useState('');

  const [lname,setLname] = useState('');
  const [lnameerror,setLnameerror] = useState('');

  const [email,setEmail] = useState('');
  const [emailerror,setEmailerror] = useState('');

  const [password,setPassword] = useState('');
  const [passworderror,setPassworderror] = useState('');

  const [confirmpassword,setConfirmpassword] = useState('');
  const [cperror,setCperror] = useState('');

  // function handlepidChange(id){
  //   setPid(id.target.value);
  // }

  function handlefnameChange(first){
    setFname(first.target.value);
  }

  function handlelnameChange(last){  
    setLname(last.target.value);
  }

  function handleemChange(mail){
    setEmail(mail.target.value);
  }

  function handlepsChange(pass){
    setPassword(pass.target.value);
  }

  function handlecpsChange(passConf){  
    setConfirmpassword(passConf.target.value);
  }

  const validateForm = () => {
    let c1 = "false", c2 = "false", c3 = "false", c4 = "false", c5 = "false";

    // let regex = /^\d[0-9]{1,5}$/;
    // if (pid === "") {
    //   setPiderror("personnel id required") ;
    //   document.getElementById("demo0").style.border = "2px solid red";
    // } else {
    // if (regex.test(pid) === false) {
    //   setPiderror("Please enter valid id");
    //   document.getElementById("demo0").style.border = "2px solid red";
    // } else {
    //   setPiderror("")
    //   document.getElementById("demo0").style.border = "2px solid green";
    //   c0 = "true"
    //   }
    // }

    // eslint-disable-next-line
    if(!fname == 0){
      setFnameerror("")
      document.getElementById("demo").style.border = "2px solid green";
      c1 = "true"
    } else {
      setFnameerror("firstname is required") ;
      document.getElementById("demo").style.border = "2px solid red";
    
    }

    //   let nameRule =  /^[a-z]{3,}$/i;

    //       if(lname == 0){
    //         setLnameerror("lastname is required");
    //         document.getElementById("demo2").style.border = "2px solid red";
    //          } else if(!nameRule.match(lname)) {
    //             setLnameerror("name is not valid");
    //             document.getElementById("demo2").style.border = "2px solid red";
    //          } else{
    //             setLnameerror("");
    //           document.getElementById("demo2").style.border = "2px solid green";

    //           c2 = "true"
    //          }

    // eslint-disable-next-line
    if(!lname == 0){
      setLnameerror("")
      document.getElementById("demo2").style.border = "2px solid green";
      c2 = "true"
    } else {
      setLnameerror("lastname is required") ;
      document.getElementById("demo2").style.border = "2px solid red";
    }

    let q = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    
    if(email === ''){
      setEmailerror("email is required")
      document.getElementById("demo4").style.border = "2px solid red";
    } else if(!q.test(email)) {
      setEmailerror("email is not valid") ;
      document.getElementById("demo4").style.border = "2px solid red";
    } else{
      setEmailerror("")
      document.getElementById("demo4").style.border = "2px solid green";
      c3 = "true"
    }

    let rule = /^[A-Za-z0-9]\w{7,14}$/;
    
    if (password === "") {
      setPassworderror("password is required") ;
      document.getElementById("demo5").style.border = "2px solid red";
    } else if (!rule.test(password)) {
      setPassworderror("password should alpha/numeric (8 to 15 digit)");
      document.getElementById("demo5").style.border = "2px solid red";
    } else {
      setPassworderror("")
      document.getElementById("demo5").style.border = "2px solid green";
      c4 = "true"
      if (confirmpassword === "") {
        setCperror("confirmpassword is required") ;
        document.getElementById("demo6").style.border = "2px solid red";
      } else if (!confirmpassword.match(password)) {
        setCperror("password doesn't match");
        document.getElementById("demo6").style.border = "2px solid red";
      } else {
        setCperror("")
        document.getElementById("demo6").style.border = "2px solid green";
        c5 = "true"
      }  
    }
                
    if((c1 === "true")  && (c2 === "true") && (c3 === "true") && (c4 === "true") && (c5 === "true")){
      setTimeout(() => {
      alert("your response has been submitted");
      }, 2000);
      return true;
    }
    return false;
  }


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({fname, lname, email, password, confirmpassword});
    if(validateForm()){
      console.log("valid input received");
      fetchData();
    }
  };

  const fetchData = () => {
    const requestOptions = {
      method: "POST",
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({ fname:fname, lname:lname, email:email, password:password, confirmpassword:confirmpassword})
    };

    fetch("http://localhost:4444/register", requestOptions)
    .then((res) => {
      console.log(res);
    })
    .then((data) => {
      console.log("okay=>"+data);
    })
    .catch((e) => {
      console.log("error=>"+e);
    });
  }

  return(
    <div className='validate'>
    <Container fluid className='buttn'>
      <form onSubmit={handleSubmit}>
        <h2>useState Form</h2>
        
        <div className='form-control'>

        {/* personnelID
        <label className='name'>Personnel ID:</label> <input placeholder={"Enter your id"} id="demo0" onChange ={ handlepidChange} value={pid} maxlength="5" size="5"></input > <br/>
        {piderror && <label className='er'>{piderror}</label>} <br/> */}

        {/* firstName */}
        <label className='name'>FIRSTNAME:</label> <br/>
        <input placeholder={"Enter your fname"} id="demo" onChange ={ handlefnameChange} value={fname}></input > <br/>
        {fnameerror && <label className='er'>{fnameerror}</label>} <br/>

        {/* lastName */}
        <label className='name'>LASTNAME:</label> <br/>
        <input placeholder={"Enter your lname"} id="demo2" onChange={handlelnameChange} value={lname}></input > <br/>
        {lnameerror && <label className='er'>{lnameerror}</label>} <br/>

        {/* eMail */}
        <label className='name'>EMAIL:</label> <br/>
        <input placeholder={"Enter your email"} id="demo4" onChange={handleemChange}  value={email}></input > <br/>
        {emailerror && <label className='er'>{emailerror}</label>} <br/>

        {/* passWord */}
        <label className='name'>PASSWORD:</label> <br/>
        <input placeholder={"Enter your password"} id="demo5" onChange={handlepsChange}  value={password}></input > <br/>
        {passworderror && <label className='er'>{passworderror}</label>} <br/>

        {/* confirmPass */}
        <label className='name'>CONFIRM_PASSWORD:</label> <br/>
        <input placeholder={"Re-enter your password"}id="demo6" onChange={handlecpsChange}   value={confirmpassword}></input > <br/>
        {cperror && <label className='er'>{cperror}</label>} <br/>

        {/* submit button */}
        <div className='buttn'>
          <Button type='submit'> submit</Button>
        </div>
        </div>
      </form>
    </Container>
    </div>
  );
}
export default MyForm;