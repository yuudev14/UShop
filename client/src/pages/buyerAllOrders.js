import React, {useEffect} from 'react';
import '../styles/orders.scss';
import {connect} from 'react-redux';
import { getAllOrdersAction, resetBuyerOrderAction } from '../reduxStore/actions/ushopAction';
import Orders from '../components/orders';

const BuyerAllOrders = ({getAllOrdersDispatch, orders, resetBuyerOrderDispatch}) => {
    useEffect(() => {
        getAllOrdersDispatch();
        return () => {
            resetBuyerOrderDispatch()
        }

    }, [])
    return (
        <div className='allOrders'>
            <h1>Orders</h1>
            {orders.map(order => (
                <Orders data={order}/>

            ))}
            
            
            
        </div>
    )
}
const mapStateToProps = state => {
    return {
        orders : state.buyerOrders
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getAllOrdersDispatch : () => dispatch(getAllOrdersAction()),
        resetBuyerOrderDispatch : () => dispatch(resetBuyerOrderAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerAllOrders)
