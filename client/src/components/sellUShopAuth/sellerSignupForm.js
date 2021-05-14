import React, {useState, useEffect} from 'react'

const SellerSignupForm = () => {
    const [signupForm, setSignupForm] = useState({
        firstName : '',
        lastName : '',
        shopName : '',
        phoneNumber : '',
        email : '',
        password : '',
        retryPassword : '',
    })

    const setSignupFormMethod = (e) => {
        setSignupForm({
            ...signupForm,
            [e.target.name] : e.target.value,
        })
    }

    return (
        <form className='seller_signup_form'>
            <h1>Sign up</h1>
            <div className='nameForm'>
                <input 
                    type='text' 
                    name='firstName'
                    placeholder='First Name' 
                    value={signupForm.firstName}
                    onChange={setSignupFormMethod}
                    />
                <input 
                    type='text' 
                    name='lasttName'
                    placeholder='Last Name' 
                    value={signupForm.lasttName}
                    onChange={setSignupFormMethod}/>
            </div>
            <input 
                type='text' 
                name='shopName'
                placeholder='shop Name' 
                value={signupForm.shopName}
                onChange={setSignupFormMethod}/>
            <input 
                type='text' 
                name='phoneNumber'
                placeholder='Phone Number'
                value={signupForm.phoneNumber}
                onChange={setSignupFormMethod}/>
            <input 
                type='email' 
                name='email'
                placeholder='Email'
                value={signupForm.email}
                onChange={setSignupFormMethod}/>
            <input 
                type='password' 
                name='password'
                placeholder='Password'
                value={signupForm.password}
                onChange={setSignupFormMethod}/>
            <input 
                type='password' 
                name='retryPassword'
                placeholder='Retry Password'
                value={signupForm.retryPassword}
                onChange={setSignupFormMethod}/>
            <input type='submit' />
            <div className='socials'>
                <i className='fa fa-facebook'></i>
                <i className='fa fa-google'></i>
            </div>
        </form>
    )
}

export default SellerSignupForm
