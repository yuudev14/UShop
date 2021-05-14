import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { registerSellerAction } from '../../reduxStore/actions/authAction';

const SellerSignupForm = (props) => {

    const {
        registerSellerDispatch

    } = props;
    const [signupForm, setSignupForm] = useState({
        firstName : '',
        lastName : '',
        shopName : '',
        phoneNumber : '',
        email : '',
        password : '',
        retryPassword : '',
        shopCategory : [],
    })

    const setSignupFormMethod = (e) => {
        setSignupForm({
            ...signupForm,
            [e.target.name] : e.target.value,
        })
    }

    const putErrorBorder = (list) => {
        document.querySelectorAll('.seller_signup_form input').forEach(input => {
            if(list.includes(input.name)){
                input.classList.add('errorInput');
            }else{
                input.classList.remove('errorInput');

            }
        })
    }

    const checkFormErrors = () => {
        let errors = []
        const inputs = Object.values(signupForm).every(val => val !== '');
        if(!inputs){
            const errorInputs = Object.keys(signupForm).filter(key => signupForm[key] === '');
            errors = [...errors, ...errorInputs];
        }
        if(signupForm.password !== signupForm.retryPassword){
            errors = [...errors, ...['password', 'retryPassword']];
        }
        return errors;
    }


    const registerSeller = async(e) => {
        e.preventDefault();
        putErrorBorder(checkFormErrors());
        if(checkFormErrors().length === 0){
            try {
                await registerSellerDispatch(signupForm);
                // setSignupForm({
                //     firstName : '',
                //     lastName : '',
                //     shopName : '',
                //     phoneNumber : '',
                //     email : '',
                //     password : '',
                //     retryPassword : '',
                //     shopCategory : [],
                // })

                
            } catch (error) {
                if(error === 'unique_shopname'){
                    putErrorBorder(['shopName']);

                }else if(error === 'unique_email'){
                    putErrorBorder(['email']);

                }else if(error === 'password_length'){
                    putErrorBorder(['password', 'retryPassword']);

                };
                
            }
            
        }
    }

    return (
        <form onSubmit={registerSeller} className='seller_signup_form'>
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
                    name='lastName'
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

const mapDispatchToProps = dispatch => {
    return {
        registerSellerDispatch : (data) => dispatch(registerSellerAction(data))

    }
}
export default connect(null, mapDispatchToProps)
                (SellerSignupForm)
