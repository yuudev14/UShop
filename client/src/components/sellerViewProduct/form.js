import React from 'react'

const SellerViewForm = () => {
    return (
        <form className='filter'>
            <div className='filterInputContainer'>
                <div className='filterSearchProduct'>
                    <label htmlFor='productName'>Product Name</label>
                    <input id='productName' type='text' />
                </div>
                <div className='filterProductCategory'>
                    <label htmlFor='category'>Category</label>
                    <select id='category'>


                    </select>
                </div>
                <div className='filterSearchStock'>
                    <label>Stock</label>
                    <input type='number' />
                        - 
                    <input type='number' />
                </div>
                <div className='filterSearchPrice'>
                    <label>Price</label>
                    <input type='number' />
                        - 
                    <input type='number' />
                </div>
            </div>
            <div className='filterButtonContainer'>
                <input type='submit'/>
                <button>Reset</button>
            </div>

        </form>
    )
}

export default SellerViewForm
