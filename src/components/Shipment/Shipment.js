import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css'

const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
    console.log('form submitted', data)
    const savedCart = getDatabaseCart();
    const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()}

    fetch('https://serene-spire-26496.herokuapp.com/addOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    })
    .then(res => res.json())
    .then(data => {
      if(data){
        processOrder();
        alert('order placed successfully')
      }
    })
  }


  console.log(watch("example")); 
  console.log(loggedInUser);
  return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name Here"/>

      {errors.name && <span className="error">Name is required</span>}
      <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email Here"/>

      {errors.email && <span className="error">Email is required</span>}
      <input {...register("address", { required: true })} placeholder="Your Address Here"/>

      {errors.address && <span className="error">Address is required</span>}
      <input {...register("phn", { required: true })} placeholder="Your Phone Number Here"/>
      
      {errors.phn && <span className="error">Your phone number is required</span>}
      <input type="submit" />
    </form>
  );
};

export default Shipment;