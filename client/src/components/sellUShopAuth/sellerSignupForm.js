import React from 'react'

const SellerSignupForm = () => {
    return (
        <form className='seller_signup_form'>
            <h1>Sign up</h1>
            <input type='text' placeholder='username/email'/>
            <input type='text' placeholder='username/email'/>
            <input type='text' placeholder='username/email'/>
            <input type='text' placeholder='username/email'/>
            <input type='password' placeholder='password'/>
            <input type='submit' />
            <div className='socials'>
                <i className='fa fa-facebook'></i>
                <i className='fa fa-google'></i>
            </div>
        </form>
    )
}

export default SellerSignupForm
