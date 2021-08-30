import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);

  const { totalAmount: totalAmountCtx } = cartCtx;

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item, index) => (
        <CartItem
          key={item.id}
          id={index}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          className=""
        />
      ))}
    </ul>
  );

  const totalAmountClasses = btnIsHighlighted ? classes.bump : "";

  useEffect(() => {
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [totalAmountCtx]);

  // console.log(cartItems.props.children.length);

  return (
    <Modal onClose={props.onClose}>
      {cartItems.props.children.length === 0 ? (
        <p className={classes.noitems}>No items found.</p>
      ) : (
        cartItems
      )}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span className={totalAmountClasses}>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
