const url = 'http://localhost:3001/cart'

const getCartItems = async () => {
  const response = await fetch(url)
  const cart = await response.json()
  return cart
}

export { getCartItems }
