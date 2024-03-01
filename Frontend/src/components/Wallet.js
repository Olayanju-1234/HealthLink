import React from 'react';
import '../style/wallet.css';
import image from '../assets/Vector.png';
import image1 from '../assets/Rect5.png';
import image2 from '../assets/history.png';
import image3 from '../assets/history2.png';
import image5 from '../assets/rectangle5.png';
import image6 from '../assets/rectangle66.png';
import image7 from '../assets/rect7.png';
import image8 from '../assets/rect8.png';
import image9 from '../assets/rect9.png'

function Wallet() {
  return (
    <div className='wallet'>
      <div className='links'>
        <img src={image5} alt='rectangle5' id='rectangle5'/>
      <a><span className='profile-link'>Profile</span></a>


      <img src={image6} alt='rectangle6' id='rectangle6'/>
      <a><span className='back-link'>Back</span></a>


      <img src={image7} alt='rectangle7' id='rectangle7'/>
      <a><span className='session'>Book Session</span></a>

      </div> 
      <div className='links'>
      <img src={image8} alt='rectangle8' id='rectangle8'/>
      <a><span className='chat'>Therachat</span></a>

      <img src={image9} alt='rectangle9' id='rectangle9' />
      <a><span className='therapist'>Therapist</span></a>
      </div>
      
      <div className='wallet-container'>
      <img src={image1} alt='rectangle' id='rect'/>
      <img src={image} alt='wallet' id='wallet-icon'/>
      
      <p>Fund Wallet</p>
      <span className='balance'>Balance</span>
      <span className='balance-amount'>$2,500.50</span>
      <button>More</button>

      <div className='history'>
        <div className='history-container'>
          <img src={image2} alt='history' id='history'></img>
          <br></br>
          <img src={image3} alt='history2' id='history2'></img>
          <br></br>
          {/* <img src={image4} alt='history3' id='history3'></img> */}
         
        </div>
      </div>


      </div>
    </div>
  )
}




// function updateTherapist(){
//   fetch("http://healthlink-gxhn.onrender.com")
//       .then((response) => response.json())
//       .then((data)=> setTherapist(data.data));
      
// }

// const [therapist, setTherapist] = useState([])
// useEffect(() => {updateTherapist()});

// return (

// <div>
//   {therapist.map((therapist)=>(
//   <h1 key={therapist.id}>
//   {therapist.first_name} {therapist.last_name}
//   </h1>
//   ))}

export default Wallet