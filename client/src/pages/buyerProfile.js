import React, {useEffect} from 'react';
import '../styles/buyPage/profile.scss';
import OrdersProcess from '../components/buyerProfile/ordersProcess';
import HomeProductList from '../components/home/homeProductList';
import { connect } from 'react-redux';
import { getUsersFollowProductsAction, resetProductListAction } from '../reduxStore/actions/ushopAction';
import FollowedShops from '../components/buyerProfile/followedShops';

const BuyerProfile = ({getUsersFollowProductsDispatch, resetProductListDispatch}) => {
    useEffect(() => {
        getUsersFollowProductsDispatch('popular');

        return() => {
            resetProductListDispatch();

        }
    }, [])
    return (
        <div className='buyerProfile'>
            <OrdersProcess />
            
            <FollowedShops />
            <HomeProductList />
            
        </div>
    )
}

const mapStateToProps = state => {
    return {
        productLists : state.ushopProductLists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUsersFollowProductsDispatch : (filter) => dispatch(getUsersFollowProductsAction(filter)),
        resetProductListDispatch : () => dispatch(resetProductListAction())

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerProfile)
