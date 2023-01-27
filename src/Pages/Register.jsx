import React from 'react'
import Add from '../img/addAvatar.png'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from 'react-router-dom';
import defaultDp from '../img/default_dp.jpg';

const Register = () =>
{
  const [err, setErr] = useState(false);
  const [selected, selectSelected] = useState(true);
  const [sizeIsLess, setSizeIsLess] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) =>
  {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];



    if (file)
    {
      selectSelected(true);

      if (file.size < 51200)
      {
        setSizeIsLess(true);

        try
        {
          const response = await createUserWithEmailAndPassword(auth, email, password);

          const date = new Date().getTime();
          const storageRef = ref(storage, `${displayName + date}`);

          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            (error) =>
            {
              console.log(error);
              setErr(true);
            },
            () =>
            {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) =>
              {

                await updateProfile(response.user, {
                  displayName,
                  photoURL: downloadURL

                });

                await setDoc(doc(db, "users", response.user.uid), {
                  uid: response.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });

                await setDoc(doc(db, "userChats", response.user.uid), {});

                navigate("/");

              });
            }
          );
        }
        catch (err)
        {
          console.log("Error");
          console.log(err);
          setErr(true);
        }
      }
      else
      {
        setSizeIsLess(false);
      }
    }
    else
    {
      selectSelected(false);
    }


  }


  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>Chit Chat</span>
        <span className='title'>Register</span>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='Enter Name' />
          <input type="email" placeholder='Enter Email' />
          <input type="text" placeholder='Enter Password' />
          <label htmlFor="file">
            <img src={Add} alt="" />
            <span>Add an avatar</span>
          </label>
          <input type="file" id='file' accept=".jpg,.jpeg" style={{display:'none'}} />
          <button>Create new account</button>
          {
            err && <span className='warning'>Something went wrong..</span>
          }
          {
            !selected && <span className='warning'>Please Select an Avatar..</span>
          }
          {
            !sizeIsLess && <span className='warning'>File size exceeding 50kb..</span>
          }
        </form>
        <p>You do have an Account?  <Link to='/login'>Login</Link></p>
      </div>
    </div>
  )
}

export default Register