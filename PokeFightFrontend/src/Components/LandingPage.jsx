import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { useAnimate } from 'framer-motion';

import "../Styles/LandingPage.css";
import buildingSprites from "../Data/buildingSprites";

function LandingPage() {

  const navigate = useNavigate();
  const [topScope, animateTop] = useAnimate();
  const [bottomScope, animateBottom] = useAnimate();
  const [pageScope, animatePage] = useAnimate();

  const pageOutAnimation = () => {
    animatePage(pageScope.current, {opacity: 0}, {duration: 0.5});
  };
  
  const handleBuildingClick = (e) => {
    const target = e.target.alt;
    console.log(target);

    pageOutAnimation();
    setTimeout(() => {
      if (target === 'pokecenter') {
        console.log('pokecenter clicked');
        navigate('/pokemon');
      } else {
        navigate('/fight');
      };
    }, 500)
  };

  const handlePokedexClick = () => {
    console.log('pokedex clicked');
    navigate('/pokemon');
  }

  useEffect(() => {
    pageScope.current.style.opacity = 0;
    animatePage(pageScope.current, {opacity: 1}, {duration: 1});
    animateTop(topScope.current, {opacity: 1}, {duration: 2});
    animateBottom(bottomScope.current, {opacity: 1}, {duration: 2});
  }, []);

  return (
    <div className="landingContainer" ref={pageScope} >
      <div className="landingTop" ref={topScope}>
        {Object.values(buildingSprites).map((building) => {
          return (
            <div key={building.id} className="buildingWrapper" onClick={handleBuildingClick}>
              <img
                className="buildingSprite"
                src={building.sprite}
                alt={building.buildingName}
              />
              <div className="titleWrapper">
                <h2 className="buildingName">{building.title}</h2>
              </div>
            </div>
          );
        })}
      </div>

      <div className="landingBottom" ref={bottomScope}>
        <div className="instructionWrapper">
          <div className="landingInstruction">
            <h2>Welcome to PokéFight !</h2>
            <h2 className='dots'>
            Click on a building to continue
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </h2>

          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
