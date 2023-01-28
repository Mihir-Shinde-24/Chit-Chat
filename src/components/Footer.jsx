import React from 'react'
import { BsLinkedin } from "react-icons/bs";

const Footer = () =>
{

  return (
    <div className='footer'>
      <p>
        © 2022-2023 Chit-Chat - Live Chatting Project Made by 
        <span>
        <a  target="_blank" href="https://www.linkedin.com/in/mihir2403/">
          <b> Mihir Shinde</b> &nbsp;
        <BsLinkedin className='icon'/>        
        </a>
        </span>
      </p>
    </div>
  )
}

export default Footer
