import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const HomeProductList = (props) => {
    const {
        productLists

    } = props
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
        </div>
    )
}

const mapStateToProps = state => {
    return {
        productLists : state.ushopProductLists
    }
}

export default connect(mapStateToProps)
                (HomeProductList)
