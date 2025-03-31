import React from 'react'


import Navbar from './Navbar'
import CartContainer from './CartContainer'

const App = () => {
  const loading = true

  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    )
  }
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}

export default App
