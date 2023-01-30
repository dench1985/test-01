import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Product from "../Product";
import Search from "../Search";
import s from './style.module.css'

 export default function App() {



useEffect (()=>{
(async () => {
  const resp = await fetch ('https://fakestoreapi.com/products');
  const data = await resp.json();
  setProducts( data.map(({id, title, image, price }) => ({id, title, image,price}))) ;
}) ()
},[]);

  const[products, setProducts] = useState ([]);

  const delete_product = (id) =>{
    setProducts(products.filter(product => product.id !==id));
  }

const search_handler = (substring) =>{
  substring = substring.toLowerCase();

   const new_products= products.map(product =>{
    product.show = product.title.toLowerCase().startsWith(substring);
    return product
  })
  setProducts(new_products); 
}

  return (
    <div  >
      <Search search_handler = {search_handler}/>
      <div className={s.product_container}>
         {
        products
        
        .map(product => 
        <Product 
        key= {product.id} 
        {...product} 
        delete_product={delete_product} 
        />)
      }
      </div>
     
    </div>
  );
}


