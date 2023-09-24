import React from 'react'
import Notes from './Notes';
import Navbar from './Navbar'

const Home = (props) => {
  return (
    <div>
      <Navbar/>
         <Notes showAlert/>
    </div>
  )
}

export default Home
