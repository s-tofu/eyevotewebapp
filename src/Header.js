import React from 'react'
import './Header.css'
import LMULogo from './LMU_Muenchen_Logo.png'
import UNIBWLogo from './Uni_BW_Logo.png'

const Header = () => {
    return(
        <div>
            <img className='lmulogo' src={LMULogo} alt="Logo LMU"></img>
            <img className='bwlogo' src= {UNIBWLogo} alt="Logo BW"></img>
            <hr style={{color:'#000000'}}></hr>
        </div>
    )
}

export default Header