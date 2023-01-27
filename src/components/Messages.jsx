import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../firebase';
import { ChatContext } from './context/ChatContext';
import Message from './Message'

const Messages = () =>
{
  const { data } = useContext(ChatContext);

  const [messages, setMessages] = useState([]);

  useEffect(() =>
  {

   
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) =>
    {
      
      doc.exists() && setMessages(doc.data().messages)
    });

    
    return () =>
    {
      unsub();
    };
    
  }, [data.chatId]);
  

  return (

    data.chatId != "null" ?
      <div className='messages'>
        {
          messages?.map((m) =>
            <Message message={m} key={m.id} />
          )
        }

      </div> :
      <div className='messages userChatNotSelected'>
        <h2>Let's Chit-Chat!</h2>
        <h6>Search your Friends via <b>Find a user </b>option!</h6>
        <h6><b>Select a user</b> on the left to start Chit Chatting!</h6>
      </div>

  )
}

export default Messages