import React, {useEffect} from 'react';
import '../styles/orders.scss';
import { useDispatch, useSelector} from 'react-redux';
import { getAllOrdersAction, resetBuyerOrderAction } from '../reduxStore/actions/ushopAction';
import Orders from '../components/orders';

const BuyerAllOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(state => state.buyerOrders)

    useEffect(() => {
        dispatch(getAllOrdersAction())
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

export default BuyerAllOrders;
