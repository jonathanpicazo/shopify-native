import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";

const DefaultContext = {
  checkout: {
    lineItems: [],
  },
  addProductToCart: (variant: any) => {},
  setCheckout: (value: any) => {},
};

export const CartContext = createContext(DefaultContext);

export const CartProvider = ({ children }) => {
  const defaultCheckout = {
    lineItems: [],
  };

  const [checkout, setCheckout] = useState<any>(defaultCheckout);

  const addProductToCart = (variant) => {
    try {
      let newCheckout = checkout;
      // boolean to determine whether a duplicate item exists
      let foundDuplicate = false;
      // find duplicate item if it exists, update quantity
      const newLineItems = newCheckout.lineItems.map((el) => {
        if (el.shopifyVariant.id === variant.id) {
          // update quantity
          el.quantity += 1;
          foundDuplicate = true;
        }
        return el;
      });
      //
      newCheckout.lineItems = newLineItems;
      // otherwise, push as normal
      if (!foundDuplicate) {
        newCheckout.lineItems.push({
          shopifyVariant: variant,
          quantity: 1,
        });
      }
      setCheckout(newCheckout);
      // console.log("newCheckout is", newCheckout.lineItems.length, "items long");
      return newCheckout;
    } catch (err: any) {
      console.error(err);
    }
  };

  const value = useMemo(() => {
    return {
      checkout,
      setCheckout,
      addProductToCart,
    };
  }, [checkout, addProductToCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
