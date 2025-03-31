import React, { useReducer, useMemo, useCallback, createContext, useContext } from 'react'
import { getCartItems } from '../api'
import actionTypes from './actions'
import cartReducer from './reducer'

const CartContext = createContext()
const CartDispatchContext = createContext()

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
}

const CartProvider = ({children}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const memoizedState = useMemo(() => state, [state])

  // const {total, amount} = state.cart.reduce((acc, cartItem) => {
  //   const {amount, price} = cartItem;
  //     return {total: price * amount + acc.total, amount: amount + acc.amount}
  //   }, {total: 0, amount: 0});

  return (
    // <CartContext.Provider value={{...memoizedState, amount, total: total.toFixed(2)}}>
    <CartContext.Provider value={memoizedState}>
      <CartDispatchContext.Provider value={{dispatch}}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  )
}

const useCartDispatch = () => {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within a CartProvider');
  }

  const {dispatch} = context;

  const clearCart = useCallback(() => dispatch({type: actionTypes.clearCart}), [
    dispatch
  ])

  const removeItem = useCallback((id) => dispatch({type: actionTypes.removeItem, payload: id}), [
    dispatch
  ])

  const increaseItem = useCallback((id) => dispatch({type: actionTypes.increaseItem, payload: id}), [
    dispatch
  ])

  const decreaseItem = useCallback((id) => dispatch({type: actionTypes.decreaseItem, payload: id}), [
    dispatch
  ])

  const getTotals = useCallback(() => dispatch({type: actionTypes.getTotals}), [
    dispatch
  ])

  const fetchData = useCallback(async (payload) => {
    dispatch({type: actionTypes.showLoader, payload})
    const response = await getCartItems()
    dispatch({type: actionTypes.displayItems, payload: response})
  }, [
    dispatch
  ])

  return {
    clearCart,
    removeItem,
    increaseItem,
    decreaseItem,
    fetchData,
    getTotals,
  }
}

const useCartState = () => {
  const context = useContext(CartContext)

  if (context === undefined) {
    throw new Error('useCartState must be used within a CartProvider')
  }
  return context
};

export { CartProvider, useCartState, useCartDispatch }
