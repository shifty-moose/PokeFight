import React from 'react';
import '../Styles/Leaderboards.css';

const Leaderboards = () => {
  return (
    <div className='leaderboardContainer'>
      <div className='leaderboardWrapper'>
        <div className='leaderboardWrapperInside'>
          <div className='leaderboardContent'>
            <h1 className='leaderboardTitle'>Leaderboards</h1>
            <div className='leaderboardTable'>
              <div className='leaderboardTableItem'>

                <div className='itemLeft'>
                <h2 className='itemTitle'>1. John Doe</h2>
                <p className='itemScore'>Score: 100</p>
                <p className='itemDate'>Date: 01/01/2021</p>
                </div>
                <div className='itemRight'>
                  <img className='itemImage' src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' alt='profile'/>
                  {/* <p>Pikachu</p> */}
                </div>
              </div>
            </div> 
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboards;