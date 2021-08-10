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
    });

    const errorsObject = {
        unique_email: '',
        unique_phone_number : '',
        passwordError : '',
        retryPasswordError : '',
        blanksError : '',
    }

    const [errors, setErrors] = useState(errorsObject)

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
        let errorFields = []
        const inputs = Object.values(signupForm).every(val => val !== '');
        if(!inputs){
            const errorInputs = Object.keys(signupForm).filter(key => signupForm[key] === '');
            errorFields = [...errorFields, ...errorInputs];
        }
        if(signupForm.password < 7){
            errorFields = [...errorFields, ...['password']];
            setErrors({
                ...errors,
                passwordError: 'password length should be more than 7'
            });

        }
        if(signupForm.password !== signupForm.retryPassword){
            errorFields = [...errorFields, ...['password', 'retryPassword']];
            setErrors({
                ...errors,
                retryPasswordError: 'password does not match'
            });
        }
        return errorFields;
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
                    phoneNumber : '',
                    email : '',
                    password : '',
                    retryPassword : '',
                    shopCategory : [],
                });
                history.push('/');
            } catch (error) {
                const errorKey = Object.keys(error)[0]
                if(errorKey === 'unique_phone_number'){
                    putErrorBorder(['phoneNumber']);
                    setErrors({
                        ...errorsObject,
                        ...error
                    });

                }else if(errorKey === 'unique_email'){
                    putErrorBorder(['email']);
                    setErrors({
                        ...errorsObject,
                        ...error
                    });

                }
                
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
                className={errors.unique_phone_number !== '' && 'errorInput2'}
                onChange={setSignupFormMethod}/>
            <p className='error'>{errors.unique_phone_number }</p>
            <input 
                type='email' 
                name='email'
                placeholder='Email'
                value={signupForm.email}
                className={errors.unique_email !== '' && 'errorInput2'}
                onChange={setSignupFormMethod}/>
            <p className='error'>{errors.unique_email }</p>
            <input 
                type='password' 
                name='password'
                placeholder='Password'
                value={signupForm.password}
                className={errors.passwordError !== '' && 'errorInput2'}
                onChange={setSignupFormMethod}/>
            <p className='error'>{errors.passwordError }</p>
            <input 
                type='password' 
                name='retryPassword'
                placeholder='Retry Password'
                value={signupForm.retryPassword}
                className={errors.retryPasswordError !== '' && 'errorInput2'}
                onChange={setSignupFormMethod}/>
            <p className='error'>{errors.retryPasswordError }</p>
            <input type='submit' />
            {/* <div className='socials'>
                <i className='fa fa-facebook'></i>
                <i className='fa fa-google'></i>
            </div> */}
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
