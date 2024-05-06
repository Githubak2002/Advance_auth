import React, { useState } from 'react'

const VerifyUserEmail = () => {

  const [email,setEmail] = useState("");
  return (
    <section className='h-[80vh] flexCenter '>
      
      <label htmlFor="email">Email</label>
    </section>
  )
}

export default VerifyUserEmail