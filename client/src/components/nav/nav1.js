import React from 'react'

const Nav1 = () => {
    const socialMedia = [
        'facebook',
        'twitter',
        'instagram'
    ]

    const nav = [
        'Sell on UShop',
        'Categories',
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
                {nav.map(nav => (
                    <li>{nav}</li>
                ))}
                {nav_offline.map(nav => (
                    <li>{nav}</li>
                ))}
                
            </ul>

        </div>
    )
}

export default Nav1
