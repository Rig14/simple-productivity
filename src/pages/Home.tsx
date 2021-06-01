import React, { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../firebase"


const Home = () => {

  return (
    <div>
      
      <Link to="/signup">sign up</Link>
      <br />
      <Link to="/login">sign in</Link>
    </div>
  )
}

export default Home
