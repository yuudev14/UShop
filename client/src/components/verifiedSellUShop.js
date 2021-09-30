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
import SellerHome from '../pages/sellerHome';
import PendingOrder from '../pages/pendingOrder';
import SellerOutOfStockProducts from '../pages/sellerOutOfStockProducts';
import sellerAllOrders from '../pages/sellerAllOrders';


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
            {(auth.isAuth === true && auth.hasShop === false) ? (
                <Redirect to ='/registerShop' />
            ) : (
                <Router>
                    <Switch>
                        <Route exact path='/sell-UShop' component = {SellerHome}/>    
                        <Route path='/sell-UShop/add-product' component={SellerAddProduct}/>
                        <Route path='/sell-UShop/view-product' component={ViewProducts}/> 
                        <Route path='/sell-UShop/product/:product_id' component={SellerProductDetails}/> 
                        <Route path='/sell-UShop/manage-product/:product_id' component={SellerManageProduct}/>
                        <Route path='/sell-UShop/pending-orders' component={PendingOrder}/>
                        <Route path='/sell-UShop/all-orders' component={sellerAllOrders}/>
                        <Route path='/sell-UShop/out-of-stock' component={SellerOutOfStockProducts}/>

                    </Switch>
                </Router>
            )}
            
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
