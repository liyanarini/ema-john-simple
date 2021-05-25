import React, { useContext, useState } from 'react';    
import './Login.css'
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router'

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  console.log(from)

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  
  const handleGoogleSignIn = () => {
      firebase.auth().signInWithPopup(googleProvider)
      .then(res => {
        const {displayName, photoURL, email} = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
      })
      .catch(err => {
        console.log(err);
        console.log(err.message);
      })
    } 
  
    const handleFbSignIn = () => {
     firebase
    .auth()
    .signInWithPopup(fbProvider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;
  
      // The signed-in user info.
      var user = result.user;
      
  
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var accessToken = credential.accessToken;
  
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
  
      // ...
    });
    }
  
    const handleSignOut = () =>{
      firebase.auth().signOut()
      .then( res => {
        const signOutUser ={
          isSignedIn: false,
          name: '',
          email: '',
          photo: '',
          error: '',
          success: false
        }
         setUser(signOutUser)
      })
      .catch( err => {
        console.log(err);
        console.log(err.message);
      })
    }
  

  const handleChange = (event) => {
    let isFieldValid = true;

    if (event.target.name === 'email'){
      const isFieldValid =  /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password'){
      const isPasswordValid = event.target.value.length > 6
      const hasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && hasNumber;
  }
  if(isFieldValid){

    const newUserInfo = {...user}
    newUserInfo[event.target.name] = event.target.value;
    setUser(newUserInfo)
  }
}
  const handleSubmit = (e) => {
    console.log(user.email, user.password)
    if (newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(res => {
        const newUserInfo = {...user};
        newUserInfo.error = '';
        newUserInfo.success = true;
        setUser(newUserInfo);
        console.log(history)
      })
      .catch((error) => {
        const newUserInfo = {...user};
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
    }

    if (!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res => {
      const newUserInfo = {...user};
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo);
      history.replace(from);
      console.log('sign is user info', res.user);
    })
    .catch(function(error) {
      const newUserInfo = {...user};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo);
    });
    }

    e.preventDefault();
  }

  
  const updateUserName = name => {
    const user = firebase.auth().currentUser;
  
    user.updateProfile({
      displayName: name
    })
    .then(function() {
      console.log('User name updated successfully')
    })
    .catch(function(error) {
      console.log(error)
    });
    }

  return (
    <div className="Login">
      { user.isSignedIn ?  <button onClick={handleSignOut}>Sign out</button> :
      <button onClick={handleGoogleSignIn}>Sign in</button>
      }
      <br />
      <button onClick={handleFbSignIn}>Sign in with facebook</button>
       
      {
        user.isSignedIn && 
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <form onSubmit={handleSubmit}>
      <h1>Our Own Authentication</h1>
      <input type="checkbox" name="newUser" id="" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="newUser">New user sign up</label>
      <br />
      {
       newUser && <input name="name" onBlur={handleChange} type="text" placeholder="Your name here"/>
      }
      <br />
      <input type="text" onBlur={handleChange} placeholder="Your email here" required name="email"/>
      <br />
      <input type="password" onChange={handleChange} placeholder="Your password here" required name="password" id="" />
      <br />
      <input type="submit" value={newUser? 'Sign Up' : 'Sign In'} />
      </form>
      <p style={{color:'red'}}>{user.error}</p>
      {
        user.success && <p style={{color:'green'}}>User {newUser? 'created' : 'logged in'} successfully!</p>
      }
    </div>
  );
}

export default Login;
