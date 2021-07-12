import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product'
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import './Shop.css';
import { Link } from 'react-router-dom';


const Shop = () => {
    // const first10 = fakeData.slice(0,10)
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);
    const [search , setSearch] = useState('');

    useEffect(() => {
        fetch('https://serene-spire-26496.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length > 0){
            const previousCart = productKeys.map(existingKey => {
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                console.log(existingKey, savedCart[existingKey]);
                return product;
            })
            setCart(previousCart);
        }
    }, [products])
    
    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others , sameProduct];
        }
        else{
            product.quantity = 1;
            newCart= [...cart, product]
        }

        setCart(newCart);

        addToDatabaseCart(product.key, count);
    }

    const handleSearch = e => {
        setSearch(e.target.value);
    }
    console.log(search)

    
    return (
        <div className="twin-container">
            <div className="product-container">
                <input type="text" onBlur={handleSearch} placeholder="Search products here..." className="product-search" />
                {
                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct={handleAddProduct} 
                        product={pd} 
                        >
                        </Product>)
                }
            </div>
            
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                <Link to="/review">
                  <button className="add-button"> Review Order </button>
                </Link> 
            </div>
        </div>
    );
};

export default Shop;