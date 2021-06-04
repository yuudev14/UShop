import React, {useRef} from 'react'

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

    

    const categoryList = [
        'Appliances',
        'Apps & Games',
        'Arts, Crafts, & Sewing',
        'Automotive Parts & Accessories',
        'Baby',
        'Beauty & Personal Care',
        'Books',
        'CDs & Vinyl',
        'Cell Phones & Accessories',
        'Clothing, Shoes and Jewelry',
        'Collectibles & Fine Art',
        'Computers',
        'Electronics',
        'Garden & Outdoor',
        'Grocery & Gourmet Food',
        'Handmade',
        'Health, Household & Baby Care',
        'Home & Kitchen',
        'Industrial & Scientific',
        'Kindle',
        'Luggage & Travel Gear',
        'Movies & TV',
        'Musical Instruments',
        'Office Products',
        'Pet Supplies',
        'Sports & Outdoors',
        'Tools & Home Improvement',
        'Toys & Games',
        'Video Games',
    ]


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
        };
    }
    return (
        <form className={`manageProductsForm ${isLoading ? 'isLoading' : ''}`} onSubmit={submitForm}>
            <p className='isLoadingTag'>wait for a moment...</p>
            <h1>Manage Products</h1>
            <div className='inputContainer'>
                <p>Product name</p>
                <input placeholder={state.productName} onChange={setFormMethod} name='productName' id='productName' type='text'/>
            </div>
            <div className='inputContainer'>
                <p>Category</p>
                <select id='category' name='category' onChange={setFormMethod} value={state.category ? state.category : null}>
                    <option disabled selected value = {null}> -- select category-- </option>
                    {categoryList.map(category => (
                        <option value={category}>{category}</option>
                    ))}
                    
                </select>
            </div>
            <div className='inputContainer'>
                <p>Price</p>
                <input name ='price' id='price' type='number' onChange={setFormMethod} placeholder={state.price}/>
            </div>
            <div className='inputContainer'>
                <p>Stock</p>
                <input name ='stock' id='stock' type='number' onChange={setFormMethod} placeholder={state.stock}/>
            </div>
            <div className='inputContainer'>
                <p>Images</p>
                <label htmlFor='productNameImage' ref={addImageLogo}>
                    <i className='fa fa-plus'></i>
                </label>
                <input name='images' type='file' id='productNameImage' onChange={setFormMethod}/>
                <div className='sampleImages'>
                    {state.sampleImages.map(img => (
                        <img src={img} />
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
