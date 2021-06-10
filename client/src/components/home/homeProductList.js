import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getUshopProductListAction } from '../../reduxStore/actions/ushopAction';

const HomeProductList = (props) => {
    const {
        productLists,
        getUshopProductsDispatch

    } = props;

    const seeMoreProducts = () => {
        getUshopProductsDispatch(productLists.length)

    }
    return (
        <div className='forYou'>
            <h1>For You</h1>
            <div className='productContainer'>
                {productLists.map(prod => (
                    <Link className='product'>
                        <div className='prev-img'>
                            <img src={prod.images} />
                        </div>
                        <div className='productInfo'>
                            <h3>{prod.product_name}</h3>
                            <div className='priceNstock'>
                                <p className='price'>price: ${prod.price}</p>
                                <p className='stock'>Sold: {prod.sold}</p>

                            </div>
                        </div>
                    </Link>

                ))}
                
                
            </div>
            <button onClick={seeMoreProducts}>see more</button>
            
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
        getUshopProductsDispatch : (start) => dispatch(getUshopProductListAction(start))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)
                (HomeProductList)
