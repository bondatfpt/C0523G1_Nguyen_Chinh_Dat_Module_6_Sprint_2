import React, { useEffect, useState } from "react";
import { truncateString,getProductLatestOfWomen } from "../service/ProductService";

export default function Women() {
  const [products, setProducts] = useState();
  const fetchData = async () => {
    const products = await getProductLatestOfWomen();
    setProducts(products);
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (!products){
    return null;
  }

  return (
    <div>
      <section className="section" id="women">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Women's latest</h2>
                <span>Check out all of our products.</span>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {products.map((item)=> (
               <div style={{marginBottom:"15px"}} key={item.id} className="col-lg-4">
               <div className="item">
                 <div className="thumb">
                   <div className="hover-content">
                     <ul>
                       <li>
                         <a href="single-product.html">
                           <i className="fa fa-eye" />
                         </a>
                       </li>
                       <li>
                         <a href="single-product.html">
                           <i className="fa fa-star" />
                         </a>
                       </li>
                       <li>
                         <a href="single-product.html">
                           <i className="fa fa-shopping-cart" />
                         </a>
                       </li>
                     </ul>
                   </div>
                   <img src={item.path} style={{width:"100%", height:"450px"}} />
                 </div>
                 <div className="down-content">
                   <h4>{truncateString(item.name)}</h4>
                   <span>${item.price}</span>
                   <ul className="stars">
                     <li>
                       <i className="fa fa-star" />
                     </li>
                     <li>
                       <i className="fa fa-star" />
                     </li>
                     <li>
                       <i className="fa fa-star" />
                     </li>
                     <li>
                       <i className="fa fa-star" />
                     </li>
                     <li>
                       <i className="fa fa-star" />
                     </li>
                   </ul>
                 </div>
               </div>
             </div>
            ))}
           
          </div>
        </div>
      </section>
    </div>
  );
}
