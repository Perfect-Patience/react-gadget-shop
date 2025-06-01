import axios from "axios";
import { useState } from "react";

export default function Cart_item({ item, onCartChange }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.total);
  const handleIncrease = async () => {
    try {
      const newQuantity = quantity + 1;
      const newPrice = ((item.price * 100 * newQuantity) / 100).toFixed(2);

      setPrice();
      await axios.patch(`http://localhost:3000/cart/${item.id}`, {
        quantity: newQuantity,
        total: newPrice, //to prevent floating point errors in calculations
      });
      setQuantity(newQuantity);
      setPrice(newPrice);
      //Calls onChartChange to notify parent of changes in cart.
      if (onCartChange) onCartChange();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrease = async () => {
    if (quantity <= 1) {
      return;
    }

    try {
      const newQuantity = quantity - 1;
      const newPrice = ((item.price * 100 * newQuantity) / 100).toFixed(2);
      await axios.patch(`http://localhost:3000/cart/${item.id}`, {
        quantity: quantity - 1,
        total: newPrice,
      });
      setQuantity(quantity - 1);
      setPrice(newPrice);
      //calling onCartChange to run, to notify parent of changes in cart.
      if (onCartChange) onCartChange();
    } catch (error) {
      console.log(error);
    }
  };

async function handleDelete(){
  const confirmDelete = confirm("Do you really want to remove this from your cart? 😟");
  if(confirmDelete){
    const removeTag = await axios.patch(`http://localhost:3000/gadgets/${item.id}`,{
      inCart: false
    })
    console.log(removeTag)
    const response = await axios.delete(`http://localhost:3000/cart/${item.id}`);
    console.log(response);

    if(onCartChange) onCartChange();
  }

}

  return (
    <div className="cart_item">
      <div className="product">
        <div className="image">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="details">
          <h3>{item.name}</h3>
        </div>
      </div>
      <div className="count">
        <button
          className="decrease"
          onClick={() => {
            handleDecrease();
          }}
        >
          <i className="bi bi-dash-lg"></i>
        </button>
        <span className="quantity">{quantity}</span>
        <button
          className="increase"
          onClick={() => {
            handleIncrease(item.id);
          }}
        >
          <i className="bi bi-plus-lg"></i>
        </button>
      </div>
      <div className="price-details">
        <div className="price">GHC {Number(price).toFixed(2)}</div>
        <div
          className="close"
          onClick={() => {
            handleDelete();
          }}
        >
          <i className="bi bi-x-lg"></i>
        </div>
      </div>
    </div>
  );
}
