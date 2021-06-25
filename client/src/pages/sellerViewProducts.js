import React, {useEffect} from 'react';
import SellerViewForm from '../components/sellerViewProduct/form';
import SellerProduct from '../components/sellerViewProduct/product';
import SellerProductListHeader from '../components/sellerViewProduct/productListHeader';
import { connect } from 'react-redux';
import { getSellerProductAction, resetSellerProductsAction } from '../reduxStore/actions/sellerAction';

const ViewProducts = (props) => {

    const {
        getSellerProductDispatch,
        sellerProducts,
        resetSellerProductsDispatch

    } = props;

    useEffect(() => {
        getSellerProductDispatch()
        return () => {
            resetSellerProductsDispatch();
        }
    }, [])
    return (
        <div className='viewSellerProducts'>
            <SellerViewForm />
            <div className='productList'>
                <SellerProductListHeader /> 
                <div className='ProductListContainer'>
                    {sellerProducts.map(prod => (
                        <SellerProduct data={prod}/>
                    ))}
                </div>
            </div>  
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        sellerProducts : state.sellerProducts
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSellerProductDispatch : () => dispatch(getSellerProductAction()),
        resetSellerProductsDispatch : () => dispatch(resetSellerProductsAction()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)
                    (ViewProducts)
