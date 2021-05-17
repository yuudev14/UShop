import React from 'react'

const SellerAddProduct = () => {
    return (
        <div className='addProducts'>
            <form className='addProductsForm'>
                <h1>Add Products</h1>
                <div className='inputContainer'>
                    <p>Product name</p>
                    <input id='productName' type='text' />
                </div>
                <div className='inputContainer'>
                    <p>Category</p>
                    <select id='category'>
                        
                    </select>
                </div>
                <div className='inputContainer'>
                    <p>Price</p>
                    <input id='productName' type='number' />
                </div>
                <div className='inputContainer'>
                    <p>Status</p>
                    <select id='productStatus'>
                    </select>
                </div>
                <div className='inputContainer'>
                    <p>Images</p>
                    <label htmlFor='productNameImage'>
                        <i className='fa fa-plus'></i>
                    </label>
                    <input type='file' id='productNameImage' />
                </div>
                <div className='inputContainer'>
                    <p >Product name</p>
                    <textarea id='productDescription'>
                    </textarea>
                </div>
                <div className='inputContainer'>
                    <p></p>
                    <input type='submit' id='submitAddProduct' />
                </div>
                
            </form>
            
        </div>
    )
}

export default SellerAddProduct
