import React, {useState} from 'react';
import '../styles/registerShop.scss';
import { connect } from 'react-redux';
import { registerShopAction } from '../reduxStore/actions/sellerAction';
import { useHistory } from 'react-router-dom';

const RegisterShop = (props) => {

    const {
        registerShopDispatch
    } = props;

    const [shopInfo, setShopInfo] = useState({
        email : '',
        shop_name : ''
    });

    const history = useHistory();

    const setShopInfoMethod = (e) => setShopInfo({
        ...shopInfo,
        [e.target.name] : e.target.value

    })

    const registerShop = async(e) => {
        e.preventDefault();
        try {
            await registerShopDispatch(shopInfo);
            history.push('/sell-UShop')
        } catch (error) {
            console.log(error);
            
        }
        
    }
    return (
        <div className='registerShop'>
            <form onSubmit={registerShop}>
                <h1>Register Shop</h1>
                <input 
                    type='email' 
                    name='email'
                    placeholder='Email'
                    value={shopInfo.email}
                    onChange={setShopInfoMethod}
                    />
                <input 
                    type='text' 
                    name='shop_name'
                    placeholder='shop name'
                    value={shopInfo.shop_name}
                    onChange={setShopInfoMethod}
                    />
                <input type='submit' />
                
            </form>
            
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        registerShopDispatch : (data) => dispatch(registerShopAction(data))
    }
}
export default connect(null, mapDispatchToProps)(RegisterShop)
