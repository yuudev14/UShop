import React, {useState} from 'react';
import '../../styles/nav/sellerNav.scss';
import { connect } from 'react-redux';
import { loginAction, verifyHasShop } from '../../reduxStore/actions/authAction';
import { useHistory } from 'react-router-dom';
import { getCartProductAction } from '../../reduxStore/actions/cartAction';

const LoginForm = (props) => {

    const {
        loginDispatch,
        getCartProductsDispatch,
        verifyHasShopDispatch

    } = props;

    const history = useHistory();

    const [loginForm, setLoginForm] = useState({
        email : '',
        password : '',
    })

    const setLoginFormMethod = (e) => {
        setLoginForm({
            ...loginForm,
            [e.target.name] : e.target.value,
        })
    }
    const putErrorBorder = (list) => {
        document.querySelectorAll('.login_form input').forEach(input => {
            if(list.includes(input.name)){
                input.classList.add('errorInput');
            }else{
                input.classList.remove('errorInput');

            }
        })
    }

    const checkFormErrors = () => {
        let errors = []
        const inputs = Object.values(loginForm).every(val => val !== '');
        if(!inputs){
            const errorInputs = Object.keys(loginForm).filter(key => loginForm[key] === '');
            errors = [...errors, ...errorInputs];
        }
        return errors;
    }

    const loginSeller = async(e) => {
        e.preventDefault();
        putErrorBorder(checkFormErrors());
        if(!checkFormErrors.length){
            try {
                await loginDispatch(loginForm);
                setLoginForm({
                    email : '',
                    password : '',
                });
                getCartProductsDispatch();
                verifyHasShopDispatch();
                history.push('/');
            } catch (error) {
                console.log(error)
                
            }

        }
    }
    return (
        <form className='login_form' onSubmit={loginSeller}>
            <h1>Log in</h1>
            <input 
                type='email' 
                name='email'
                placeholder='Email'
                value={loginForm.email}
                onChange={setLoginFormMethod}/>
            <input 
                type='password' 
                name='password'
                placeholder='Password'
                value={loginForm.password}
                onChange={setLoginFormMethod}/>
            <input type='submit' />
            or
            <div className='socials'>
                <i className='fa fa-facebook'></i>
                <i className='fa fa-google'></i>
            </div>
        </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginDispatch : (data) => dispatch(loginAction(data)),
        getCartProductsDispatch : () => dispatch(getCartProductAction()),
        verifyHasShopDispatch : () => dispatch(verifyHasShop())
    }
}
export default connect(null, mapDispatchToProps)
                (LoginForm)
