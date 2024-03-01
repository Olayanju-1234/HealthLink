import React, { useEffect, useState } from 'react'

function Update() {
 const [therapists, setTherapists] = useState([0])

 useEffect(() =>{
   fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(data => setTherapists(data))
    .catch(err => console.log(err))

    
 },[])

 

  return (
  
    <div>
    {console.log(therapists)}
      <table>
        <ul>
          {therapists.map((list, index) =>(
            <l1 key={index}>
            {list.email}
            </l1>
          ))}
        </ul>
      </table>
    </div>
  )
}

export default Update
 
   










