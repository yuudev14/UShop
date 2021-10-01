import React, {useEffect} from 'react'
import '../styles/sellerPage/sellerOrder.scss';
import { useDispatch, useSelector} from 'react-redux';
import {sellerAllOrdersAction, resetOrdersAction} from '../reduxStore/actions/sellerAction';

const SellerAllOrders = () => {

    const pendingOrders = useSelector(state => state.sellerOrders);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(sellerAllOrdersAction())
        return () => {
            dispatch(resetOrdersAction())
        }
    }, [])
    return (
        <div className='sellerOrderContainer'>
            <div className='sellerOrderList'>
                <h1>Pending Orders</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Order Number</th>
                            <th>Date</th>
                            <th>Buyer</th>
                            <th>Buyer Email</th>
                            <th>Items(s)</th>
                            <th>type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingOrders.map(order => (
                            <tr>
                                <td>
                                    <img src={order.image}/>
                                </td>
                                <td>{order.product_name}</td>
                                <td>{order.order_number}</td>
                                <td>{order.date}</td>
                                <td>{order.first_name} {order.last_name}</td>
                                <td>{order.email}</td>
                                <td>{order.item}</td>
                                <td>{order.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>  
        </div>
    )
}


export default SellerAllOrders
