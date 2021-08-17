import React, {useRef} from 'react'
import { connect} from 'react-redux';
import { checkProductAction, deleteCartAction, updateItemNumberAction } from '../../reduxStore/actions/cartAction';

const Products = ({data, checkProductDispatch, updateItemNumberDispatch, deleteCartDispatch}) => {
    const checkbox = useRef();
    const item = useRef();
    
    const updateItem = (e, id, itemValue) => {
        if(e.target.value > data.stock){
            item.current.value = data.stock
        }
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
        <div className='cartProduct'>
            <label className='productInfo1'>
                <input type='checkbox' ref={checkbox} disabled={!data.stock} onClick={() => checkProduct(data.product_id)} checked={data.checked}/>
                <img src={data.image}/>
                <div>
                    <p>{data.product_name}</p>
                    <p>Stock : {data.stock}</p>
                </div>
            </label>
            <div className='productInfo2'>
                <div className='price'>
                    <h2>¥{data.totalPrice}</h2>
                </div>
                <div className='itemOption'>
                    <input type='number'
                            ref={item}
                            disabled={!data.stock}
                            onChange={ (e) => updateItem(e, data.product_id, data.item)}
                            min='1' max={`${data.stock}`} defaultValue={data.items}/>
                    <button onClick={()=> deleteCart(data.product_id)}>delete</button>

                </div>

            </div>
        </div>
    )
}
const mapDispatchToProps = dispatch => {
    return {
        checkProductDispatch : (id) => dispatch(checkProductAction(id)),
        updateItemNumberDispatch : (value, id) => dispatch(updateItemNumberAction(value, id)),
        deleteCartDispatch : (id) => dispatch(deleteCartAction(id))
    }
}
export default connect(null, mapDispatchToProps)(Products)
