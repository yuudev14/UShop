import React, {Fragment} from 'react'
import {useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import { addCartAction } from '../reduxStore/actions/cartAction';

const BuyerProductDetailOptions = ({addCartDispatch}) => {

    const {product_id}  = useParams();
    const addToCart = () => {
        addCartDispatch(product_id)
    }
    return (
        <Fragment>
            <button onClick={addToCart} className='fa fa-shopping-cart'></button>
            <button ></button>  
        </Fragment>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        addCartDispatch : (product_id) => dispatch(addCartAction(product_id))
    }
}

export default connect(null, mapDispatchToProps)(BuyerProductDetailOptions)
