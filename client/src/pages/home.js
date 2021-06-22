import React, {useEffect} from 'react';
import HomeProductList from '../components/home/homeProductList';
import MostPopular from '../components/home/mostPopular';
import PopularCategory from '../components/home/popularCategory';
import TopCategory from '../components/home/topCategory';
import '../styles/buyPage/home.scss';
import { connect } from 'react-redux';
import { getUshopProductListAction } from '../reduxStore/actions/ushopAction';
import { resetProductListAction } from '../reduxStore/actions/ushopAction';

const Home = ({getUshopProductsDispatch, resetProductListDispatch, productLists}) => {

    useEffect(() => {
        getUshopProductsDispatch(productLists.length, 'popular');

        return() => {
            resetProductListDispatch()

        }
    }, [])

    return (
        <div className='home'>
            <MostPopular />
            <PopularCategory />
            <TopCategory />
            <h1>For You</h1>
            <HomeProductList />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        productLists : state.ushopProductLists
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUshopProductsDispatch : (start, filter) => dispatch(getUshopProductListAction(start, filter)),
        resetProductListDispatch : () => dispatch(resetProductListAction())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)
