import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import SellerLoginForm from '../components/sellUShopAuth/sellerLoginForm';
import SellerSignupForm from '../components/sellUShopAuth/sellerSignupForm';
import '../styles/sellUshopAuth/sellUshopAuth.scss';

const SellUshopAuth = () => {
    const sellAuthContainer = useRef();


    return (
        <div className='sellUShopAuth'>
            
            <div ref={sellAuthContainer} className='sellAuthContainer '>
                <SellerLoginForm />
                <SellerSignupForm />
                <div className='overlay_container'>
                    <div className='overlay'>
                        <div 
                            onClick={() => sellAuthContainer.current.classList.remove('sellAuthContainerActive')}
                            className='overlay_div login_overlay'>
                            <h1>Welcome Back</h1>
                            <p>To be connected with us log in with your personal info</p>
                            <button>login</button>
                        </div>
                        <div onClick={() => sellAuthContainer.current.classList.add('sellAuthContainerActive')} 
                            className='overlay_div signup_overlay'>
                            <h1>Hello Friend</h1>
                            <p>Enter your personal details and start selling with us</p>
                            <button>signup</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellUshopAuth
