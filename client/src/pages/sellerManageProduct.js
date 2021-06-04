import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import SellerManageAddForm from '../components/sellerManageAddForm';

const SellerManageProduct = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [manageProductsForm, setManageProductsForm] = useState({
        product_id : '',
        productName : '',
        category : '',
        price : null,
        images : [],
        description : '',
        stock : null,
        sampleImages : [],
    });
    const history = useHistory();
    const {product_id} = useParams();

    const getProductInfo = async() => {
        const productDetails = await axios.get(`/sell-ushop/getProduct/${product_id}`,{headers : {token : JSON.parse(localStorage.getItem('UShop')).token}});
        const data = productDetails.data;
        setManageProductsForm({
            ...manageProductsForm,
            category: data.category,
            description: data.description,
            images: data.images,
            sampleImages: data.images,
            price: data.price,
            productName: data.product_name,
            seen: data.seen,
            stock: data.stock,
        });
    }

    useEffect(() => {
        getProductInfo();
        

    }, [])

    const manageProduct = (e) => {
            setIsLoading(true);
            const preset = 'kopfy1vm';
            const url = 'https://api.cloudinary.com/v1_1/yutakaki/image/upload';
            try {
                let newImages = [];
                let uploaded;
                manageProductsForm.images.forEach(async(img, i) => {
                    if(img.includes('data:image')){
                        const formData = new FormData();
                        formData.append('file', img);
                        formData.append('upload_preset', preset);
                        const uploadImg = await axios.post(url, formData);
                        newImages.push(uploadImg.data.secure_url);
                        uploaded++;
                        
                    }
                    if(i === manageProductsForm.images.length - 1 ){
                        await axios.post(`/sell-ushop/modify-product/${product_id}`, {...manageProductsForm, newImages : [...manageProductsForm.images, ...newImages]}, {headers : {token : JSON.parse(localStorage.getItem('UShop')).token}})
                        history.push('/sell-UShop/view-product');
                    }
                })  

            } catch (error) {
                console.log(error.response);
            } 
    }

    const setManageProductsFormMethod = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        if(key === 'images'){
            if(e.target.files.length !== 0){
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                    setManageProductsForm({
                        ...manageProductsForm,
                        [key] : [ ...manageProductsForm[key] , reader.result],
                        sampleImages : [...manageProductsForm.sampleImages, URL.createObjectURL(e.target.files[0])]
                    });
                }
            }
        }else{
            setManageProductsForm({
                ...manageProductsForm,
                [key] : value
            });
        }   
    }
    return (
        <div className='manageProducts'>
            <SellerManageAddForm 
                data ={{
                    isLoading,
                    state : manageProductsForm
                }}
                methods ={{
                    setFormMethod : setManageProductsFormMethod,
                    submit : manageProduct
                }}
            />
            
        </div>
    )
}

export default SellerManageProduct