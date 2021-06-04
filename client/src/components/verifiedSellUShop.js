import React, {useEffect} from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import SellerAddProduct from '../pages/sellerAddProduct';
import '../styles/sellerPage/sellerPage.scss';
import ViewProducts from '../pages/sellerViewProducts';
import SellerManageProduct from '../pages/sellerManageProduct';


const VerifiedSellUShop = (props) => {

    const {
        auth,
    } = props

    return (
        <div className='sellUShop'>
            {(auth.isAuth === false) && (
                <Redirect to ='/auth' />
            )}
            <Router>
                <Switch>
                    <Route exact path='/sell-UShop' render = {() => <div>home</div>}/>    
                    <Route exact path='/sell-UShop/add-product' component={SellerAddProduct}/>
                    <Route exact path='/sell-UShop/view-product' component={ViewProducts}/> 
                    <Route exact path='/sell-UShop/manage-product/:product_id' component={SellerManageProduct}/>    
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



export default connect(mapStateToProps)
                (VerifiedSellUShop)
