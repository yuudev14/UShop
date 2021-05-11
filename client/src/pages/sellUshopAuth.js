import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/sellUshopAuth/sellUshopAuth.scss';

const SellUshopAuth = () => {
    return (
        <div className='sellUShopAuth'>
            <header>
                <nav className='nav_sellUShopAuth'>
                    <Link to='/sell-UShop'><h1>UShop Sell</h1></Link>
                    <Link to='/'><h3>Buy on UShop</h3></Link>
                </nav>
            </header>
            <div className='sellAuthConta9'>

            </div>
        </div>
    )
}

export default SellUshopAuth
