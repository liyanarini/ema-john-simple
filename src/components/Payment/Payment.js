import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CardForm from './CardForm';

const stripePromise = loadStripe('pk_test_51JBNxoGR8KuHC5CteErDxnsexq2AiZkm7KNxJAk5pWWnoytQXPWQg9ISa9tFlxOIV29tM2yrYrqUQeUNiSwBiEkF00MWYoehvh');

const Payment = ({handlePayment}) => {
    return (
        <Elements stripe={stripePromise}>
            <CardForm handlePayment={handlePayment}></CardForm>
        </Elements>
    );
};

export default Payment;