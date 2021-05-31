import React, {useRef} from 'react';
import { Link } from 'react-router-dom';

const Seller_nav = () => {

    const sellerMainNav = useRef();

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
                    link : 'view-product'
                },

            ]
        },
        {
            li : 'Store',
            dropdown : [
            ]
        },
        
    ]

    const openSellerMainNav = () => {
        sellerMainNav.current.classList.toggle('open');
        
    }
    return (
        <header>
            <nav className='nav_sellUShopAuth'>
                <i onClick={openSellerMainNav} className='menu-icon'>☰</i>
                <Link to='/sell-UShop'><h1>UShop Sell</h1></Link>
                <ul className='sellerNavMainList' ref={sellerMainNav}>
                    <i onClick={openSellerMainNav} className='fa fa-close'></i>
                    {nav.map(li => (
                        <li className='main-li'>
                            {li.li}  <i className='fa fa-angle-down'></i>
                            {li.dropdown.length > 0 && (
                                <ul className='seller_dropdown'>
                                    {li.dropdown.map( option => (
                                        <Link to={`/sell-UShop/${option.link}`}><li className='secondary-li' onClick={option.func}>{option.dropdown_li}</li></Link>
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
