import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux'

const SellerProductListHeader = (props) => {

    const {
        sellerProducts
    } = props;
    return (
        <div className='productListHeader'>
            <div className='viewProductsHeader1'>
                <div className='viewTotalProductList'>
                    <h3>{sellerProducts.length} Products</h3>
                    <h4>{sellerProducts.length} / {sellerProducts.length}</h4>
                </div>
                <div className='viewTotalProductools'>
                    <Link>
                        <button>Add a New Product</button>
                    </Link>

                </div>

            </div>
            <div className='viewProductsHeader2'>
                <ul>
                    <li>price</li>
                    <li>stock</li>
                    <li>top seller</li>
                </ul>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sellerProducts : state.sellerProducts
    }
}

export default connect(mapStateToProps)
                (SellerProductListHeader)
