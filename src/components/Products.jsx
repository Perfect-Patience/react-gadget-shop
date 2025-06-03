import Item from "./Item"
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products({search}){
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        try{
            const response = await axios.get('http://localhost:3000/gadgets');
            setProducts(response.data);
            console.log(products);

        } catch(error){
            console.log(error);
        }
    }

useEffect(() => {
    getProducts();
},[]);


    return(
        <>
        <div className="products">
            <h2 className="title">Products</h2>
            <div className="products-list">

                {products.filter((product)=>{
                    return search.toLowerCase() === ''? product: product.name.toLowerCase().includes(search)
                }).map((product) => (
                    <Item product={product} key={product.id} />
                ))}
                
                </div>

        </div>
        </>
    )
}