import React from 'react';
import '../Styles/Header.css';

const Header = () => {
  return (
    <div className='headerWrapper'>

        <div className='pageHeaderTop'>
        </div>

        <div className='pageHeaderMid'>
            <div className='pokeBall'>
                <img src='https://i.pinimg.com/originals/e3/4f/ac/e34facd1e788d09f2bfcbc2f37f548ce.png' alt='pokeBall' className='pokeBallImg'/>
            </div>
        </div>

        <div className='pageHeaderBtm'>
        </div>
    </div>
  )
}

export default Header;