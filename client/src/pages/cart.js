import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import '../styles/buyPage/cart.scss';
import HomeProductList from '../components/home/homeProductList';
import axios from 'axios';
import CartProduct from '../components/cart/cartProduct';
import OrderForm from '../components/cart/orderForm';
import { getUshopProductListAction, resetProductListAction } from '../reduxStore/actions/ushopAction';
import { Redirect } from 'react-router-dom';
import { checkAllCartAction } from '../reduxStore/actions/cartAction';

const Cart = (props) => {
    const {auth, getUshopProductsDispatch, resetProductListDispatch, productLists, cart, checkAllCartDispatch}  = props;

    useEffect(()=> {
        getUshopProductsDispatch(productLists.length, 'popular');

        return() => {
            resetProductListDispatch()
        }

    }, [])


    
    return (
        <div className='cart'>
            {auth.isAuth === false && <Redirect to='/auth' />}
            <div className='cartContainer'>
                <div className='cartList'>
                    <div className='cartHeader'>
                        <label>
                            <input type='checkBox' onChange={() =>checkAllCartDispatch()} checked={cart.every(prod => prod.checked)}/>  select all {cart.length} items
                        </label>

                        <button className='fa fa-trash'>Delete</button>
                        

                    </div>
                    <div className='cartProducts'>
                    <CartProduct/>
                    </div>
                </div>
                <OrderForm/>
            </div>
            <h1>For You</h1>
            <HomeProductList />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        productLists : state.ushopProductLists,
        auth : state.auth,
        cart : state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUshopProductsDispatch : (start, filter) => dispatch(getUshopProductListAction(start, filter)),
        resetProductListDispatch : () => dispatch(resetProductListAction()),
        checkAllCartDispatch : () => dispatch(checkAllCartAction())
    }
}
export default  connect(mapStateToProps, mapDispatchToProps)(Cart)
