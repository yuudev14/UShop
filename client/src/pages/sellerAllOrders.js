import React, {useEffect} from 'react'
import '../styles/sellerPage/sellerOrder.scss';
import {connect} from 'react-redux';
import {sellerAllOrdersAction, resetOrdersAction} from '../reduxStore/actions/sellerAction';

const SellerAllOrders = ({sellerAllOrdersDispatch, pendingOrders, resetOrdersDispatch}) => {
    useEffect(() => {
        sellerAllOrdersDispatch();
        return () => {
            resetOrdersDispatch()

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

const mapStateToProps = (state) => {
    return {
        pendingOrders : state.sellerOrders

    }
}

const mapDispatchToProps = dispatch => {
    return {
        sellerAllOrdersDispatch : () => dispatch(sellerAllOrdersAction()),
        resetOrdersDispatch : () => dispatch(resetOrdersAction())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SellerAllOrders)
