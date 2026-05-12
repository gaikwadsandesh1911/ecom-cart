import { CartContext } from "../context"

function CartContextProvider({children}) {

    const addToCart = ()=> {
        
    };

    const removeFromCart = ()=> {

    };

    const clearCart = ()=> {

    };

  return (
    <CartContext.Provider value={{addToCart, removeFromCart, clearCart}}>{children}</CartContext.Provider>
  )
}

export default CartContextProvider