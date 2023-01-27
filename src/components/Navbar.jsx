import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../firebase'
import { AuthContext } from './context/AuthContext'
import { ChatContext } from './context/ChatContext'

const Navbar = () =>
{
  const { currentUser } = useContext(AuthContext);
  const firstName = currentUser.displayName?.split(" ")[0];

  const { dispatch } = useContext(ChatContext);

  const handleLogout = async () =>
  {

    await signOut(auth);
    dispatch({ type: "NO_USER" });



  }

  return (
    <div className='navbar'>
      <span className='logo'>Chit Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="" />
        <span>{firstName}</span>
        <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  )
}

export default Navbar