import React, { useContext, useMemo } from 'react'
import { useState } from 'react';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { AuthContext } from './context/AuthContext'

const Search = () =>
{
  const { currentUser } = useContext(AuthContext);

  const [userName, setUserName] = useState("");
  // const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const handleSearch = async () =>
  {
    try
    {
      const q = query(collection(db, "users"), where("displayName", "==", userName));

      const tempArr = [];

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) =>
      {
        if (doc.data().uid != currentUser.uid)
        {
          tempArr.push(doc.data());
          // console.log(doc.data());
          // setUser(doc.data());
        }
       
      });


      setAllUsers([...tempArr]);


      if (tempArr.length === 0)
      {
        setErr(true);
      }
      else
      {
        setErr(false);
      }

      // console.log("tem",tempArr);
      // console.log("allusers",allUsers);
      // console.log(err);


    } catch (err)
    {
      setErr(true);
    }

  };



  const handleKey = (e) =>
  {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async (user) =>
  {
    // Create chats in firestore if not exist
    const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

    try{

      const response = await getDoc(doc(db, "chats", combinedId));

      if(!response.exists() )
      {
        //create a chat in chats collection
        await setDoc(doc(db,"chats",combinedId),{
          messages:[]
        });
 
        //create user chats

        await updateDoc(doc(db,"userChats",currentUser.uid), {

          [combinedId+".userInfo"] :{
            uid:user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId+".date"] : serverTimestamp(),

        });

        await updateDoc(doc(db,"userChats",user.uid), {

          [combinedId+".userInfo"] :{
            uid:currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId+".date"] : serverTimestamp(),

        });

      }
    }
    catch(err)
    {
      setErr(true);
      console.log(err);
    }
    finally{
      
      setUserName("");
      setAllUsers([]);

    }
  }

  return (
    <div className='search'>
      <div className="searchForm">
        <input 
        type="text" 
        placeholder='Find a user' 
        onKeyDown={handleKey} 
        onChange={(e) => setUserName(e.target.value)} 
        value={userName} />
      </div>
      {
        err ? <div style={{ color: 'rgb(110 107 164)', padding: '10px', textAlign: 'center' }}>User Not Found!</div> : ""
      }
      {
        allUsers.map((u, id) =>

          allUsers &&
          <div className="userChat" key={id} onClick={()=>handleSelect(u)} >
            <img src={u.photoURL} />
            <div className="userChatInfo">
              <span>{u.displayName}</span>
              <p>Hello</p>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Search