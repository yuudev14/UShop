import React, {useEffect, useState} from 'react';
import '../styles/buyPage/categoryProducts.scss';
import HomeProductList from '../components/home/homeProductList';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCategoryProductsAction } from '../reduxStore/actions/ushopAction';

const CategoryProducts = ({getCategoryProductsDispatch}) => {
    const {category} = useParams();

    useEffect(() => {
        getCategoryProductsDispatch('popular', category);
        
    }, [])
    return (
        <div className='categoryProducts'>
            <HomeProductList />
            
        </div>
    )
}


const mapDispatchToProps = (dispatch) => {
    return{
        getCategoryProductsDispatch : (filter, category) => dispatch(getCategoryProductsAction(filter, category))

    }

}

export default connect(null, mapDispatchToProps)(CategoryProducts)
