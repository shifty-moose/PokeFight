import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Leaderboards.css";

const Leaderboards = () => {

  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch("http://localhost:3000/score");
      const data = await response.json();
      setLeaderboardData(data);
      console.log("Leaderboard data: ", data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard data: ", error);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const navigateHome = () => {
    navigate("/home");
  };


  return (
    <div className="leaderboardContainer">
                  <button className='backPageBtn'onClick={navigateHome}>← Back to Landing Page</button>

      <div className="leaderboardWrapper">
        <div className="leaderboardWrapperInside">
          <div className="leaderboardContent">
            <h1 className="leaderboardTitle">Leaderboards</h1>
            {loading ? <p>Loading...</p> : (
            <div className="leaderboardTable">
              {leaderboardData.map((item, index) => {
                return (
                  <div className={`leaderboardTableItem ${index === 0 ? 'firstPlace' : index === 1 ? 'secondPlace' : index === 2 ? 'thirdPlace' : null}`} key={index}>
                    <div className="itemLeft">
                      <h2 className="itemTitle">{index + 1}. {item.name}</h2>
                      <p className="itemScore">Score: {item.highscore}</p>
                      <p className="itemDate">Date: {item.date}</p>
                    </div>
                    <div className="itemRight">
                      <img
                        className="itemImage"
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.id}.png`}
                        alt="profile"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboards;
