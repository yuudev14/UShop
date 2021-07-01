import React, {useEffect} from 'react';
import '../styles/orders.scss';
import {connect} from 'react-redux';
import { getAllOrdersAction } from '../reduxStore/actions/ushopAction';
import Orders from '../components/orders';

const BuyerAllOrders = ({getAllOrdersDispatch, orders}) => {
    useEffect(() => {
        getAllOrdersDispatch();

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
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyerAllOrders)
