import React, {useRef} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { checkProductAction, deleteCartAction, updateItemNumberAction } from '../../reduxStore/actions/cartAction';

const CartProduct = () => {
    const item = useRef();
    const checkbox = useRef();
    const cartActive = useSelector(state => state.cart.filter(prod => prod.stock));
    const cartOutOfStock = useSelector(state => state.cart.filter(prod => !prod.stock));
    const dispatch = useDispatch();


    const updateItem = (e, id) => {
        dispatch(updateItemNumberAction(Number(e.target.value), id))
        // e.target.value = itemValue;
    }

    const checkProduct = (id) => {
        dispatch(checkProductAction(id));
    }

    const deleteCart = (id) => {
        dispatch(deleteCartAction(id));

    }


    return (
        <>
            {cartActive.map(data => (
                <div className='cartProduct'>
                <label className='productInfo1'>
                    <input type='checkbox' ref={checkbox} disabled={!data.stock} onClick={() => checkProduct(data.product_id)} checked={data.checked}/>
                    <img src={data.image}/>
                    <div>
                        <p>{data.product_name}</p>
                        <p>Stock : {data.stock}</p>
                        <h2>$¥{data.totalPrice}</h2>
                    </div>
                </label>
                <div className='productInfo2'>
                    <div className='itemOption'>
                        <input type='number'
                                ref={item}
                                disabled={!data.stock}
                                onChange={ (e) => updateItem(e, data.product_id, data.item)}
                                min='1' max={`${data.stock}`} value={data.items}/>
                        <button onClick={()=> deleteCart(data.product_id)}>delete</button>
    
                    </div>
    
                </div>
            </div>
            ))}

            {cartOutOfStock.length ? (
                <div className='outOfStockProducts'>
                    <h1>OutOfStock</h1>
                    {cartOutOfStock.map(data => (
                        <div className='cartProduct'>
                        <label className='productInfo1'>
                            <input type='checkbox' ref={checkbox} disabled={!data.stock} onClick={() => checkProduct(data.product_id)} checked={data.checked}/>
                            <img src={data.image}/>
                            <div>
                                <p>{data.product_name}</p>
                                <p>Stock : {data.stock}</p>
                                <h2>¥{data.totalPrice}</h2>
                            </div>
                        </label>
                        <div className='productInfo2'>
                            
                            <div className='itemOption'>
                                <input type='number'
                                        ref={item}
                                        disabled={!data.stock}
                                        onChange={ (e) => updateItem(e, data.product_id, data.item)}
                                        min='1' max={`${data.stock}`} value={data.items}/>
                                <button onClick={()=> deleteCart(data.product_id)}>delete</button>
            
                            </div>
            
                        </div>
                    </div>
                    ))}
                </div>

            ) : null}
        </> 
    )
}

export default CartProduct;
