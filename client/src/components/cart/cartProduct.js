import React, {useRef} from 'react'
import { connect} from 'react-redux';
import { checkProductAction, deleteCartAction, updateItemNumberAction } from '../../reduxStore/actions/cartAction';

const CartProduct = ({cartActive, cartOutOfStock, checkProductDispatch, updateItemNumberDispatch, deleteCartDispatch}) => {
    const item = useRef();
    const checkbox = useRef();


    const updateItem = (e, id, itemValue) => {
        updateItemNumberDispatch(Number(e.target.value), id)
        // e.target.value = itemValue;
    }

    const checkProduct = (id) => {
        checkProductDispatch(id);
    }

    const deleteCart = (id) => {
        deleteCartDispatch(id);

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

const mapStateToProps = state => {
    return{
        cartActive : state.cart.filter(prod => prod.stock),
        cartOutOfStock : state.cart.filter(prod => !prod.stock)
    }
}
const mapDispatchToProps = dispatch => {
    return {
        checkProductDispatch : (id) => dispatch(checkProductAction(id)),
        updateItemNumberDispatch : (value, id) => dispatch(updateItemNumberAction(value, id)),
        deleteCartDispatch : (id) => dispatch(deleteCartAction(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartProduct)
