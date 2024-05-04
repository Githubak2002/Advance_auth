import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <nav className="flex justify-between items-center gap-5 w-full px-5 mt-2">
        <Link to="/">
          <span className="black text-2xl">Auth</span>
        </Link>

        <div className="flex gap-7">
          <Link to="/signup">SignUp</Link>
          <Link to="/login">Login</Link>
        </div>
      </nav>
  )
}

export default Nav