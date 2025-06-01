import styles from "./Item.module.css";
import axios from "axios";
import {useState} from "react";
import {Link} from "react-router-dom"

export default function Item({ product }) {

    const [inCart, setInCart] = useState(product.inCart);


  const addToCart = async () => {
    try {
      await axios.patch(`http://localhost:3000/gadgets/${product.id}`, {
        inCart: true,
      });
      setInCart(true);
    } catch (error) {
      console.log(error);
    }

    try {
      const response = axios.post("http://localhost:3000/cart", {
        id: product.id,
        quantity: 1,
        price: product.price,
        total: product.price,
        image: product.image,
        name: product.name,
        instock: true,
      });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  
  return (
    <div className={styles.item}>
        {inCart? <div className={styles.tip}> Added </div>: null}
      <div className={styles.image}>
        <img
          src={product.image}
          alt="Item Image"
        />
        <div className="reviews">
          GHC {product.review} <i className="bi bi-star-fill"> </i>{" "}
          <span> ( {product.numberOfReviews})</span>
        </div>
      </div>
      <div className={styles.item_details}>
        <h2 className="item-title">{product.name}</h2>
        {/* <p className="item-description">This is a brief description of the item. It provides essential information about the item.</p> */}
        <div className={styles.price}>
          <span className="item-price">GHC {Number(product.price).toFixed(2)}</span>
          {inCart ? (
            <Link to={"/cart"}>
            <button>
              <i className="bi bi-cart-plus-fill"></i> &nbsp;View cart
            </button></Link>
          ) : (
            <button
              className="add-to-cart"
              onClick={() => {
                addToCart();
              }}
            >
              <i className="bi bi-cart-plus-fill"></i> &nbsp; Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
