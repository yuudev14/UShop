import React, {useEffect} from 'react';
import '../styles/orders.scss';
import {useDispatch, useSelector} from 'react-redux';
import { getToShipOrdersAction, resetBuyerOrderAction } from '../reduxStore/actions/ushopAction';
import Orders from '../components/orders';

const ToShip = () => {

    const orders = useSelector(state => state.buyerOrders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getToShipOrdersAction());
        return () => {
            dispatch(resetBuyerOrderAction())
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

export default ToShip;
