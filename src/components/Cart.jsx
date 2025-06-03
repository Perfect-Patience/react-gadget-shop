import { useEffect, useState } from "react";
import axios from "axios";

import Cart_item from "./Cart-item.jsx";
export default function Cart({search}) {
  const [cart, setCart] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const discount = 0;
  const shipping = 0; 
  const tax = 0;


   useEffect(() => {
    async function getCart() {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        setCart(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCart();
   
  }, []);

  const refreshCart = async () => {
   try {
    const response = await axios.get("http://localhost:3000/cart");
    setCart(response.data);
  } catch (error) {
    console.log(error);
  }
  }


   useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (Number(item.total)|| 0), 0);
    setSubTotal(total);
    setTotalCost( (total + shipping - discount - tax).toFixed(2));
    console.log("Total cost updated:", total);
  }, [cart]);

  return (
    <>
      <div className="container">
        <div className="cart-list">
          <h2>
            Cart <span>({cart?.length} products)</span>
          </h2>
          <div className="head">
            <span>Product</span>
            <span>Count</span>
            <span>Price</span>
          </div>
          <div className="collection">
            {cart.filter((item) => {
              return search.toLowerCase() === ''? item: item.name.toLowerCase().includes(search)
            }).map((item) => (
              //onCartChange here is a callback to notify this page if changes are made to the individual cart_items.
              //It calls refreshCart method which is defined above and rerenders the page.
              <Cart_item  item={item} key={item.id} onCartChange={refreshCart} />
            ))}
          </div>
        </div>
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          <div><p>Subtotal</p>
          <p>GHC {subTotal.toFixed(2)}</p></div>
          <div><p>Shipping</p>
          <p>GHC {shipping.toFixed(2)}</p></div>
          <div><p>Tax</p>
          <p>GHC {tax.toFixed(2)}</p></div>
          <hr/>
          <div><p>Discount</p>
          <p>GHC {discount.toFixed(2)}</p></div>
          <hr/>
          <div>
            <p>Total Price:</p>
          <p>GHC {totalCost}</p>
          </div>
          <button className="checkout-button">Checkout</button>
        </div>
      </div>
    </>
  );
}
