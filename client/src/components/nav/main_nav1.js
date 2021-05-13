import React from 'react';
import { Link } from 'react-router-dom';

const MainNav1 = () => {
    const socialMedia = [
        'facebook',
        'twitter',
        'instagram'
    ]


    const nav_offline = [
        'Register',
        'Log in',
    ]
    return (
        <div className='nav1'>
            <ul>
                <p>follow us on:</p>
                {socialMedia.map(social => (
                    <li><i className={ `fa fa-${social}`}></i></li>
                ))}
                
            </ul>
            <ul>
                <Link to='/sell-UShop'><li>Sell on UShop</li></Link>
                <li>Categories</li>
                {nav_offline.map(nav => (
                    <li>{nav}</li>
                ))}
                
            </ul>

        </div>
    )
}

export default MainNav1
