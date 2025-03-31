import actionTypes from './actions'

const cartReducer = (state, action) => {
  switch (action.type) {
  case actionTypes.clearCart: {
    return {...state, cart: []}
  }
  case actionTypes.removeItem: {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload)
    }
  }
  case actionTypes.increaseItem: {
    const id = action.payload;
    const cart = state.cart.map((product) => {
      return {
        ...product,
        amount: id === product.id ? product.amount + 1 : product.amount
      };
    });
    return {...state, cart}
  }
  case actionTypes.decreaseItem: {
    const id = action.payload;
    const cart = state.cart.map((product) => {
      return {
        ...product,
        amount: id === product.id ? product.amount - 1 : product.amount
      };
    });
    return {...state, cart}
  }
  case actionTypes.showLoader: {
    return { ...state, loading: true }
  }
  case actionTypes.displayItems: {
    return {...state, cart: action.payload, loading: false}
  }
  case actionTypes.getTotals: {
    const {total, amount} = state.cart.reduce((acc, cartItem) => {
    const {amount, price} = cartItem;
      return {total: price * amount + acc.total, amount: amount + acc.amount}
    }, {total: 0, amount: 0});

    return {...state, amount, total: total.toFixed(2)}
  }

  default: {
    throw new Error(`Unhandled action type: ${action.type}`);
  }
  }
}

export default cartReducer
