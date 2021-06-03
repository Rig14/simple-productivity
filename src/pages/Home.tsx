import React, { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../components/Navbar"
import { auth } from "../firebase"


const Home = () => {

  return (
    <div>
      <Navbar />
    </div>
  )
}

export default Home
