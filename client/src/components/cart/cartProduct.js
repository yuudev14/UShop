import React from 'react'

const CartProduct = ({data, method}) => {
    const {setItemsMethod, setSelectedItems, deleteCart} = method;
    console.log(data.stock);

    return (
        <div className='cartProduct'>
            <label className='productInfo1'>
                <input type='checkbox' onChange={ e => setSelectedItems(data.product_id, e)} checked={data.checked}/>
                <img src={data.image}/>
                <p>{data.product_name}</p>
            </label>
            <div className='productInfo2'>
                <div className='price'>
                    <h2>${data.totalPrice}</h2>
                </div>
                <div className='itemOption'>
                    <input type='number' min='1' max={`${data.stock}`} value={data.item} onChange={ (e) => setItemsMethod(data.product_id, e.target.value)}/>
                    <button onClick={() => deleteCart(data.product_id)}>delete</button>

                </div>

            </div>
        </div>
    )
}

export default CartProduct
