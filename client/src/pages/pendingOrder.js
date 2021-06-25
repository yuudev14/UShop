import React, {useEffect} from 'react'
import '../styles/sellerPage/pendingOrder.scss';
import {connect} from 'react-redux';
import {sellerPendingOrdersAction, resetPendingOrdersAction} from '../reduxStore/actions/sellerAction';

const PendingOrder = ({sellerPendingOrdersDispatch, pendingOrders, resetSellerPendingOrdersDispatch}) => {
    useEffect(() => {
        sellerPendingOrdersDispatch();
        return () => {
            resetSellerPendingOrdersDispatch()

        }
    }, [])
    return (
        <div className='pendingOrderContainer'>
            <div className='pendingOrderList'>
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
                                <td className='button'><button>Deliver</button></td>
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
        sellerPendingOrdersDispatch : () => dispatch(sellerPendingOrdersAction()),
        resetSellerPendingOrdersDispatch : () => dispatch(resetPendingOrdersAction())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PendingOrder)
