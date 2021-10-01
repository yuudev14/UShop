import React, {useEffect} from 'react';
import SellerViewForm from '../components/sellerViewProduct/form';
import SellerProduct from '../components/sellerViewProduct/product';
import SellerProductListHeader from '../components/sellerViewProduct/productListHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getSellerProductAction, resetSellerProductsAction } from '../reduxStore/actions/sellerAction';

const ViewProducts = () => {


    const sellerProducts = useSelector(state => state.sellerProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSellerProductAction())
        return () => {
            dispatch(resetSellerProductsAction())
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

export default ViewProducts;
