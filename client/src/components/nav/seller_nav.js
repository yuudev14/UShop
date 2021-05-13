import React from 'react';
import { Link } from 'react-router-dom';

const Seller_nav = () => {
    return (
        <header>
            <nav className='nav_sellUShopAuth'>
                <Link to='/sell-UShop'><h1>UShop Sell</h1></Link>
                <Link to='/'><h3>Buy on UShop</h3></Link>
            </nav>
        </header>
    )
}

export default Seller_nav
