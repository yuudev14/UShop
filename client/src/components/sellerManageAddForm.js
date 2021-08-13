import axios from 'axios';
import React, {useRef, useState, useEffect} from 'react'

const SellerManageAddForm = (props) => {
    const {
        data,
        methods
    } = props;

    const {
        isLoading,
        state

    } = data;

    const {
        submit,
        setFormMethod
    } = methods;

    const addImageLogo = useRef();

    const [category, setCategory] = useState([]);

    const errorObject = {
        blankError: ''
    }
    const [errors, setErrors] = useState(errorObject);

    useEffect(() => {
        (async() => {
            try {
                const category = await axios.get('/ushop/categories');
                setCategory(category.data);
                
            } catch (error) {
                console.log(error);
                
            }
        })();
    }, [])



    const checkError = () => {
        let errors = 0;
        const inputListsCheck = ['productName', 'price', 'stock', 'category'];

        inputListsCheck.forEach(input => {
            const value = state[input]
            if(value === '' || value === null){
                document.querySelector(`.addProducts #${input}`).classList.add('error')
                errors++;
            }
        })
        if(state.images.length === 0){
            addImageLogo.current.classList.add('error');
            errors++;
        }
        return errors;

    };

    const submitForm = (e) => {
        e.preventDefault();
        if(!checkError()){
            submit();
        }else{
            setErrors({
                ...errors,
                blankError : 'fill up the required fields'
            })

        };
    }
    return (
        <form className={`manageProductsForm ${isLoading ? 'isLoading' : ''}`} onSubmit={submitForm}>
            
            
            <h1>Manage Products</h1>
            <p className='isLoadingTag'>wait for a moment...</p>
            <p className='error'>{errors.blankError}</p>
            <div className='inputContainer'>
                <p>Product name</p>
                <input placeholder={state.productName} onChange={setFormMethod} name='productName' id='productName' type='text'/>
            </div>
            <div className='inputContainer'>
                <p>Category</p>
                <select id='category' name='category' onChange={setFormMethod} value={state.category ? state.category : null}>
                    <option disabled selected value = {null}> -- select category-- </option>
                    {category.map(category => (
                        <option value={category.category_id}>{category.category_name}</option>
                    ))}
                    
                </select>
            </div>
            <div className='inputContainer'>
                <p>Price</p>
                <input name ='price' min='0' id='price' type='number' onChange={setFormMethod} placeholder={state.price}/>
            </div>
            <div className='inputContainer'>
                <p>Stock</p>
                <input name ='stock' min='0' id='stock' type='number' onChange={setFormMethod} placeholder={state.stock}/>
            </div>
            <div className='inputContainer'>
                <p>Images</p>
                <div className='fileImages'>
                    <label htmlFor='productNameImage' ref={addImageLogo}>
                        <i className='fa fa-plus'></i>
                    </label>
                    <input name='images' type='file' id='productNameImage' onChange={setFormMethod}/>
                    {state.sampleImages.map(img => (
                            <img src={img.image_link} className='sampleImages'/>
                        ))}

                </div>
                
            </div>
            <div className='inputContainer'>
                <p>Description</p>
                <textarea name='description' id='productDescription' onChange={setFormMethod} placeholder={state.description}>
                </textarea>
            </div>
            <div className='inputContainer'>
                <p></p>
                <input type='submit' id='submitAddProduct' />
            </div>
            
        </form>
            
    )
}

export default SellerManageAddForm
