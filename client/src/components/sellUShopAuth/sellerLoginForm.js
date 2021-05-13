import React from 'react';
import '../../styles/nav/sellerNav.scss';

const SellerLoginForm = () => {
    return (
        <form className='seller_login_form'>
            <h1>Log in</h1>
            <input type='text' placeholder='username/email'/>
            <input type='password' placeholder='password'/>
            <input type='submit' />
            or
            <div className='socials'>
                <i className='fa fa-facebook'></i>
                <i className='fa fa-google'></i>
            </div>
        </form>
    )
}

export default SellerLoginForm
