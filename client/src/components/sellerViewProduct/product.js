import React from 'react';
import {connect} from 'react-redux'; 
import { deleteProductAction } from '../../reduxStore/actions/sellerAction';
import { Link } from 'react-router-dom';

const SellerProduct = (props) => {
    const {
        data,
        deleteProductDispatch
    } = props;
    
    const deleteProduct = () => {
        deleteProductDispatch(data.product_id)
    }

    return (
        <div className='productContainer'>
            <Link to={`/sell-UShop/product/${data.product_id}`}>
                <div className='prev-img'>
                    <img src={data.images[0]} />
                </div>
                <div className='productInfo'>
                    <h3>{data.product_name}</h3>
                    <div className='priceNstock'>
                        <p className='price'>price: ${data.price}</p>
                        <p className='stock'>Stock: {data.stock}</p>

                    </div>
                    <div className='viewHeartSales'>
                        <i className='fa fa-eye'> {data.seen}</i>
                        <i className='fa fa-heart'> {data.heart}</i>
                        <p> Sales 0</p>

                    </div>

                </div>
            </Link>
            
            <div className='productOption'>
                <Link to={`/sell-UShop/manage-product/${data.product_id}`}><button className='fa fa-edit'></button></Link>
                <div></div>
                <button onClick={deleteProduct} className='fa fa-trash'></button>

            </div>

        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        deleteProductDispatch : (product_id) => dispatch(deleteProductAction(product_id))
    }
}
export default connect(null, mapDispatchToProps)
                (SellerProduct)
