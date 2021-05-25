import React, { useContext} from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png'
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Review</Link>
                <Link to="/manage">Manage Inventory</Link>
                <button onClick={()=> setLoggedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;