import React from 'react'
import { useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';

const Login = () =>
{


  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try
    {
      await signInWithEmailAndPassword(auth , email, password);
      navigate("/");
    }
    catch (err)
    {
      console.log(err);
      setErr(true);
    }


  }



  return (
    <div className='formContainer'>
      <div className='formWrapper'>
      <span className='logo'>Chit Chat</span>
      <span className='title'>Login</span>
        <form onSubmit={handleSubmit} >
          <input type="email" placeholder='Enter Email' />
          <input type="text" placeholder='Enter Password'/>
          <button>Login</button>
          {
            err && <span className='warning'>Something went wrong..</span>
          }
        </form>
        <p>You don't have an Account? <Link to='/register'>Create an Account</Link></p>
      </div>
    </div>
  )
}

export default Login;