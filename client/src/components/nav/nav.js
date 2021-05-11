import React from 'react'
import '../../styles/nav/nav.scss'
import Nav1 from './nav1'
import Nav2 from './nav2'

const Nav = () => {
    
    return (
        <header>
            <nav className='main_nav'>
                <Nav1 />
                <Nav2 />
                

            </nav>
        </header>
    )
}

export default Nav
