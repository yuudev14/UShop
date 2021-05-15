import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { registerAction } from '../../reduxStore/actions/authAction';
import { useHistory } from 'react-router-dom';

const SignupForm = (props) => {

    const {
        registerDispatch

    } = props;
    const history = useHistory();

    const [signupForm, setSignupForm] = useState({
        firstName : '',
        lastName : '',
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

    const putErrorBorder = (list) => {
        document.querySelectorAll('.signup_form input').forEach(input => {
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
                await registerDispatch(signupForm);
                setSignupForm({
                    firstName : '',
                    lastName : '',
                    shopName : '',
                    phoneNumber : '',
                    email : '',
                    password : '',
                    retryPassword : '',
                    shopCategory : [],
                });
                history.push('/');

                
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
        <form onSubmit={registerSeller} className='signup_form'>
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
        registerDispatch : (data) => dispatch(registerAction(data))

    }
}
export default connect(null, mapDispatchToProps)
                (SignupForm)
