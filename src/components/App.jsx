import React, {useEffect} from 'react'
import {useCartState, useCartDispatch} from '../context/context'

import Navbar from './Navbar'
import CartContainer from './CartContainer'

const App = () => {
  const {loading, cart} = useCartState();
  const {fetchData, getTotals} = useCartDispatch();
  console.log(cart);

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    getTotals();
  }, [cart])

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
