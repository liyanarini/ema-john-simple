import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);


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