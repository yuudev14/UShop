import React, {Fragment} from 'react'
import {useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { setCartAction } from '../reduxStore/actions/cartAction';

const BuyerProductDetailOptions = ({setCartDispatch}) => {

    const {product_id}  = useParams();
    const addToCart = () => {
        const ushop = JSON.parse(localStorage.getItem('UShop'))
        let carts;
        if(ushop){
            if(ushop.hasOwnProperty('cart')){
                if(!ushop.cart.includes(product_id)){
                    carts = {
                        cart : [...ushop.cart, product_id]
                    }
                }else{
                    carts = {
                        cart : [...ushop.cart]
                    }
                }
            }else{
                carts = {
                    cart : [product_id]
                }
            }

        }else{
            carts = {
                cart : [product_id]
            }

        }
        

        localStorage.setItem('UShop', JSON.stringify({...ushop, ...carts}));
        setCartDispatch();
    }
    return (
        <Fragment>
            <button onClick={addToCart} className='fa fa-shopping-cart'></button>
            <button ></button>  
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        setCartDispatch : () => dispatch(setCartAction())
    }
}

export default connect(null, mapDispatchToProps)(BuyerProductDetailOptions)
