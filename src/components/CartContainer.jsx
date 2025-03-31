import React from 'react'
import CartItem from './CartItem'

const CartContainer = () => {
  const total = 10
  const items = true

  if (items) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }

  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {[1].map((item) => {
          return <CartItem/>
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>{total}€</span>
          </h4>
        </div>
        <button className='btn clear-btn'>
          clear cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
