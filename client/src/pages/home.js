import React from 'react';
import HomeProductList from '../components/home/homeProductList';
import MostPopular from '../components/home/mostPopular';
import PopularCategory from '../components/home/popularCategory';
import TopCategory from '../components/home/topCategory';
import '../styles/buyPage/home.scss';

const Home = () => {
    return (
        <div className='home'>
            <MostPopular />
            <PopularCategory />
            <TopCategory />
            <HomeProductList />
        </div>
    )
}

export default Home
