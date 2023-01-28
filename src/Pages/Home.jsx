import React from 'react';
import Chat from '../components/Chat';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const Home = () =>
{
  return (
    <div className="home">
      <div className='container'>
        <Sidebar />
        <Chat />
      </div>
      <Footer/>
    </div>
  )
}

export default Home