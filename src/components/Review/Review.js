import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import ReviewItem from '../ReviewItem/ReviewItem'
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import giphy from '../../images/giphy.gif'
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced , setOrderPlaced] = useState(false)
    const history = useHistory()

    const handleProceedCheckout = () =>{
        history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        const  newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() => {
        //cart
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    } ,[])

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={giphy} alt=""/>
    }

    return (
        <div className="twin-container">
            <div className="product-container">
            {
                cart.map(pd => <ReviewItem 
                    key={pd.key} 
                    product={pd}
                    removeProduct={removeProduct}
                    ></ReviewItem>)
            }
            {
               thankYou
            }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                <button onClick={handleProceedCheckout} className="add-button">Proceed Checkout</button>
            </div>
        </div>
    );
};

export default Review;