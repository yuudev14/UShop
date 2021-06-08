import React,{ useEffect} from 'react';
import HomeProductList from '../components/home/homeProductList';
import MostPopular from '../components/home/mostPopular';
import PopularCategory from '../components/home/popularCategory';
import TopCategory from '../components/home/topCategory';
import '../styles/buyPage/home.scss';
import { connect } from 'react-redux';
import {getUshopProductListAction} from '../reduxStore/actions/ushopAction';

const Home = (props) => {

    const {
        getUshopProductsDispatch
    } = props;

    useEffect(() => {
        getUshopProductsDispatch();

    }, [])

    return (
        <div className='home'>
            <MostPopular />
            <PopularCategory />
            <TopCategory />
            <HomeProductList />
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getUshopProductsDispatch : () => dispatch(getUshopProductListAction())
    }
}

export default connect(null, mapDispatchToProps)
                (Home)
