import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch(`https://serene-spire-26496.herokuapp.com/product/`+ productKey )
        .then( res => res.json())
        .then( data => setProduct(data));
    }, [productKey])
    // const product = fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h1>Your Product Details</h1>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;