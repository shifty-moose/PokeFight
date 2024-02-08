import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAnimate } from 'framer-motion';

import '../Styles/EntryPage.css';
import logo from '../Images/pokeFightLogo.png';

const EntryPage = ({toggleAudio}) => {

    const navigate = useNavigate();
    const [topScope, animateTop] = useAnimate();
    const [middleScope, animateMiddle] = useAnimate();
    const [bottomScope, animateBottom] = useAnimate();
    const [backgroundScope, animateBackground] = useAnimate();

    const navigateToHome = () => {
        toggleAudio();
        animateTop(topScope.current, { y: -window.innerHeight}, {duration: 1.5});
        animateMiddle(middleScope.current, { y: window.innerHeight}, {duration: 1.5, delay: 0});
        animateBottom(bottomScope.current, { y: window.innerHeight}, {duration: 1.5, delay: 0});
        animateBackground(backgroundScope.current, { opacity: 0}, {duration: 2, delay: 0.2});
        setTimeout(() => navigate('/home'), 2000);
    };

    return (
        <div className='entryContainer'>
            <div className='entryBackground' ref={backgroundScope}>   
                <div className='entryTop' ref={topScope}>
                    <img src={logo} alt='pokeFightLogo' className='pokeLogo'/> 
                </div>

                <div className='entryMiddle' ref={middleScope} >
                    <div className='middleBall'>
                        <button className='enterBtn' onClick={navigateToHome}></button>
                    </div>
                </div>

                <div className='entryBottom' ref={bottomScope} >
                    <p className='entryInstructions'>Click on the PokéBall to <span className='enterSpan'>ENTER</span> ▴</p>
                </div>
            </div>
        </div>
    )
}

export default EntryPage