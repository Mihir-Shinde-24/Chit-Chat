import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from './context/AuthContext'

const Navbar = () =>
{
  const {currentUser} = useContext(AuthContext);
  const firstName = currentUser.displayName?.split(" ")[0];  
  
  // console.warn(firstName);
  
  return (
    <div className='navbar'>
      <span className='logo'>Chit Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{firstName}</span>
        <button onClick={()=>{signOut(auth)}}>logout</button>
      </div>
    </div>
  )
}

export default Navbar