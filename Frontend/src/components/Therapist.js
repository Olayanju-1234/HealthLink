import React from 'react';
import '../style/therapist.css';
import image from '../assets/Rect.png';






function Therapist() {
 



  return (
    <div className='therapy'>



      <h1>Therapist Profile</h1>
      <div className='form-container'>
      <img src={image} alt='therapist profile' className='image'/>
     
      <form className='form'>
        <nav className='nav-links'>
        <ul>
            <li>Account Settings</li>
            <li>Documents</li>
            <li>Notification</li>
            <li>Billing</li>
        </ul>
        </nav>
      <div className='form-row'>
          <div className='form-group'>
            <label htmlFor='inputFirstName'></label>
            <input type='text' className='form-control' id='inputFirstName'/>
          </div>
          <div className='form-group'>
            <label htmlFor='inputLastName'>Last Name</label>
            <input type='text' className='form-control' id='inputLastName'/>
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <label htmlFor='inputEmail'>Phone Number</label>
            <input type='tel' className='form-control' id='inputPhone' />
          </div>
          <div className='form-group'>
            <label htmlFor='inputPhone'>Email Address</label>
            <input type='email' className='form-control' id='inputEmail'/>
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <label htmlFor='inputAddress'>City</label>
            <input type='text' className='form-control' id='inputCity' />
          </div>
          <div className='form-group'>
            <label htmlFor='inputCity'>State</label>
            <input type='text' className='form-control' id='inputState' />
          </div>
        </div>
        <div className='form-row'>
          <div className='form-group'>
            <label htmlFor='inputState'>Postal Code</label>
            <input type='number' className='form-control' id='inputPost'/>
          </div>
          <div className='form-group'>
            <label htmlFor='inputZip'>Country</label>
            <input type='text' className='form-control' id='inputCountry'/>
          </div>
        </div>
        <button className='update'>Update</button>
      </form>
      </div>


    
    </div>
  )
}

export default Therapist