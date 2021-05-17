import React from 'react';
import { Link } from 'react-router-dom';

const Seller_nav = () => {

    const nav = [
        {
            li : 'Products',

            dropdown : [
                {
                    dropdown_li : 'Add Product',
                    func : null,
                    link : 'add-product'
                },
                {
                    dropdown_li : 'Manage Product',
                    func : null,
                    link : 'add-product'
                },
                {
                    dropdown_li : 'View Product',
                    func : null,
                    link : 'add-product'
                },

            ]
        },
        {
            li : 'Store',
            dropdown : [
            ]
        },
        
    ]
    return (
        <header>
            <nav className='nav_sellUShopAuth'>
                <Link to='/sell-UShop'><h1>UShop Sell</h1></Link>
                <ul>
                    {nav.map(li => (
                        <li>
                            {li.li}  <i className='fa fa-angle-down'></i>
                            {li.dropdown.length > 0 && (
                                <ul className='seller_dropdown'>
                                    {li.dropdown.map( option => (
                                        <Link to={`/sell-UShop/${option.link}`}><li onClick={option.func}>{option.dropdown_li}</li></Link>
                                    ))}
                                </ul>
                            )}

                        </li>
                    ))}
                </ul>
                <Link to='/'><h3>Buy on UShop</h3></Link>
            </nav>
        </header>
    )
}

export default Seller_nav
