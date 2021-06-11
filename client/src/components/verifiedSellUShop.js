import React, {useEffect} from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import SellerAddProduct from '../pages/sellerAddProduct';
import '../styles/sellerPage/sellerPage.scss';
import ViewProducts from '../pages/sellerViewProducts';
import SellerManageProduct from '../pages/sellerManageProduct';
import SellerProductDetails from '../pages/sellerProductDetails';
import { verifyHasShop } from '../reduxStore/actions/authAction';


const VerifiedSellUShop = (props) => {

    const {
        auth,
        verifyHasShopDispatch
    } = props

    useEffect(() => {
        verifyHasShopDispatch();
    }, [])

    return (
        <div className='sellUShop'>
            {(auth.isAuth === false) && (
                <Redirect to ='/auth' />
            )}
            {(auth.isAuth === true && auth.hasShop === false) && (
                <Redirect to ='/registerShop' />
            )}
            <Router>
                <Switch>
                    <Route exact path='/sell-UShop' render = {() => <div>home</div>}/>    
                    <Route path='/sell-UShop/add-product' component={SellerAddProduct}/>
                    <Route path='/sell-UShop/view-product' component={ViewProducts}/> 
                    <Route path='/sell-UShop/product/:product_id' component={SellerProductDetails}/> 
                    <Route path='/sell-UShop/manage-product/:product_id' component={SellerManageProduct}/>    
                </Switch>
            </Router>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        verifyHasShopDispatch : () => dispatch(verifyHasShop())
    }
}



export default connect(mapStateToProps, mapDispatchToProps)
                (VerifiedSellUShop)
