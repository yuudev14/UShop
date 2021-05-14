import React, {useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';


const SellUShopHome = (props) => {

    const {
        auth
    } = props

    const history = useHistory();

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('UShop'));
        if(!token){
            history.push('/sell-UShop/auth')
        };

    })
    return (
        <div className='sellUShopHome'>
            sellHome
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auth : state.auth
    }
}

export default connect(mapStateToProps)
                (SellUShopHome)
