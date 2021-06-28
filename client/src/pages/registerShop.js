import React, {useState} from 'react';
import '../styles/registerShop.scss';
import { connect } from 'react-redux';
import { registerShopAction } from '../reduxStore/actions/sellerAction';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const RegisterShop = (props) => {

    const {
        registerShopDispatch
    } = props;

    const [shopInfo, setShopInfo] = useState({
        email : '',
        shop_name : '',
        images : '',
        sampleImages : '',
        aboutShop : ''
    });

    const history = useHistory();

    const setShopInfoMethod = (e) => {
        if(e.target.name !== 'images'){
            setShopInfo({
                ...shopInfo,
                [e.target.name] : e.target.value
        
            })
        }else{
            if(e.target.files.length !== 0){
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    setShopInfo({
                        ...shopInfo,
                        [e.target.name] : reader.result,
                        sampleImages : URL.createObjectURL(e.target.files[0])
                    });
                }
            }
        }
    }

    const registerShop = async(e) => {
        e.preventDefault();
        const preset = 'kopfy1vm';
        const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
        try {
            const formData = new FormData();
            formData.append('file', shopInfo.images);
            formData.append('upload_preset', preset);
            const uploadImg = await axios.post(url, formData);
            await registerShopDispatch({...shopInfo, images: uploadImg.data.secure_url});
            history.push('/sell-UShop') 
            
        } catch (error) {
            console.log(error);
            
        }
        
    }
    return (
        <div className='registerShop'>
            <form onSubmit={registerShop}>
                <h1>Register Shop</h1>
                <div className='inputContainer'>
                    <p>Email</p>
                    <input 
                        type='email' 
                        name='email'
                        placeholder='Email'
                        value={shopInfo.email}
                        onChange={setShopInfoMethod}
                        />
                </div>

                <div className='inputContainer'>
                    <p>Shop name</p>
                    <input 
                        type='text' 
                        name='shop_name'
                        placeholder='shop name'
                        value={shopInfo.shop_name}
                        onChange={setShopInfoMethod}
                        />

                </div>
                <div className='inputContainer'>
                    <p>Logo</p>
                    <label htmlFor='productNameImage'>
                        <i className='fa fa-plus'></i>
                    </label>
                    <input name='images' type='file' id='productNameImage' onChange={setShopInfoMethod}/>
                    <div className='sampleImages'>
                        {shopInfo.sampleImages !== '' && (
                            <img src={shopInfo.sampleImages} />
                        )}
                    </div>
                </div>

                <div className='inputContainer'>
                    <p>About shop</p>
                    <textarea name='aboutShop' id='aboutShop' onChange={setShopInfoMethod}>
                    </textarea>
                </div>
                
                
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
