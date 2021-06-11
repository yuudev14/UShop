import React, {Fragment} from 'react'
import {Link, useParams} from 'react-router-dom';
import { useHistory } from 'react-router';
import axios from 'axios';

const SellerProductDetailOption = () => {

    const history = useHistory();
    const {product_id} = useParams();

    const deleteProduct = async() => {
        try {
            const requestDeleteProduct = await axios.delete(`/sell-ushop/delete-product/${product_id}`, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
            if(requestDeleteProduct.data === true){
                history.push('/sell-UShop/view-product'); 
            }
        } catch (error) {
            console.log(error);
            
        }
        
    }
    return (
        <Fragment>
            <Link to={`/sell-UShop/manage-product/${product_id}`}><button className='fa fa-edit'></button></Link>
            <button onClick={deleteProduct} className='fa fa-trash'></button>
            
            
        </Fragment>
    )
}

export default SellerProductDetailOption
