import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const {name, img, seller, price, stock} = props.product;
        return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div className="product-info">
                 <h4 className="product-name">{name}</h4>
                 <br/>
                 <p><small>by: {seller}</small></p>
                 <br/>
                 <p>${price}</p>
                 <p><small>Only {stock} left in stock - order soon</small></p>
                 <button 
                 className="add-button" 
                 onClick={() => props.handleAddProduct(props.product)}> 
                 <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                 </button>
            </div>
            
        </div>
    );
};

export default Product;