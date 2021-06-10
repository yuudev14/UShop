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
        getUshopProductsDispatch,
        productLists
    } = props;

    useEffect(() => {
        getUshopProductsDispatch(productLists.length);

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

const mapStateToProps = (state) => {
    return {
        productLists : state.ushopProductLists
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUshopProductsDispatch : (start) => dispatch(getUshopProductListAction(start))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
                (Home)
