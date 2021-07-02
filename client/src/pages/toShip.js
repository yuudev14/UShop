import React, {useEffect} from 'react';
import '../styles/orders.scss';
import {connect} from 'react-redux';
import { getToShipOrdersAction, resetBuyerOrderAction } from '../reduxStore/actions/ushopAction';
import Orders from '../components/orders';

const ToShip = ({getToShipOrdersDispatch, orders, resetBuyerOrderDispatch}) => {
    useEffect(() => {
        getToShipOrdersDispatch();
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
        getToShipOrdersDispatch : () => dispatch(getToShipOrdersAction()),
        resetBuyerOrderDispatch : () => dispatch(resetBuyerOrderAction())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ToShip)
