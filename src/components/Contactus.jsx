import React, { useState } from 'react'

const Contactus = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  let name, value;
  const getUserData = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({...user, [name]: value})
  };
  const postData = async(event) => {
    // on  submit form code
    const {name, email, phone, message} = user;
    event.preventDefault();
    
    if(name && email && phone && message){      
      const res = await fetch(
        "https://contact-us-ra-default-rtdb.firebaseio.com/contactus.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json"
          },
          body: JSON.stringify({
            name, email, phone, message
          })
        }
      );
    
      if(res){
        setUser({
          name: "",
          email: "",
          phone: "",
          message: ""
        })
        alert("Data saved successfully 😍");
      } else {
        alert('No response. ⭕');
      }
      // return(
      //   <div class="alert alert-success alert-dismissible fade show" role="alert">
      //     <strong>Success! </strong> Data saved successfully.
      //     <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      //       <span aria-hidden="true">&times;</span>
      //     </button>
      //   </div>
      // )
    } else {
      alert('Please fill field of form first.❌');
    }
  }
    return (
    <div className="contact_us">
        <form className="row g-3 contact_form my-5" method='POST'>
          <h1 className='text-center text-success my-5'>Contact Us</h1>
          <div className="mb-3 row">
            <div className="col-md-4">
              <label htmlFor="name" className="col-sm-12 col-form-label">Name </label>
              <input type="text" className="form-control" id="name" 
              name='name' value={user.name} onChange={getUserData} placeholder="e.g. Kamran Abid" required />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="col-sm-12 col-form-label">Email</label>
              <input type="email" className="form-control" id="email" 
              name='email' value={user.email} onChange={getUserData} placeholder='e.g. myemail@email.com' required />
            </div>
            <div className="col-md-4">
              <label htmlFor="phone" className="col-sm-12 col-form-label">Phone Number</label>
              <input type="number" className="form-control" id="phone" 
              name='phone' value={user.phone} onChange={getUserData} placeholder='e.g. +92 3000 1234567' required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="msg" className='form-label'>Message </label>
            <textarea className="form-control" id="msg" rows="5" 
            name='message' value={user.message} onChange={getUserData} placeholder='e.g. This is my message.' required></textarea>
          </div>
          <div className="row">
            <input className="btn btn-outline-success col-sm-3 my-4 mx-auto" type="submit" onClick={postData} value="Submit" />
          </div>
        </form>
    </div>
  )
}

export default Contactus