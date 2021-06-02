import React, { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { auth } from "../firebase"


const Home = () => {

  return (
    <div>
      <Navbar />
      <Link to="/signup">sign up</Link>
      <br />
      <Link to="/login">sign in</Link>
    </div>
  )
}

export default Home
