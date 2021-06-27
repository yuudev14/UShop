import React,{ useEffect} from 'react'
import { connect } from 'react-redux'
import { getOutOfStockProductsAction, resetSellerProductsAction } from '../reduxStore/actions/sellerAction';
import SellerProduct from '../components/sellerViewProduct/product';
import '../styles/sellerPage/outOfStock.scss';

const SellerOutOfStockProducts = ({getOutOfStockProductsDispatch, resetSellerProductsDispatch, outOfStockProducts}) => {

    useEffect(() => {
        getOutOfStockProductsDispatch();
        return () => {
            resetSellerProductsDispatch()
        }
    }, [])
    return (
        <div className='sellerOutOfStockProducts'>
            <h1>Out of Stock</h1>
            <div className='ProductListContainer'>
                {outOfStockProducts.map(prod => (
                    <SellerProduct data={prod} />
                ))}

            </div>
            
        </div>
    )
}
const mapStateToProps = state => {
    return {
        outOfStockProducts: state.sellerProducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getOutOfStockProductsDispatch : () => dispatch(getOutOfStockProductsAction()),
        resetSellerProductsDispatch : () => dispatch(resetSellerProductsAction())

    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SellerOutOfStockProducts)
