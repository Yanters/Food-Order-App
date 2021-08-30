import { useContext, useEffect, useState } from "react";
import classes from "./CartItem.module.css";
import CartContext from "../../store/cart-context";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { amount } = cartCtx.items[props.id];

  // console.log(cartCtx.items[props.id].amount);
  // console.log(props.id);

  useEffect(() => {
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [amount]);

  return (
    <li
      className={`${classes["cart-item"]} ${btnIsHighlighted && classes.bump}`}
    >
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onRemove}>−</button>
        <button onClick={props.onAdd}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
